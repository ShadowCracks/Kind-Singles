import { useState, useEffect } from 'react';
import { profileApi } from '../services/profileApi';
import type { HobbyItem } from '../types';

/**
 * Hobby Component - Interactive hobby/experience tags display
 * 
 * This component displays user hobbies and experiences as interactive tags.
 * It fetches data from the hobbies API and renders them as clickable buttons
 * with dynamic widths based on content.
 * 
 * Features:
 * - Dynamic loading from API
 * - Skeleton loading animation
 * - Interactive tags with hover effects
 * - Error handling and loading states
 * - Dynamic width calculation for each hobby tag
 */
function Hobby() {
  // State management for hobbies data and loading states
  const [hobbies, setHobbies] = useState<HobbyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load hobbies data on component mount
  useEffect(() => {
    const loadHobbies = async () => {
      try {
        setLoading(true);
        // Simulate loading delay to showcase skeleton (remove in production)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Fetch hobbies from API service
        const data = await profileApi.getHobbies();
        setHobbies(data);
      } catch (err) {
        setError('Failed to load hobbies');
        console.error('Error loading hobbies:', err);
      } finally {
        setLoading(false);
      }
    };

    loadHobbies();
  }, []);

  // Handle hobby tag click events
  const handleHobbyClick = (hobby: string) => {
    console.log(`Clicked on: ${hobby}`);
    // Add hobby interaction logic here (e.g., filtering, navigation, etc.)
  };

  // Styling constants for consistent layout
  const containerStyle = {
    left: '190px', 
    top: '390px'
  };

  // Title styling to match design specifications
  const titleStyle = {
    fontFamily: 'Sarabun', 
    fontSize: '22px', 
    fontWeight: '800', 
    color: 'black',
    letterSpacing: '2%',
    margin: '0'
  };

  // Container for hobby tags with flexible layout
  const hobbyContainerStyle = {
    display: 'flex', 
    gap: '5px', 
    marginTop: '5px', 
    flexWrap: 'wrap' as const
  };

  // Loading state: Display skeleton animations
  if (loading) {
    // Create skeleton placeholders with varying widths to simulate real content
    const skeletonHobbies = Array.from({ length: 5 }, (_, index) => (
      <div
        key={`skeleton-${index}`}
        style={{
          backgroundColor: '#d0d0d0',
          height: '27px',
          borderRadius: '8px',
          width: `${[120, 95, 75, 130, 145][index]}px`,
          animation: 'pulse 1.5s ease-in-out infinite',
          animationDelay: `${index * 0.1}s`
        }}
      />
    ));

    return (
      <div className="absolute" style={containerStyle}>
        {/* CSS animation for skeleton pulse effect */}
        <style>
          {`
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.5; }
            }
          `}
        </style>
        <h3 style={titleStyle}>
          Some experience I'd love to share with you...
        </h3>
        <div style={hobbyContainerStyle}>
          {skeletonHobbies}
        </div>
      </div>
    );
  }

  // Error state: Display error message
  if (error) {
    return (
      <div className="absolute" style={containerStyle}>
        <h3 style={titleStyle}>
          Some experience I'd love to share with you...
        </h3>
        <div style={{ color: 'red', fontFamily: 'Sarabun', marginTop: '10px' }}>
          {error}
        </div>
      </div>
    );
  }

  // Main render: Display hobby tags with dynamic widths and interactivity
  return (
    <div className="absolute" style={containerStyle}>
      <h3 style={titleStyle}>
        Some experience I'd love to share with you...
      </h3>
      
      {/* Dynamically rendered hobby tags */}
      <div style={hobbyContainerStyle}>
        {hobbies.map((hobby) => (
          <button
            key={hobby.id}
            onClick={() => handleHobbyClick(hobby.text)}
            style={{
              backgroundColor: '#3997C1',
              color: 'white',
              fontFamily: 'Sarabun',
              fontSize: '15px',
              fontWeight: 'bold',
              width: `${hobby.width}px`, // Dynamic width from API data
              height: '27px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#357a94';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#3997C1';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {hobby.text}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Hobby;
