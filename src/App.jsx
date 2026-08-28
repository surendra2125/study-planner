import { useState, useEffect } from "react";
import SaiPage from "./sai";

import LandingPage from "./LandingPage";
import SignUpPage from "./SignUpPage";
import TutorialPage from "./TutorialPage";
import QuestionPage from "./QuestionPage";
import JarvisChat from "./JarvisChat";
import ThreeViewer from "./ThreeViewer";
import CQProfile from "./CQProfile";
import LoginPage from "./loginpage";
import OtpPage from "./Otppage";
import TutorialOverlay from "./TutorialOverlay";
export default function App() {

  // ✅ PAGE STATE (FIXED)
const [page, setPage] = useState("tutorial");
const [question, setQuestion] = useState("");
const [webhookLink, setWebhookLink] = useState("");
  // ✅ JARVIS STATE
  const [activeMode, setActiveMode] = useState(null);
  const [highlightViewer, setHighlightViewer] = useState(false);
  const [highlightChat, setHighlightChat] = useState(false);
  
 const [username, setUsername] = useState("");
 const [userId, setUserId] = useState("");
 const [questionData, setQuestionData] = useState(null);
 const [tutorialStep, setTutorialStep] = useState(0);
const [tutorialActive, setTutorialActive] = useState(false);
 useEffect(() => {
  if (
    questionData?.student_challenge &&
    questionData.student_challenge.trim() !== ""
  ) {
    setActiveOverlay("challenge");
  }
}, [questionData]);
const [activeOverlay, setActiveOverlay] = useState(null);
const [sidebarOpen, setSidebarOpen] = useState(true);
const [modelUrl, setModelUrl] = useState(null);
  
  
  console.log("QUESTION DATA", questionData);


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
if (page === "sai") {
  return <SaiPage setPage={setPage} />;
}
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
     setUserId={setUserId}
  />
);
  }
  if (page === "otp") {
  return (
    <OtpPage
      setPage={setPage}
      setQuestion={setQuestion}
      setWebhookLink={setWebhookLink}
       setUserId={setUserId}
    />
  );
}

 if (page === "login")
  return (
    <LoginPage
      setPage={setPage}
      setUsernameGlobal={setUsername}
       setUserId={setUserId}
    />
  );


 if (page === "tutorial") {
  return (
    <TutorialPage
      setPage={setPage}
      tutorialStep={tutorialStep}
      setTutorialStep={setTutorialStep}
      setTutorialActive={setTutorialActive}
    />
  );
}
if (page === "cqprofile") {
  return (
    <>
      <CQProfile
        setPage={setPage}
        tutorialActive={tutorialActive}
      />

      {tutorialActive && (
        <TutorialOverlay
          tutorialStep={tutorialStep}
          setTutorialStep={setTutorialStep}
          setPage={setPage}
          setTutorialActive={setTutorialActive}
        />
      )}
    </>
  );
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

  <div 
   id="tutorial-sidebar"
   className="h-full border border-gray-700 rounded-2xl bg-gray-950 p-2"
   >

    <button
      onClick={() => setSidebarOpen(!sidebarOpen)}
      className="w-full mb-4 bg-cyan-500 text-black rounded-lg py-2"
    >
      {sidebarOpen ? "<" : ">"}
    </button>

    {sidebarOpen && (
      <div className="flex flex-col gap-2">

        <button
         id="tutorial-facts"
          onClick={() => setActiveOverlay("facts")}
          className="text-left p-2 rounded-lg bg-gray-800"
        >
          mission
        </button>

        <button
          id="tutorial-problem"
          onClick={() => setActiveOverlay("problem")}
          className="text-left p-2 rounded-lg bg-gray-800"
        >
          constraints1
        </button>

        <button
         id="tutorial-challenge"
          onClick={() => setActiveOverlay("challenge")}
          className="text-left p-2 rounded-lg bg-gray-800"
        >
          design log
        </button>

        

      </div>
    )}
  </div>
</div>
      <div className="flex-1 h-full border border-gray-700 rounded-2xl p-4">
        
<div className="flex items-center gap-4 mb-4">

  {/* Components */}
  <details 
    id="tutorial-components"
    className="bg-gray-900 border border-cyan-500/30 rounded-xl px-4 py-2"
    >
    <summary className="cursor-pointer">
      Components ▼
    </summary>

    <p className="mt-2 text-gray-400">
      Component viewer coming soon
    </p>
  </details>

  {/* Constraints */}
  <details 
   id="tutorial-constraints"
   className="bg-gray-900 border border-cyan-500/30 rounded-xl px-4 py-2"
   >
    <summary className="cursor-pointer">
      result▼
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

     <div 
      id="tutorial-lab"
      className="h-[85%] border border-gray-700 rounded-2xl overflow-hidden relative"
      >

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
    <div 
     id="tutorial-chat"
     className="w-[30%] h-full border-l border-gray-800">
      <JarvisChat
  username="jarvis"
  setQuestionData={setQuestionData}
  setModelUrl={setModelUrl}

/>
{tutorialActive && (
  <TutorialOverlay
    tutorialStep={tutorialStep}
    setTutorialStep={setTutorialStep}
    setPage={setPage}
    setTutorialActive={setTutorialActive}
  />
)}
    </div>

  </div>
);}

  return <div className="text-white">Loading...</div>;
}