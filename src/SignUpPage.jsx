import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";

export default function SignUpPage({
  setPage,
  setQuestion,
  setWebhookLink,
  setUsernameGlobal,
  setUserId,
}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!username || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      console.log("Sending:", {
        action: "signup",
        fullName: username,
        email,
        password,
      });

      const res = await fetch(
        "https://fridayjarvis.app.n8n.cloud/webhook/v1/auth",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "signup",
            fullName: username,
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      console.log("Response:", data);

      if (data.status === "success" || data.success === true) {
        localStorage.setItem("signupEmail", email);

        localStorage.setItem(
          "otpMessage",
          data.message || "OTP sent successfully"
        );

        setUsernameGlobal(username);

        setPage("otp");
      } else {
        alert(
          data?.error?.message ||
            data?.message ||
            "Signup failed"
        );
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white gap-4">
      <h1 className="text-3xl font-bold">Sign Up</h1>

      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="px-4 py-2 rounded bg-gray-800 border border-gray-600"
      />

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="px-4 py-2 rounded bg-gray-800 border border-gray-600"
      />

      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="px-4 py-2 rounded bg-gray-800 border border-gray-600"
      />

      <button
        onClick={handleSignup}
        className="px-6 py-2 bg-cyan-500 rounded hover:bg-cyan-400"
      >
        Sign Up
      </button>

      <div className="mt-4">
       <GoogleLogin
  onSuccess={async (credentialResponse) => {
    const token = credentialResponse?.credential;

    if (!token) {
      alert("Google did not return a credential");
      return;
    }

    try {
      const res = await fetch(
        "https://fridayjarvis.app.n8n.cloud/webhook/v1/auth",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "google signup",
            credentials: token,
          }),
        }
      );

      const data = await res.json();

      console.log("Google Response:", data);

      if (data.status === "success" || data.success === true) {
        setUserId(data.data);

        if (data.fullName) {
          setUsernameGlobal(data.fullName);
        }

        setPage("tutorial");
      } else {
        alert(
          data?.error?.message ||
          data?.message ||
          "Google signup failed"
        );
      }
    } catch (error) {
      console.error(error);
      alert("Google signup failed");
    }
  }}
  onError={() => {
    alert("Google Login Failed");
  }}
/>
      </div>
    </div>
  );
}