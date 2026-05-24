import { useState, useEffect } from "react";

export default function TutorialPage({ setPage }) {
  const steps = [
    "Welcome, Sir. I am Jarvis, your AI assistant.",
    "On the left, you will see the simulation viewer.",
    "On the right, I will assist you through problems.",
    "Select a mode like Physics or Math to begin.",
    "Click 'Start Problem' to start solving.",
  ];

  const [currentStep, setCurrentStep] = useState(0);

  // Auto progress tutorial
  useEffect(() => {
    if (currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">

      {/* Title */}
      <h2 className="text-3xl mb-6">System Initialization</h2>

      {/* Fake UI Preview */}
      <div className="flex gap-4 w-full max-w-4xl mb-8">

        {/* Viewer */}
        <div className="flex-1 h-48 rounded-xl border border-cyan-500/30 flex items-center justify-center relative">
          <span className="text-gray-500">Viewer</span>

          {/* Highlight */}
          {currentStep === 1 && (
            <div className="absolute inset-0 border-2 border-cyan-400 rounded-xl animate-pulse"></div>
          )}
        </div>

        {/* Chat */}
        <div className="w-1/3 h-48 rounded-xl border border-purple-500/30 flex items-center justify-center relative">
          <span className="text-gray-500">Jarvis Chat</span>

          {currentStep === 2 && (
            <div className="absolute inset-0 border-2 border-purple-400 rounded-xl animate-pulse"></div>
          )}
        </div>
      </div>

      {/* Jarvis Message */}
      <div className="mb-8 p-4 rounded-xl bg-white/5 border border-gray-800 max-w-xl text-center shadow-[0_0_20px_rgba(34,211,238,0.2)]">
        {steps[currentStep]}
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        <button
          onClick={() => setPage("app")}
          className="px-6 py-3 bg-cyan-500 rounded-xl hover:bg-cyan-400 transition shadow-lg shadow-cyan-500/30"
        >
          Skip
        </button>

        <button
          onClick={() => setPage("app")}
          className="px-6 py-3 bg-blue-600 rounded-xl hover:bg-blue-500 transition shadow-lg shadow-blue-500/30"
        >
          Start
        </button>
      </div>
    </div>
  );
}