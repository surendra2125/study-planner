import { useState } from "react";
import JarvisChat from "./JarvisChat";
import { GoogleLogin } from "@react-oauth/google";
console.log("Signup button clicked");
export default function SignUpPage({ setPage, setQuestion, setWebhookLink, setUsernameGlobal }) {
  const [username, setUsername] = useState(""); // 👈 username = Id
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!username || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      console.log("Sending:", {
        fullName: username,
        email,
        password,
      });

      const res = await fetch(
        "https://avvarusurendra.app.n8n.cloud/webhook/student-signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Id: username, // ✅ IMPORTANT (capital I)
            email: email,
            password: password,
          }),
        }
      );
setUsernameGlobal(username);   // 👈 SEND TO APP.jsx
      const data = await res.json();   // 👈 IMPORTANT CHANGE
console.log("Response:", data);
setQuestion(data.question);      // store question
setWebhookLink(data.webhookLink); // store link
setPage("question");
      // optional: check success
     

    } catch (error) {
      console.error("Error:", error);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white gap-4">
      
      <h1 className="text-3xl font-bold">Sign Up</h1>

      {/* Username */}
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="px-4 py-2 rounded bg-gray-800 border border-gray-600"
      />

      {/* Email */}
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="px-4 py-2 rounded bg-gray-800 border border-gray-600"
      />

      {/* Password */}
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="px-4 py-2 rounded bg-gray-800 border border-gray-600"
      />

      {/* Button */}
      <button
  onClick={handleSignup}
  className="px-6 py-2 bg-cyan-500 rounded hover:bg-cyan-400"
>
  Sign Up
</button>

<div className="mt-4">
<GoogleLogin
  onSuccess={(credentialResponse) => {
    console.log("Google Login Success:", credentialResponse);

    // Temporary test
    alert("Google Login Successful!");

    // Move user to next page
    setPage("question");
  }}
  onError={() => {
    console.log("Google Login Failed");
    alert("Google Login Failed");
  }}
/>
</div>

    </div>
  );
}