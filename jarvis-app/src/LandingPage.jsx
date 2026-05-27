import { useState, useEffect } from 'react'

export default function LandingPage({ setPage }) {
  const [showSplash, setShowSplash] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true)
    }, 5000)

    const hideTimer = setTimeout(() => {
      setShowSplash(false)
    }, 5500)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      
      {/* Splash Screen */}
      {showSplash && (
        <div
          className={`absolute inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-500 ${
            fadeOut ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <img
            src="/logo.png"
            alt="Study Planner Logo"
            className="w-80 h-80 md:w-96 md:h-96 object-contain"
          />
        </div>
      )}

      {/* Main Landing Page */}
      <div className="min-h-screen flex flex-col items-center justify-center px-4 relative">

        {/* Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px]" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-8">

          {/* Logo */}
          <div className="w-48 h-48 md:w-56 md:h-56">
            <img
              src="/logo.png"
              alt="Study Planner Logo"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center">
            Start Your Journey
          </h1>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">

            {/* SIGN UP */}
            <button
              onClick={() => setPage("signup")}
              className="px-8 py-3 rounded-full border-2 border-cyan-400 text-cyan-300 hover:text-white hover:border-cyan-300 transition"
            >
              Sign Up
            </button>

            {/* LOGIN */}
            <button
              onClick={() => setPage("login")}  // 👈 DIFFERENT PAGE
              className="px-8 py-3 rounded-full border-2 border-cyan-400 text-cyan-300 hover:text-white hover:border-cyan-300 transition"
            >
              Log In
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}