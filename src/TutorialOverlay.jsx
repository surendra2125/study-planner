import { useState, useEffect } from "react";
import jarvisLogo from "./assets/jarvis.png";
import labAudio from "./assets/tutorial/lab.mp3";
import chatAudio from "./assets/tutorial/chat.mp3";
import factsAudio from "./assets/tutorial/facts.mp3";
import problemAudio from "./assets/tutorial/problem.mp3";
import challengeAudio from "./assets/tutorial/challenge.mp3";
import componentsAudio from "./assets/tutorial/components.mp3";
import constraintsAudio from "./assets/tutorial/constraints.mp3";
import cqAudio from "./assets/tutorial/cq.mp3";
import achievementsAudio from "./assets/tutorial/acheivements.mp3";
import progressAudio from "./assets/tutorial/progress.mp3";
import completeAudio from "./assets/tutorial/complete.mp3";

export default function TutorialOverlay({
  tutorialStep,
  setTutorialStep,
  setPage,
  setTutorialActive,
}) {
  const steps = [
    {
      target: "tutorial-lab",
      side: "right",
      text: "This is your Laboratory. 3D models and simulations appear here.",
    },

    {
      target: "tutorial-chat",
      side: "left",
      text: "This is where you communicate with me. Ask questions naturally.",
    },

    {
      target: "tutorial-facts",
      side: "right",
      text: "mission provide background information about the challenge.",
    },
//constraints
    {
      target: "tutorial-problem",
      side: "right",
      text: "you have to create a model using this equipment",
    },
//design
    {
      target: "tutorial-challenge",
      side: "right",
      text: "you can see previous 3d models history",
    },

    {
      target: "tutorial-components",
      side: "right",
      text: "Relevant components appear here when needed.",
    },
//result 
    {
      target: "tutorial-constraints",
      side: "right",
      text: "result of your current test.",
    },

    {
      target: "tutorial-cq",
      side: "right",
      text: "Your Curiosity Quotient grows as you explore.",
    },

    {
      target: "tutorial-achievements",
      side: "left",
      text: "Unlock achievements during your learning journey.",
    },

    {
      target: "tutorial-progress",
      side: "left",
      text: "Track your growth over time.",
    },
  ];
const tutorialAudio = [
  labAudio,
  chatAudio,
  factsAudio,
  problemAudio,
  challengeAudio,
  componentsAudio,
  constraintsAudio,
  cqAudio,
  achievementsAudio,
  progressAudio,
];
  const [jarvisPos, setJarvisPos] = useState({
    top: 100,
    left: 100,
  });
const [audio] = useState(new Audio());
useEffect(() => {
  if (
    tutorialStep < 0 ||
    tutorialStep >= steps.length
  ) {
    return;
  }

  const element = document.getElementById(
    steps[tutorialStep].target
  );

  if (!element) return;

  const rect = element.getBoundingClientRect();

  const cardWidth = 380;

  let left;

  // Rating Progress
  if (
    steps[tutorialStep].target ===
    "tutorial-progress"
  ) {
    left = rect.left + rect.width / 2 - 200;
  }

  // Chat
  else if (
    steps[tutorialStep].target ===
    "tutorial-chat"
  ) {
    left = rect.left - cardWidth + 50;
  }

  // Normal left-side positioning
  else if (
    steps[tutorialStep].side === "left"
  ) {
    left = rect.left - cardWidth;
  }

  // Normal right-side positioning
  else {
    left = rect.right + 35;
  }

  let top;

  if (
    steps[tutorialStep].target ===
    "tutorial-progress"
  ) {
    top = rect.top + rect.height / 2 - 220;
  } else {
    top = rect.top + 20;

    const cardHeight = 220;

    if (
      top + cardHeight >
      window.innerHeight
    ) {
      top =
        window.innerHeight -
        cardHeight -
        20;
    }

    if (top < 20) {
      top = 20;
    }
  }

  setJarvisPos({
    top,
    left,
  });
}, [tutorialStep]);

useEffect(() => {
  if (
    tutorialStep < 0 ||
    tutorialStep >= steps.length
  ) {
    return;
  }

  document
    .querySelectorAll(".tutorial-glow")
    .forEach((el) => {
      el.classList.remove(
        "tutorial-glow",
        "ring-4",
        "ring-cyan-400",
        "shadow-[0_0_40px_rgba(34,211,238,0.7)]"
      );
    });

  const element = document.getElementById(
    steps[tutorialStep].target
  );

  if (!element) return;

  element.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });

  element.classList.add(
    "tutorial-glow",
    "ring-4",
    "ring-cyan-400",
    "shadow-[0_0_40px_rgba(34,211,238,0.7)]"
  );
}, [tutorialStep]);
useEffect(() => {
  return () => {
    document
      .querySelectorAll(".tutorial-glow")
      .forEach((el) => {
        el.classList.remove(
          "tutorial-glow",
          "ring-4",
          "ring-cyan-400",
          "shadow-[0_0_40px_rgba(34,211,238,0.7)]"
        );
      });
  };
}, []);
// Open CQ Profile when CQ step starts
useEffect(() => {
  if (
    steps[tutorialStep]?.target ===
    "tutorial-cq"
  ) {
    setPage("cqprofile");
  }
}, [tutorialStep, setPage]);
  // Tutorial Complete
 
useEffect(() => {
  if (
    tutorialStep < 0 ||
    tutorialStep >= tutorialAudio.length
  ) {
    return;
  }

  audio.pause();
  audio.currentTime = 0;

  audio.src = tutorialAudio[tutorialStep];

  audio.play().catch((err) => {
    console.log(err);
  });
}, [tutorialStep, audio]);
useEffect(() => {
  if (tutorialStep === steps.length) {
    audio.pause();
    audio.currentTime = 0;

    audio.src = completeAudio;

    audio.play().catch((err) => {
      console.log(err);
    });
  }
}, [tutorialStep, audio]);
  if (tutorialStep >= steps.length) {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[99999]">
        <div className="bg-gray-900 border border-cyan-500 rounded-2xl p-8 text-center max-w-md">

          <img
            src={jarvisLogo}
            alt="Jarvis"
            className="w-24 mx-auto mb-6"
          />

          <h1 className="text-3xl font-bold text-cyan-400 mb-4">
            Tutorial Complete
          </h1>

          <p className="text-gray-300 mb-6">
            Your Laboratory is Ready.
            <br />
            Your First Challenge Awaits.
          </p>

          <button
           onClick={() => {
  audio.pause();
  audio.currentTime = 0;

  setTutorialActive(false);
  setPage("app");
}}
            className="px-6 py-3 bg-cyan-500 text-black rounded-xl font-semibold"
          >
            Get Started 🚀
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed z-[99999] transition-all duration-1000 ease-in-out"
      style={{
        top: jarvisPos.top,
        left: jarvisPos.left,
      }}
    >
      <img
        src={jarvisLogo}
        alt="Jarvis"
        className="w-14 h-14 mb-2"
      />

      <div className="bg-gray-900 border border-cyan-500 rounded-xl p-4 w-80 shadow-lg">
        <p className="text-white">
          {steps[tutorialStep].text}
        </p>

        <div className="flex justify-between mt-4">
          <button
            onClick={() =>
              setTutorialStep(
                Math.max(
                  0,
                  tutorialStep - 1
                )
              )
            }
            className="px-3 py-2 bg-gray-700 rounded"
          >
            Back
          </button>

          <button
            onClick={() =>
              setTutorialStep(
                tutorialStep + 1
              )
            }
            className="px-3 py-2 bg-cyan-500 text-black rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}