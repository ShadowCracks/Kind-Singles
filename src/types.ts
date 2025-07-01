// User and profile related types
export interface User {
  id: number;
  name: string;
  age: number;
  location: string;
  lookingFor: string;
  ageRange: string;
  profileImage: string;
  preferences: UserPreferences;
  contactMethods: ContactMethod[];
}

export interface UserPreferences {
  title: string;
  items: string[];
}

export interface ContactMethod {
  type: string;
  icon: string;
  dimensions: {
    width: number;
    height: number;
  };
}

// Profile attributes for the right-side table
export interface ProfileAttribute {
  label: string;
  value: string;
}

// Hobby/experience interface
export interface HobbyItem {
  id: string;
  text: string;
  width: number;
}

// Quote interface for profile quotes/questions
export interface QuoteItem {
  id: string;
  title: string;
  content: string;
  order: number;
}

// Beatbox bio interface
export interface BeatboxBioData {
  id: string;
  title: string;
  content: string;
  backgroundColor: string;
}

// API response types
export interface UserDataResponse {
  user: User;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}
