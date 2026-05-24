import { useState } from "react";

export default function SignUpPage({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email && password) {
      setPage("tutorial"); // go to tutorial after signup
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">

      {/* Card */}
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-cyan-500/20 shadow-[0_0_40px_rgba(34,211,238,0.2)]">

        <h2 className="text-2xl font-semibold text-center mb-6">
          Sign in to continue
        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 rounded-xl bg-gray-900 border border-gray-700 focus:outline-none focus:border-cyan-400"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-3 rounded-xl bg-gray-900 border border-gray-700 focus:outline-none focus:border-cyan-400"
        />

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-105 transition transform shadow-lg shadow-cyan-500/30"
        >
          Sign In
        </button>

        {/* Back button */}
        <button
          onClick={() => setPage("landing")}
          className="w-full mt-4 text-sm text-gray-400 hover:text-white transition"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}