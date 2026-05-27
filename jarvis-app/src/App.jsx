import { useState } from "react";
import LandingPage from "./LandingPage";
import SignUpPage from "./SignUpPage";
import TutorialPage from "./TutorialPage";
import QuestionPage from "./QuestionPage";
import JarvisChat from "./JarvisChat";
export default function App() {

  // ✅ PAGE STATE (FIXED)
  const [page, setPage] = useState("landing");
const [question, setQuestion] = useState("");
const [webhookLink, setWebhookLink] = useState("");
  // ✅ JARVIS STATES
  const [activeMode, setActiveMode] = useState(null);
  const [highlightViewer, setHighlightViewer] = useState(false);
  const [highlightChat, setHighlightChat] = useState(false);
  
 const [username, setUsername] = useState("");
  // ✅ DEBUG (optional)
  console.log("Current Page:", page);

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

  // ✅ PAGE ROUTING (FIXED)
  if (page === "landing") {
    return <LandingPage setPage={setPage} />;
  }
if (page === "question") {
  return (
   <QuestionPage
  question={question}
  webhookLink={webhookLink}
  setPage={setPage}
  setQuestion={setQuestion}
  setWebhookLink={setWebhookLink}
/>
  );
}

  if (page === "signup") {
    return (
  <SignUpPage
    setPage={setPage}
    setQuestion={setQuestion}
    setWebhookLink={setWebhookLink}
     setUsernameGlobal={setUsername}  
  />
);
  }

  if (page === "login") {
    return <SignUpPage setPage={setPage} />; // change later if you make LoginPage
  }

  if (page === "tutorial") {
    return <TutorialPage setPage={setPage} />;
  }

  // ✅ MAIN JARVIS UI
  if (page === "app") {
    return (
  <div className="h-screen overflow-hidden flex bg-black text-white">

    {/* LEFT SIDE */}
    <div className="w-2/3 h-full p-4">
      
      <div className="h-full border border-gray-700 rounded-2xl p-4">
        
        <h1 className="text-3xl mb-4">
          3D Problem Viewer
        </h1>

        <p className="text-gray-400 mb-4">
          Mode: None selected
        </p>

        <div className="h-[85%] border border-gray-700 rounded-2xl flex items-center justify-center text-gray-500">
          3D Simulation Space
        </div>

      </div>

    </div>

    {/* RIGHT SIDE CHAT */}
    <div className="w-1/3 h-full border-l border-gray-800">
      <JarvisChat username="jarvis" />
    </div>

  </div>
);}

  return <div className="text-white">Loading...</div>;
}