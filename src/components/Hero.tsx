import { useState, useEffect } from 'react';
import Ellipse16 from '../assets/Ellipse16.png';
import profileImage from '../assets/profile.png';
import envelopeIcon from '../assets/Envelopeicon.png';
import heartIcon from '../assets/Bluehearticon.png';
import audioIcon from '../assets/Audioicon.png';
import videoIcon from '../assets/videoIcon.png';
import type { UserDataResponse } from '../types';

interface HeroProps {
  onLoaded: () => void;
}

/**
 * Hero Component - Main profile display section
 * 
 * This component displays the user's main profile information including:
 * - Profile image
 * - Name and basic info (age, location, preferences)
 * - Contact method icons
 * - Loading skeleton while data is being fetched
 * 
 * Features:
 * - Dynamic data loading from API
 * - Skeleton loading animation
 * - Callback when loading is complete to trigger other components
 */
function Hero({ onLoaded }: HeroProps) {
  const [userData, setUserData] = useState<UserDataResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 3000));
        const response = await fetch('/api/user.json');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        setError(`Failed to load user data: ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally {
        setLoading(false);
        onLoaded();
      }
    };

    fetchUserData();
  }, [onLoaded]);

  if (loading) {
    return (
      <div className="relative">
        {/* Skeleton for profile image - matches actual image dimensions */}
        <div 
          className="absolute bg-gray-200 animate-pulse rounded"
          style={{
            left: '190px',
            top: '65px',
            width: '170.53px',
            height: '186px'
          }}
        />
        
        {/* Skeleton for user name */}
        <div 
          className="absolute bg-gray-200 animate-pulse rounded"
          style={{
            left: '420px',
            top: '65px',
            width: '150px',
            height: '40px'
          }}
        />
        
        {/* Dynamic skeleton for info items (age/location and looking for info) */}
        {[0, 1].map((index) => (
          <div key={index} className="absolute flex items-center" style={{ left: index === 0 ? '420px' : '588px', top: '115px' }}>
            <div className="w-4 h-4 bg-gray-200 animate-pulse rounded-full mr-2" />
            <div className={`h-5 bg-gray-200 animate-pulse rounded ${index === 0 ? 'w-32' : 'w-40'}`} />
          </div>
        ))}
        
        {/* Skeleton for preferences section */}
        <div className="absolute" style={{ left: '414px', top: '155px' }}>
          <div className="w-48 h-6 bg-gray-200 animate-pulse rounded mb-2" />
          <div className="space-y-2">
            <div className="flex space-x-8">
              <div className="w-24 h-5 bg-gray-200 animate-pulse rounded" />
              <div className="w-24 h-5 bg-gray-200 animate-pulse rounded" />
            </div>
            <div className="flex space-x-8">
              <div className="w-28 h-5 bg-gray-200 animate-pulse rounded" />
              <div className="w-40 h-5 bg-gray-200 animate-pulse rounded" />
            </div>
          </div>
        </div>
        
        {/* Skeleton for contact method icons */}
        <div className="absolute flex items-center space-x-2" style={{ left: '203px', top: '250px' }}>
          <div className="w-8 h-6 bg-gray-200 animate-pulse rounded" />
          <div className="w-8 h-6 bg-gray-200 animate-pulse rounded" />
          <div className="w-8 h-6 bg-gray-200 animate-pulse rounded" />
          <div className="w-8 h-6 bg-gray-200 animate-pulse rounded" />
        </div>
      </div>
    );
  }

  // Error state: Display error message if data fetching fails
  if (error) {
    return (
      <div className="absolute" style={{ left: '190px', top: '65px' }}>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="absolute" style={{ left: '190px', top: '65px' }}>
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          No user data available
        </div>
      </div>
    );
  }

  const { user } = userData;

  const infoItems = [
    { text: `${user.age} | ${user.location}`, left: '420px' },
    { text: `Looking for ${user.lookingFor} | ${user.ageRange}`, left: '588px' }
  ];

  const iconMap: { [key: string]: string } = {
    envelope: envelopeIcon,
    heart: heartIcon,
    audio: audioIcon,
    video: videoIcon
  };

  return (
    <div className="relative">
      <div className="absolute" style={{ left: '190px', top: '65px', width: '170.53px', height: '186px' }}>
        <img 
          src={profileImage} 
          alt="Profile" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* User name - large, bold heading */}
      <h1 
        className="absolute text-black"
        style={{
          left: '420px',
          top: '65px',
          fontFamily: 'Rounded Mplus 1c',
          fontSize: '40px',
          fontWeight: '800',
          letterSpacing: '2%'
        }}
      >
        {user.name}
      </h1>
      
      {/* Dynamic info items with ellipse bullets */}
      {/* This renders age/location and looking-for info in a flexible way */}
      {infoItems.map((item, index) => (
        <div key={index} className="absolute flex items-center" style={{ left: item.left, top: '115px' }}>
          <img src={Ellipse16} alt="Ellipse" style={{ width: '15px', height: '15px', marginRight: '8px' }} />
          <span style={{ fontFamily: 'Sarabun', fontSize: '20px', color: 'black' }}>
            {item.text}
          </span>
        </div>
      ))}
      
      {/* User preferences section - "This matters to me" */}
      <div className="absolute" style={{ left: '414px', top: '155px' }}>
        <h3 style={{ fontFamily: 'Sarabun', fontSize: '22px', fontWeight: '800', color: 'black', margin: '0 0 5px 0' }}>
          {user.preferences.title}
        </h3>
        {/* Preferences displayed in a 2x2 grid layout */}
        <div style={{ fontFamily: 'Sarabun', fontSize: '20px', color: 'black', lineHeight: '1.5' }}>
          <div style={{ display: 'flex', marginBottom: '5px' }}>
            <div style={{ display: 'flex', width: '151px' }}>
              <span>• {user.preferences.items[0]}</span>
            </div>
            <div style={{ display: 'flex' }}>
              <span>• {user.preferences.items[2]}</span>
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ display: 'flex', width: '151px' }}>
              <span>• {user.preferences.items[1]}</span>
            </div>
            <div style={{ display: 'flex' }}>
              <span>• {user.preferences.items[3]}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute flex items-center space-x-2" style={{ left: '203px', top: '250px' }}>
        {user.contactMethods.map((method, index) => (
          <div key={index} style={{ 
            width: `${method.dimensions.width}px`, 
            height: `${method.dimensions.height}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img 
              src={iconMap[method.type]} 
              alt={method.type} 
              style={{ 
                width: `${method.dimensions.width}px`, 
                height: `${method.dimensions.height}px` 
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hero