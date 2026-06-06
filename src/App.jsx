import { useState, useEffect } from "react";
import LandingPage from "./LandingPage";
import SignUpPage from "./SignUpPage";
import TutorialPage from "./TutorialPage";
import QuestionPage from "./QuestionPage";
import JarvisChat from "./JarvisChat";
import ThreeViewer from "./ThreeViewer";
import CQProfile from "./CQProfile";
import LoginPage from "./loginpage";
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
 const [questionData, setQuestionData] = useState(null);
 useEffect(() => {
  if (
    questionData?.student_challenge &&
    questionData.student_challenge.trim() !== ""
  ) {
    setActiveOverlay("challenge");
  }
}, [questionData]);
const [activeOverlay, setActiveOverlay] = useState(null);
const [sidebarOpen, setSidebarOpen] = useState(false);
const [modelUrl, setModelUrl] = useState(null);
  // ✅ DEBUG (optional)
  
  console.log("QUESTION DATA", questionData);

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

 if (page === "login")
  return (
    <LoginPage
      setPage={setPage}
      setUsernameGlobal={setUsername}
    />
  );

  if (page === "tutorial") {
    return <TutorialPage setPage={setPage} />;
  }
  if (page === "cqprofile") {
  return <CQProfile setPage={setPage} />;
}

  // ✅ MAIN JARVIS UI
  if (page === "app") {
    return (
      
  <div className="h-screen overflow-hidden flex bg-black text-white">

    {/* LEFT SIDE */}
    <div className="w-[70%] h-full p-4 flex gap-3">
     <div className="flex h-full gap-3">
   
     </div>
      <div
  className={`transition-all duration-300 ${
    sidebarOpen ? "w-56" : "w-12"
  }`}
>

  <div className="h-full border border-gray-700 rounded-2xl bg-gray-950 p-2">

    <button
      onClick={() => setSidebarOpen(!sidebarOpen)}
      className="w-full mb-4 bg-cyan-500 text-black rounded-lg py-2"
    >
      {sidebarOpen ? "<" : ">"}
    </button>

    {sidebarOpen && (
      <div className="flex flex-col gap-2">

        <button
          onClick={() => setActiveOverlay("facts")}
          className="text-left p-2 rounded-lg bg-gray-800"
        >
          Facts
        </button>

        <button
          onClick={() => setActiveOverlay("problem")}
          className="text-left p-2 rounded-lg bg-gray-800"
        >
          Problem Statement
        </button>

        <button
          onClick={() => setActiveOverlay("challenge")}
          className="text-left p-2 rounded-lg bg-gray-800"
        >
          Student Challenge
        </button>

        

      </div>
    )}
  </div>
</div>
      <div className="flex-1 h-full border border-gray-700 rounded-2xl p-4">
        
<div className="flex items-center gap-4 mb-4">

  {/* Components */}
  <details className="bg-gray-900 border border-cyan-500/30 rounded-xl px-4 py-2">
    <summary className="cursor-pointer">
      Components ▼
    </summary>

    <p className="mt-2 text-gray-400">
      Component viewer coming soon
    </p>
  </details>

  {/* Constraints */}
  <details className="bg-gray-900 border border-cyan-500/30 rounded-xl px-4 py-2">
    <summary className="cursor-pointer">
      Constraints ▼
    </summary>

    <div className="mt-3 flex flex-col gap-2">
      {questionData?.constraints
        ?.replace("[", "")
        ?.replace("]", "")
        ?.split(",")
        ?.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
    </div>
  </details>

  {/* Push profile button to far right */}
  <div className="flex-1" />

  {/* Profile Button */}
  <button
    onClick={() => setPage("cqprofile")}
    className="w-10 h-10 rounded-full bg-gray-900 border border-cyan-500/30 hover:border-cyan-400 flex items-center justify-center text-lg"
  >
    👤
  </button>

</div>

     <div className="h-[85%] border border-gray-700 rounded-2xl overflow-hidden relative">

 {!activeOverlay &&  <ThreeViewer modelUrl={modelUrl} />}
{activeOverlay && questionData && (
  <div className="absolute inset-0 bg-black p-6 overflow-auto">

    <button
      onClick={() => setActiveOverlay(null)}
      className="float-right text-red-400 text-2xl"
    >
      ✕
    </button>

    {activeOverlay === "problem" && (
      <>
        <h2 className="text-3xl text-cyan-400 mb-4">
          {questionData.problem_title}
        </h2>

        <p className="text-gray-300 whitespace-pre-wrap">
          {questionData.problem_explanation}
        </p>
      </>
    )}

    {activeOverlay === "facts" && (
      <>
        <h2 className="text-3xl text-cyan-400 mb-4">
          Facts & Data
        </h2>

        <p className="text-gray-300 whitespace-pre-wrap">
          {questionData.facts_and_data}
        </p>
      </>
    )}

    {activeOverlay === "challenge" && (
      <>
        <h2 className="text-3xl text-cyan-400 mb-4">
          Student Challenge
        </h2>

        <p className="text-gray-300 whitespace-pre-wrap">
          {questionData.student_challenge}
        </p>
      </>
    )}

  </div>
)}
 

</div>

      </div>

    </div>

    {/* RIGHT SIDE CHAT */}
    <div className="w-[30%] h-full border-l border-gray-800">
      <JarvisChat
  username="jarvis"
  setQuestionData={setQuestionData}
  setModelUrl={setModelUrl}

/>
    </div>

  </div>
);}

  return <div className="text-white">Loading...</div>;
}