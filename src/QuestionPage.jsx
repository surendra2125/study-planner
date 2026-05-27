import { useState } from "react";

export default function QuestionPage({
  question,
  webhookLink,
  setPage,
  setQuestion,
  setWebhookLink
}){
  const [answer, setAnswer] = useState("");

const handleSubmit = async () => {
  if (!answer) {
    alert("Enter answer");
    return;
  }

  console.log("Sending answer:", answer);
  console.log("Webhook link:", webhookLink);

  try {
    const res = await fetch(webhookLink, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answer }),
    });

    const text = await res.text();
    console.log("Backend response:", text);

    const data = JSON.parse(text);

    if (data.question) {
      // 🔁 LOOP CONTINUES
      setQuestion(data.question);
      setWebhookLink(data.webhookLink);
      setAnswer("");
    } else {
      // ✅ LOOP ENDS
      setPage("tutorial");
    }

  } catch (err) {
    console.error(err);
    alert("Error sending answer");
  }
};
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white gap-4">

      <h2 className="text-2xl font-bold">Question</h2>

      <p className="max-w-md text-center">{question}</p>

      <input
        type="text"
        placeholder="Your answer..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="px-4 py-2 rounded bg-gray-800 border border-gray-600 w-80"
      />

      <button
        onClick={handleSubmit}
        className="px-6 py-2 bg-cyan-500 rounded"
      >
        Submit
      </button>
    </div>
  );
}