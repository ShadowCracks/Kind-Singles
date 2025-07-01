import { useState, useEffect, useMemo } from 'react';
import { profileApi } from '../services/profileApi';
import type { QuoteItem, BeatboxBioData } from '../types';
import Line4 from '../assets/Line 4.png';

interface ContentBoxProps {
  title: string;
  content: string;
  top: string;
  backgroundColor?: string;
}

// Memoized component to prevent unnecessary re-renders
const ContentBox = ({ title, content, top, backgroundColor = 'white' }: ContentBoxProps) => {
  return (
    <div 
      className="absolute"
      style={{ 
        left: '190px', 
        top: top,
        width: '705px',
        backgroundColor: backgroundColor,
        border: '4px solid #F5F1F2',
        borderRadius: '8px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        boxSizing: 'border-box'
      }}
    >
      <h4 
        style={{ 
          fontFamily: 'Sarabun', 
          fontSize: '22px', 
          fontWeight: 'bold', 
          color: 'black',
          margin: '0 0 10px 0'
        }}
      >
        {title}
      </h4>
      <div 
        style={{ 
          fontFamily: 'Sarabun', 
          fontSize: '20px', 
          color: 'black',
          margin: '0',
          lineHeight: '1.4'
        }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

// Extract skeleton to separate component with cleaner structure
const SkeletonBox = ({ top, height = '80px', delay = '0s' }: { top: string; height?: string; delay?: string }) => (
  <div 
    style={{ 
      position: 'absolute',
      left: '190px', 
      top,
      width: '705px',
      minHeight: height,
      backgroundColor: '#f0f0f0',
      border: '4px solid #e0e0e0',
      borderRadius: '8px',
      animation: `pulse 1.5s ease-in-out infinite ${delay}`
    }}
  />
);

const SeparatorLine = ({ top }: { top: string }) => (
  <img 
    src={Line4}
    alt="Separator"
    className="absolute"
    style={{
      left: '312px',
      top,
      width: '465px'
    }}
  />
);

const SkeletonProfileContent = () => {
  return (
    <>
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}
      </style>
      
      <SkeletonBox top="520px" />
      <SkeletonBox top="700px" delay="0.2s" />
      <SeparatorLine top="680px" />
      <SeparatorLine top="960px" />
      
      {/* Beatbox bio title skeleton */}
      <div 
        style={{ 
          position: 'absolute',
          left: '215px',
          top: '995px',
          width: '150px',
          height: '25px',
          backgroundColor: '#d0d0d0',
          borderRadius: '4px',
          animation: 'pulse 1.5s ease-in-out infinite 0.3s'
        }}
      />
      
      <SkeletonBox top="1030px" height="848px" delay="0.4s" />
    </>
  );
};

// Extract quote positions to constants for maintainability
const QUOTE_POSITIONS = ['520px', '700px'] as const;
const SEPARATOR_POSITIONS = {
  betweenQuotes: '680px',
  beforeBeatbox: '960px'
} as const;

const BEATBOX_CONFIG = {
  containerTop: '960px',
  titleOffset: { left: '25px', top: '35px' },
  contentOffset: { left: '0px', top: '70px' },
  contentSize: { width: '705px', height: '848px' }
} as const;

function ProfileContent() {
  const [quotes, setQuotes] = useState<QuoteItem[]>([]);
  const [beatboxBio, setBeatboxBio] = useState<BeatboxBioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Memoize sorted quotes to avoid re-sorting on every render
  const sortedQuotes = useMemo(() => 
    quotes.sort((a, b) => a.order - b.order), 
    [quotes]
  );

  // Memoize boolean checks for cleaner conditional rendering
  const hasQuotes = sortedQuotes.length > 0;
  const hasMultipleQuotes = sortedQuotes.length > 1;
  const hasBeatboxBio = Boolean(beatboxBio);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2500));
        
        const [quotesData, beatboxBioData] = await Promise.all([
          profileApi.getQuotes(),
          profileApi.getBeatboxBio()
        ]);
        
        setQuotes(quotesData);
        setBeatboxBio(beatboxBioData);
      } catch (err) {
        setError('Failed to load profile content');
        console.error('Error loading profile content:', err);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  if (loading) return <SkeletonProfileContent />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <>
      {/* Quotes Section */}
      {hasQuotes && <QuotesSection quotes={sortedQuotes} showSeparator={hasMultipleQuotes} />}
      
      {/* Beatbox Bio Section */}
      {hasBeatboxBio && (
        <BeatboxBioSection 
          beatboxBio={beatboxBio!} 
          showTopSeparator={hasQuotes} 
        />
      )}
    </>
  );
}

// Extract sections into separate components for better organization
const QuotesSection = ({ quotes, showSeparator }: { quotes: QuoteItem[], showSeparator: boolean }) => (
  <>
    {quotes.map((quote, index) => (
      <ContentBox
        key={quote.id}
        title={quote.title}
        content={quote.content}
        top={QUOTE_POSITIONS[index] || QUOTE_POSITIONS[1]}
      />
    ))}
    {showSeparator && <SeparatorLine top={SEPARATOR_POSITIONS.betweenQuotes} />}
  </>
);

const BeatboxBioSection = ({ beatboxBio, showTopSeparator }: { 
  beatboxBio: BeatboxBioData, 
  showTopSeparator: boolean 
}) => (
  <>
    {showTopSeparator && <SeparatorLine top={SEPARATOR_POSITIONS.beforeBeatbox} />}
    
    <div className="absolute" style={{ left: '190px', top: BEATBOX_CONFIG.containerTop }}>
      <h2 
        style={{ 
          position: 'absolute',
          left: BEATBOX_CONFIG.titleOffset.left,
          top: BEATBOX_CONFIG.titleOffset.top,
          fontFamily: 'Sarabun', 
          fontSize: '25px', 
          fontWeight: '800',
          color: 'black',
          margin: '0'
        }}
      >
        {beatboxBio.title}
      </h2>
      
      <div 
        style={{ 
          left: BEATBOX_CONFIG.contentOffset.left, 
          top: BEATBOX_CONFIG.contentOffset.top,
          width: BEATBOX_CONFIG.contentSize.width,
          height: BEATBOX_CONFIG.contentSize.height,
          backgroundColor: beatboxBio.backgroundColor,
          border: '4px solid #F5F1F2',
          borderRadius: '8px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          boxSizing: 'border-box',
          position: 'absolute',
          overflow: 'hidden'
        }}
      >
        <div 
          style={{ 
            fontFamily: 'Sarabun', 
            fontSize: '22px', 
            color: 'black', 
            lineHeight: '30px',
            width: '100%',
            height: '100%',
            overflow: 'auto'
          }}
          dangerouslySetInnerHTML={{ __html: beatboxBio.content }}
        />
      </div>
    </div>
  </>
);

const ErrorMessage = ({ message }: { message: string }) => (
  <div style={{ position: 'absolute', left: '190px', top: '560px', color: 'red' }}>
    {message}
  </div>
);

export default ProfileContent;
