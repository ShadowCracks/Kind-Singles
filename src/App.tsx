import './App.css'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Hobby from './components/Hobby'
import ProfileContent from './components/ProfileContent'
import RightTables from './components/RightTables'
import AuthWrapper from './components/AuthWrapper'
import MyHobby from './components/MyHobby'


function App() {
  const [heroLoaded, setHeroLoaded] = useState(false)

  return (
    <AuthWrapper>
      <div className="relative min-h-screen bg-[#fff6f7]">
        <Navbar />
        {/* SVG lines background */}
        {/* <svg
          className="absolute"
          width="1183"
          height="1782"
          style={{ left: '178px', top: '126px' }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="1"
            y="1"
            width="1181"
            height="1780"
            fill="none"
            stroke="#D4D0CE"
            strokeWidth="2"
            rx="10"
            ry="10"
          />
        </svg>
        <Hero onLoaded={() => setHeroLoaded(true)} /> */}
        {!heroLoaded && (
          <div className="flex items-center justify-center  container mx-auto p-4">
            {/* <Hobby />
            <ProfileContent />
            <RightTables /> */}
            <MyHobby />
          </div>
        )}
      </div>
    </AuthWrapper>
  )
}

export default App
