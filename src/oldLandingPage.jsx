  import { useState, useEffect } from "react";

export default function LandingPage({ setPage }) {
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 3500);

    const hideTimer = setTimeout(() => {
      setShowSplash(false);
    }, 4200);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">

      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-[150px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />

        <div className="absolute w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] left-1/4 top-1/3 animate-pulse" />

        <div className="absolute w-[250px] h-[250px] bg-cyan-400/10 rounded-full blur-[90px] right-1/4 bottom-1/4 animate-pulse" />
      </div>

      {/* SPLASH SCREEN */}
      {showSplash && (
        <div
          className={`absolute inset-0 z-50 bg-black flex items-center justify-center transition-all duration-1000 ${
            fadeOut ? "opacity-0 scale-125" : "opacity-100 scale-100"
          }`}
        >
          <div className="relative">

            {/* Glow Ring 1 */}
            <div className="absolute inset-0 rounded-full border border-cyan-400/30 scale-125 animate-spin" />

            {/* Glow Ring 2 */}
            <div
              className="absolute inset-0 rounded-full border border-cyan-300/20 scale-150 animate-spin"
              style={{
                animationDirection: "reverse",
                animationDuration: "8s",
              }}
            />

            {/* Logo */}
            <img
              src="/logo-symbol.png"
              alt="FRIDAY"
              className="w-72 h-72 md:w-96 md:h-96 object-contain drop-shadow-[0_0_50px_rgba(34,211,238,0.8)]"
            />
          </div>
        </div>
      )}

      {/* MAIN PAGE */}
      <div className="min-h-screen flex flex-col items-center justify-center px-4 relative z-10">

        {/* Floating Logo */}
      {/* Floating Logo */}
<div className="relative flex items-center justify-center w-96 h-96">

  {/* Glow */}
  <div className="absolute w-64 h-64 bg-cyan-400/20 blur-[100px] rounded-full" />

  {/* Ring 1 */}
  <div className="absolute w-72 h-72 rounded-full border border-cyan-400/30 animate-spin" />

  {/* Ring 2 */}
  <div
    className="absolute w-80 h-80 rounded-full border border-cyan-300/20 animate-spin"
    style={{
      animationDirection: "reverse",
      animationDuration: "8s",
    }}
  />

  {/* Logo */}
 <img
  src="/jarvis-logo.png"
  alt="FRIDAY"
  className="w-[280px] md:w-[350px] object-contain z-10 animate-bounce drop-shadow-[0_0_40px_rgba(250,204,21,0.6)]"
  style={{
    animationDuration: "4s",
  }}
/>
</div>
        {/* Title */}
        <h1 className="mt-8 text-6xl md:text-7xl font-bold text-white tracking-[0.25em]">
  FRIDAY
</h1>

        {/* Subtitle */}
       <p className="mt-4 text-cyan-300 text-lg md:text-xl text-center max-w-2xl">
  Your Intelligent Autonomous Learning Companion
</p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 mt-10">

          <button
            onClick={() => setPage("signup")}
            className="px-10 py-4 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(34,211,238,0.5)]"
          >
            Get Started
          </button>

          <button
            onClick={() => setPage("login")}
            className="px-10 py-4 rounded-full border border-cyan-400 text-cyan-300 hover:text-white hover:border-cyan-300 transition-all duration-300 hover:scale-105"
          >
            Log In
          </button>

        </div>
      </div>
    </div>
  );
} 
 