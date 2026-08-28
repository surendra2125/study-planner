import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";

export default function LoginPage({
  setPage,
  setUsernameGlobal,
    setUserId,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [showRecoveryPopup, setShowRecoveryPopup] = useState(false);
const [recoveryToken, setRecoveryToken] = useState("");
const [newPassword, setNewPassword] = useState("");
const handleForgotPassword = async () => {
  if (!email) {
    alert("Please enter your email first");
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
          action: "forgot",
          email,
        }),
      }
    );

    const data = await res.json();

    console.log("Forgot Password Response:", data);

    if (data.status === "success" || data.success === true) {
      alert(data.message || "Recovery email sent");

      // Open popup
      setShowRecoveryPopup(true);
    } else {
      alert(
        data?.error?.message ||
        data?.message ||
        "Failed to send recovery email"
      );
    }
  } catch (error) {
    console.error(error);
    alert("Server error");
  }
};
const handleRecoverySubmit = async () => {
  if (!recoveryToken || !newPassword) {
    alert("Please fill all fields");
    return;
  }

  try {
    const payload = {
      email,
      recoveryToken,
      newPassword,
    };

    console.log("Recovery Payload:", payload);

    const res = await fetch(
      "https://fridayjarvis.app.n8n.cloud/webhook/recovery",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    console.log("Recovery Response:", data);

   if (data.status === "success" || data.success === true) {

  // Store User ID
  setUserId(data.data);

  console.log("User ID:", data.data);

  alert(data.message || "Password reset successful");

  setShowRecoveryPopup(false);
  setRecoveryToken("");
  setNewPassword("");

  // Go to Tutorial
  setPage("tutorial");

} else {
  alert(
    data?.error?.message ||
    data?.message ||
    "Password reset failed"
  );
}
  } catch (error) {
    console.error(error);
    alert("Server error");
  }
};

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
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
            action:"login",
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      console.log("Login Response:", data);

    
     if (data.status === "success" || data.success === true) {

  // Store backend user id
  setUserId(data.data);

  console.log("User ID:", data.data);

  setPage("tutorial");

        alert("Login Successful");}

      else {
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
<p
  onClick={handleForgotPassword}
  className="text-cyan-400 cursor-pointer text-sm hover:underline"
>
  Forgot Password?
</p>
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
  onSuccess={async (credentialResponse) => {
    const token = credentialResponse.credential;

    try {
      const res = await fetch(
        "https://fridayjarvis.app.n8n.cloud/webhook/v1/auth",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "google login",
            credentials: token,
          }),
        }
      );

     const text = await res.text();

console.log("Raw Response:", text);

let data = {};

try {
  data = JSON.parse(text);
} catch (e) {
  console.error("Response is not JSON");
  alert("Backend did not return JSON");
  return;
}

console.log("Login Response:", data);

if (data.status === "success" || data.success === true) {

  setUserId(data.data);

  console.log("User ID:", data.data);

  alert("Login Successful");

  setPage("tutorial");

} else {
  alert(
    data?.error?.message ||
    data?.message ||
    "Invalid credentials"
  );
}
      // Handle response here
    } catch (error) {
      console.error(error);
      alert("Google login failed");
    }
  }}
  onError={() => {
    alert("Google Login Failed");
  }}
/>
      </div>

      {/* Go to Sign Up */}
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

      {/* Recovery Popup */}
      {showRecoveryPopup && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-2xl border border-cyan-500 w-[400px] flex flex-col gap-4">

            <h2 className="text-2xl font-bold text-center">
              Reset Password
            </h2>

            <input
              type="text"
              placeholder="Enter Recovery Token"
              value={recoveryToken}
              onChange={(e) => setRecoveryToken(e.target.value)}
              className="px-4 py-2 rounded bg-gray-800 border border-gray-600"
            />

            <input
              type="password"
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="px-4 py-2 rounded bg-gray-800 border border-gray-600"
            />

            <div className="flex gap-3">
              <button
                onClick={handleRecoverySubmit}
                className="flex-1 bg-cyan-500 text-black py-2 rounded"
              >
                Submit
              </button>

              <button
                onClick={() => setShowRecoveryPopup(false)}
                className="flex-1 bg-red-500 py-2 rounded"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}