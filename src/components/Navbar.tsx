import { useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react';
import Logo from '../assets/Logo.png';
import Help from '../assets/HelpButton.png';
import { useAuth } from '../contexts/AuthContext';

/**
 * Navbar Component - Top navigation bar
 * 
 * This component provides the main navigation for the application including:
 * - Brand logo
 * - Navigation links (Connections, Browse)
 * - User dropdown with authentication controls
 * - Help button
 * - Mobile responsive menu
 * - Authentication integration via AuthContext
 * 
 * Features:
 * - Responsive design (desktop/mobile)
 * - Dropdown menu for user actions
 * - Mobile hamburger menu
 * - Logout functionality
 * - Multi-layered background styling
 */
function Navbar() {
  // State management for dropdown and mobile menu visibility
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Get authentication data from context (username and logout function)
  const { username, logout } = useAuth();
  
  return (
    <div className="relative w-full">
      <nav className="w-full relative z-10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-full">
            {/* Brand Logo - responsive sizing */}
            <div className="flex items-center">
              <img 
                src={Logo} 
                alt="Kind Singles Logo" 
                className="w-[162px] h-[47px] sm:w-[203px] sm:h-[59px] md:w-[243px] md:h-[70px] mt-[7px] sm:mt-[8px] md:mt-[10px]" 
              />
            </div>

            {/* Desktop Navigation - hidden on mobile */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Main navigation links */}
              <div className="flex items-center space-x-6">
                <a href="#" className="text-pink-500 font-medium underline">
                  Connections
                </a>
                
                <a href="#" className="text-blue-500 font-medium underline">
                  Browse
                </a>
              </div>
              
              {/* User controls and help */}
              <div className="flex items-center space-x-4">
                {/* Username dropdown menu */}
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-1 text-gray-900 font-medium"
                  >
                    <span>{username}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  
                  {/* Dropdown menu content */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200">
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        Profile
                      </a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        Settings
                      </a>
                      <hr className="my-1" />
                      {/* Logout button - calls logout function from AuthContext */}
                      <button 
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
                
                {/* Help icon button */}
                <button className="cursor-pointer relative z-20">
                  <img src={Help} alt="Help" className="w-[21px] h-[21px]" />
                </button>
              </div>
            </div>

            {/* Mobile menu controls - visible only on mobile */}
            <div className="flex md:hidden items-center space-x-3">
              {/* Mobile help button */}
              <button className="cursor-pointer relative z-20">
                <img src={Help} alt="Help" className="w-[18px] h-[18px]" />
              </button>
              {/* Mobile hamburger menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-gray-900"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown - shown when mobileMenuOpen is true */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 absolute w-full z-30">
            <div className="px-4 pt-2 pb-3 space-y-1">
              {/* Mobile navigation links */}
              <a href="#" className="block px-3 py-2 text-pink-500 font-medium">
                Connections
              </a>
              <a href="#" className="block px-3 py-2 text-blue-500 font-medium">
                Browse
              </a>
              {/* Mobile user menu */}
              <div className="border-t border-gray-200 pt-2 mt-2">
                <a href="#" className="block px-3 py-2 text-gray-700">
                  Profile
                </a>
                <a href="#" className="block px-3 py-2 text-gray-700">
                  Settings
                </a>
                {/* Mobile logout button */}
                <button 
                  onClick={logout}
                  className="block w-full text-left px-3 py-2 text-gray-700"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
      
      {/* Background styling layers - creates the visual design */}
      {/* Top white background section */}
      <div className="absolute top-0 w-full h-[21px] bg-white z-0"></div>
      
      {/* Middle section with light blue background */}
      <div className="absolute bottom-[20px] w-full h-[53px] z-0" style={{backgroundColor: '#F2F6F8'}}></div>
      
      {/* Bottom overlay with darker blue */}
      <div className="absolute bottom-[10px] w-full h-[10px] z-0" style={{backgroundColor: '#E3EDF5'}}></div>
    </div>
  )
}

export default Navbar