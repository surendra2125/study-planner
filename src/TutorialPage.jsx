import { useEffect, useState } from "react";
import jarvisLogo from "./assets/jarvis.png";
import introAudio from "./assets/tutorial/intro.mp3";

export default function TutorialPage({
  setPage,
  setTutorialActive,
}) {
  const [started, setStarted] = useState(false);
useEffect(() => {
  if (!started) return;

  const audio = new Audio(introAudio);

  audio.play();

  audio.onended = () => {
    setTutorialActive(true);
    setPage("app");
  };

  return () => {
    audio.pause();
    audio.currentTime = 0;
  };
}, [started, setPage, setTutorialActive]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">

      <img
        src={jarvisLogo}
        alt="Jarvis"
        className="w-48 mb-8 animate-pulse"
      />
      

      <div className="max-w-xl text-center text-lg leading-relaxed">
        Hello Explorer.
        <br /><br />
        I am Jarvis.
        <br /><br />
        Your Curiosity Quotient Assistant.
        <br /><br />
        I am not here to provide answers.
        <br /><br />
        I am here to help you discover them.
      </div>
<button
  onClick={() => setStarted(true)}
  className="mt-8 px-6 py-3 bg-cyan-500 text-black rounded-xl font-semibold"
>
  Start Tutorial
</button>
    </div>
  );
}