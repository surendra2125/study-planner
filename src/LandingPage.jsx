import { useState } from "react";

export default function LandingPage({ setPage }) {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">

      {/* INTRO VIDEO */}
      {showIntro && (
        <video
          autoPlay
           muted
          playsInline
          onEnded={() => setShowIntro(false)}
          className="fixed inset-0 w-full h-full object-cover z-50"
        >
          <source src="/intro.mp4" type="video/mp4" />
        </video>
      )}

      {/* LANDING PAGE */}
      {!showIntro && (
        <div className="min-h-screen flex flex-col items-center justify-center relative">

          {/* Background Glow */}
          <div className="absolute inset-0">

            <div className="absolute w-[700px] h-[700px]
            bg-cyan-500/10
            rounded-full
            blur-[150px]
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2" />

            <div className="absolute w-[300px] h-[300px]
            bg-cyan-400/10
            rounded-full
            blur-[100px]
            left-1/4
            top-1/3" />

          </div>

          {/* Logo */}
          <div className="relative z-10">

            {/* Glow */}
            <div
              className="
              absolute
              inset-0
              bg-cyan-400/20
              blur-[100px]
              rounded-full
              scale-125
            "
            />

            <img
              src="/jarvis-logo.png"
              alt="FRIDAY"
              className="
              w-[220px]
              md:w-[300px]
              object-contain
              relative
              z-10
              "
            />

          </div>

          {/* Title */}
          <h1
            className="
            z-10
            mt-8
            text-6xl
            md:text-7xl
            font-bold
            text-white
            tracking-[0.3em]
            "
          >
            FRIDAY
          </h1>

          {/* Subtitle */}
          <p
            className="
            z-10
            mt-4
            text-cyan-300
            text-lg
            md:text-xl
            text-center
            max-w-2xl
            "
          >
            Your Intelligent Autonomous Learning Companion
          </p>

          {/* Buttons */}
          <div className="z-10 flex gap-5 mt-10">

            <button
              onClick={() => setPage("signup")}
              className="
              px-10
              py-4
              rounded-full
              bg-cyan-500
              hover:bg-cyan-400
              text-black
              font-semibold
              transition-all
              duration-300
              hover:scale-105
              shadow-[0_0_30px_rgba(34,211,238,0.5)]
              "
            >
              Get Started
            </button>

            <button
              onClick={() => setPage("login")}
              className="
              px-10
              py-4
              rounded-full
              border
              border-cyan-400
              text-cyan-300
              hover:text-white
              hover:border-cyan-300
              transition-all
              duration-300
              hover:scale-105
              "
            >
              Log In
            </button>

          </div>

        </div>
      )}

    </div>
  );
}