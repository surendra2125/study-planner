import React, { useState } from "react";
import LandingPage from "./LandingPage";
import SignUpPage from "./SignUpPage";
import TutorialPage from "./TutorialPage";

export default function App() {
  // ✅ ALL STATES AT TOP
  const [page, setPage] = useState("landing");

  const [activeMode, setActiveMode] = useState(null);
  const [highlightViewer, setHighlightViewer] = useState(false);
  const [highlightChat, setHighlightChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // ✅ JARVIS FUNCTION
  const callJarvis = (action, payload) => {
    console.log("Jarvis:", action, payload);

    if (action === "send_message") {
      setMessages((prev) => [
        ...prev,
        { role: "user", text: payload },
      ]);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { role: "jarvis", text: "Analyzing your request..." },
        ]);
      }, 600);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { role: "jarvis", text: "Proceeding with your input, Sir." },
        ]);
      }, 1400);
    }
  };

  // ✅ BUTTON HANDLERS
  const handlePhysicsClick = () => {
    setActiveMode("physics");
    setHighlightViewer(true);
    callJarvis("select_subject", "physics");
    setTimeout(() => setHighlightViewer(false), 1500);
  };

  const handleMathClick = () => {
    setActiveMode("math");
    setHighlightViewer(true);
    callJarvis("select_subject", "math");
    setTimeout(() => setHighlightViewer(false), 1500);
  };

  const handleStartProblem = () => {
    setHighlightChat(true);
    callJarvis("start_problem", null);
    setTimeout(() => setHighlightChat(false), 1500);
  };

  // ✅ PAGE ROUTING
  if (page === "landing") {
    return <LandingPage setPage={setPage} />;
  }

  if (page === "signup") {
    return <SignUpPage setPage={setPage} />;
  }

  if (page === "tutorial") {
    return <TutorialPage setPage={setPage} />;
  }

  // ✅ MAIN JARVIS UI
  if (page === "app") {
    return (
      <div className="flex h-screen w-full flex-col bg-black text-white p-4">

        {/* CONTROL BAR */}
        <div className="flex gap-4 bg-black/40 backdrop-blur-md p-3 rounded-xl border border-gray-800">
          <button
            onClick={handlePhysicsClick}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-400 hover:scale-105 transition transform shadow-lg shadow-blue-500/40"
          >
            Physics
          </button>

          <button
            onClick={handleMathClick}
            className="px-4 py-2 bg-green-600 rounded-xl hover:bg-green-500 transition shadow-green-500/30 shadow-lg"
          >
            Math
          </button>

          <button
            onClick={handleStartProblem}
            className="px-4 py-2 bg-purple-600 rounded-xl hover:bg-purple-500 transition shadow-purple-500/30 shadow-lg"
          >
            Start Problem
          </button>
        </div>

        {/* MAIN */}
        <div className="mt-4 flex flex-1 gap-4">

          {/* VIEWER */}
          <div
            className={`w-2/3 rounded-2xl p-4 border bg-gradient-to-br from-gray-900 to-black ${
              highlightViewer
                ? "border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.6)]"
                : "border-gray-800"
            }`}
          >
            <h2 className="text-xl mb-2">3D Problem Viewer</h2>
            <p className="text-gray-400">
              Mode: {activeMode || "None selected"}
            </p>

            <div className="mt-4 h-[80%] flex items-center justify-center border border-gray-700 rounded-xl text-gray-500">
              3D Simulation Space
            </div>
          </div>

          {/* CHAT */}
          <div
            className={`w-1/3 flex flex-col rounded-2xl p-4 border bg-black ${
              highlightChat
                ? "border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.6)]"
                : "border-gray-800"
            }`}
          >
            <h2 className="text-lg mb-2">Jarvis</h2>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto space-y-2">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`px-3 py-2 rounded-xl text-sm ${
                      msg.role === "user"
                        ? "bg-blue-600"
                        : "bg-gray-800"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* INPUT */}
            <div className="mt-2 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Talk to Jarvis..."
                className="flex-1 p-2 rounded-xl bg-gray-900 border border-gray-700"
              />

              <button
                onClick={() => {
                  if (!input) return;
                  callJarvis("send_message", input);
                  setInput("");
                }}
                className="px-3 bg-blue-600 rounded-xl hover:bg-blue-500"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ✅ FALLBACK
  return <div className="text-white">Loading...</div>;
}