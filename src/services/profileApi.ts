// API service for profile data
import type { ProfileAttribute, ApiResponse, HobbyItem, QuoteItem, BeatboxBioData } from '../types';

class ProfileApiService {
  private baseUrl = '/api';

  // Fetch profile attributes for a user
  async getProfileAttributes(_userId?: string): Promise<ProfileAttribute[]> {
    try {
      // For now, using mock data from public folder
      // In production, this would be: `/api/users/${userId}/profile`
      const response = await fetch(`${this.baseUrl}/profile.json`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiResponse<ProfileAttribute[]> = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch profile data');
      }
      
      return result.data;
    } catch (error) {
      console.error('Error fetching profile attributes:', error);
      throw error;
    }
  }

  // Update a specific profile attribute
  async updateProfileAttribute(
    userId: string, 
    label: string, 
    value: string
  ): Promise<ProfileAttribute> {
    try {
      const response = await fetch(`${this.baseUrl}/users/${userId}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ label, value }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiResponse<ProfileAttribute> = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to update profile attribute');
      }
      
      return result.data;
    } catch (error) {
      console.error('Error updating profile attribute:', error);
      throw error;
    }
  }

  // Add a new profile attribute
  async addProfileAttribute(
    userId: string, 
    attribute: ProfileAttribute
  ): Promise<ProfileAttribute> {
    try {
      const response = await fetch(`${this.baseUrl}/users/${userId}/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(attribute),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiResponse<ProfileAttribute> = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to add profile attribute');
      }
      
      return result.data;
    } catch (error) {
      console.error('Error adding profile attribute:', error);
      throw error;
    }
  }

  // Delete a profile attribute
  async deleteProfileAttribute(
    userId: string, 
    label: string
  ): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/users/${userId}/profile/${encodeURIComponent(label)}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiResponse<null> = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to delete profile attribute');
      }
    } catch (error) {
      console.error('Error deleting profile attribute:', error);
      throw error;
    }
  }

  // Fetch hobbies/experiences for a user
  async getHobbies(_userId?: string): Promise<HobbyItem[]> {
    try {
      // For now, using mock data from public folder
      // In production, this would be: `/api/users/${userId}/hobbies`
      const response = await fetch(`${this.baseUrl}/hobbies.json`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiResponse<HobbyItem[]> = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch hobbies data');
      }
      
      return result.data;
    } catch (error) {
      console.error('Error fetching hobbies:', error);
      throw error;
    }
  }

  // Fetch quotes/questions for a user
  async getQuotes(_userId?: string): Promise<QuoteItem[]> {
    try {
      // For now, using mock data from public folder
      // In production, this would be: `/api/users/${userId}/quotes`
      const response = await fetch(`${this.baseUrl}/quotes.json`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiResponse<QuoteItem[]> = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch quotes data');
      }
      
      // Sort by order to ensure proper display sequence
      return result.data.sort((a, b) => a.order - b.order);
    } catch (error) {
      console.error('Error fetching quotes:', error);
      throw error;
    }
  }

  // Fetch beatbox bio for a user
  async getBeatboxBio(_userId?: string): Promise<BeatboxBioData> {
    try {
      // For now, using mock data from public folder
      // In production, this would be: `/api/users/${userId}/beatbox-bio`
      const response = await fetch(`${this.baseUrl}/beatbox-bio.json`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiResponse<BeatboxBioData> = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch beatbox bio data');
      }
      
      return result.data;
    } catch (error) {
      console.error('Error fetching beatbox bio:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const profileApi = new ProfileApiService();

// Export for easier importing
export default profileApi;
