import { useState, useEffect } from 'react';
import { profileApi } from '../services/profileApi';
import type { ProfileAttribute } from '../types';

// API function - using the API service
const fetchProfileData = async (userId?: string): Promise<ProfileAttribute[]> => {
  // Add delay to demonstrate skeleton loader
  await new Promise(resolve => setTimeout(resolve, 3000)); // 3 second delay
  return await profileApi.getProfileAttributes(userId);
};

function RightTables() {
  const [profileData, setProfileData] = useState<ProfileAttribute[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        setLoading(true);
        const data = await fetchProfileData();
        setProfileData(data);
      } catch (err) {
        setError('Failed to load profile data');
        console.error('Error loading profile data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, []);

  // Reusable styles
  const containerStyle = {
    left: '1051px',
    top: '520px',
    width: '308px',
    height: 'auto'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'separate' as const,
    borderSpacing: '0',
    backgroundColor: 'white',
    border: '1px solid #F5F1F2',
    borderRadius: '4px',
    overflow: 'hidden',
    fontSize: '15px',
    fontFamily: 'Sarabun',
    fontWeight: 'bold'
  };

  const getCellStyle = (isLastRow: boolean) => ({
    padding: '4px 8px',
    borderBottom: isLastRow ? 'none' : '1px solid #F5F1F2',
    fontFamily: 'Sarabun',
    fontSize: '15px',
    fontWeight: 'bold',
    width: '50%'
  });

  const getLeftCellStyle = (isLastRow: boolean) => ({
    ...getCellStyle(isLastRow),
    borderRight: '1px solid #F5F1F2'
  });

  if (loading) {
    // Skeleton loader with same structure as table
    const skeletonRows = Array.from({ length: 26 }, (_, index) => (
      <tr 
        key={`skeleton-${index}`}
        style={{ 
          backgroundColor: index % 2 === 0 ? '#eeebed' : 'white' 
        }}
      >
        <td style={getLeftCellStyle(index === 25)}>
          <div style={{
            height: '15px',
            backgroundColor: '#d0d0d0',
            borderRadius: '2px',
            animation: 'pulse 1.5s ease-in-out infinite'
          }} />
        </td>
        <td style={getCellStyle(index === 25)}>
          <div style={{
            height: '15px',
            backgroundColor: '#d0d0d0',
            borderRadius: '2px',
            animation: 'pulse 1.5s ease-in-out infinite',
            animationDelay: '0.1s'
          }} />
        </td>
      </tr>
    ));

    return (
      <div className="absolute" style={containerStyle}>
        <style>
          {`
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.5; }
            }
          `}
        </style>
        <table style={tableStyle}>
          <tbody>
            {skeletonRows}
          </tbody>
        </table>
      </div>
    );
  }

  if (error) {
    return (
      <div className="absolute" style={containerStyle}>
        <div style={{ padding: '20px', textAlign: 'center', color: 'red', fontFamily: 'Sarabun' }}>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="absolute" style={containerStyle}>
      <table style={tableStyle}>
        <tbody>
          {profileData.map((item, index) => {
            const isOddRow = index % 2 === 0;
            const isLastRow = index === profileData.length - 1;
            
            return (
              <tr 
                key={item.label} 
                style={{ 
                  backgroundColor: isOddRow ? '#eeebed' : 'white' 
                }}
              >
                <td style={getLeftCellStyle(isLastRow)}>
                  {item.label}
                </td>
                <td style={getCellStyle(isLastRow)}>
                  {item.value}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default RightTables;
