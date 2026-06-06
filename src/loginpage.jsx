import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";

export default function LoginPage({
  setPage,
  setUsernameGlobal,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(
        "https://avvarusurendra.app.n8n.cloud/webhook/student-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      console.log("Login Response:", data);

      if (data.success || res.ok) {
        if (data.Id) {
          setUsernameGlobal(data.Id);
        }

        alert("Login Successful");

        // ✅ Skip Question Page
        setPage("tutorial");
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white gap-4">

      <h1 className="text-3xl font-bold">Login</h1>

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

      {/* Login Button */}
      <button
        onClick={handleLogin}
        className="px-6 py-2 bg-cyan-500 rounded hover:bg-cyan-400"
      >
        Login
      </button>

      {/* Google Login */}
      <div className="mt-4">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log("Google Login Success:", credentialResponse);

            alert("Google Login Successful");

            // ✅ Directly go to tutorial
            setPage("tutorial");
          }}
          onError={() => {
            alert("Google Login Failed");
          }}
        />
      </div>

      {/* Go to Sign Up */}
      <p className="text-gray-400">
        Don't have an account?{" "}
        <span
          onClick={() => setPage("signup")}
          className="text-cyan-400 cursor-pointer"
        >
          Sign Up
        </span>
      </p>
    </div>
  );
}