import { useState, useEffect, useRef } from "react";

export default function JarvisChat({ username }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  // 🔽 auto scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🚀 SEND MESSAGE FUNCTION
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(
        "https://avvarusurendra.app.n8n.cloud/webhook/jarvis-chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: userMsg.text,
            id: username,
            history: [...messages, userMsg],
          }),
        }
      );

      const data = await res.json();

      const reply =
        data?.[0]?.output ||
        data?.output ||
        data?.message ||
        "No response";

      setMessages((prev) => [
        ...prev,
        { role: "jarvis", text: reply },
      ]);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          role: "jarvis",
          text: "⚠️ Error connecting to Jarvis",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-black text-white">
      
      {/* 🔹 CHAT AREA */}
      <div className="flex-1 overflow-y-auto space-y-3 p-4 pr-2">

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
              className={`px-4 py-2 rounded-2xl max-w-xs break-words ${
                msg.role === "user"
                  ? "bg-blue-600"
                  : "bg-gray-800 border border-gray-700"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-gray-400 text-sm">
            Jarvis is thinking...
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* 🔹 INPUT AREA */}
      <div className="flex gap-2 p-3 border-t border-gray-700">

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Talk to Jarvis..."
          className="flex-1 p-3 rounded-xl bg-gray-900 border border-gray-700 outline-none"
        />

        <button
          onClick={sendMessage}
          className="px-6 bg-cyan-500 rounded-xl hover:bg-cyan-400 transition"
        >
          Send
        </button>

      </div>
    </div>
  );
}