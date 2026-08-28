import { useState } from "react";

export default function OtpPage({
  setPage,
  setQuestion,
  setWebhookLink,
    setUserId,
}) {
  const [otp, setOtp] = useState("");

  const verifyOtp = async () => {
    if (!otp) {
      alert("Enter OTP");
      return;
    }

    try {
      const email = localStorage.getItem("signupEmail");

      const payload = {
        email,
        otp,
      };

      console.log("Object being sent:", payload);
      console.log("JSON being sent:", JSON.stringify(payload));

      const res = await fetch(
        "https://fridayjarvis.app.n8n.cloud/webhook/OTP",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      console.log("OTP Response:", data);

      if (data.success || data.status === "success") {
        alert("OTP Verified Successfully!");
        setUserId(data.data);

  console.log("User ID:", data.data);
        setPage("tutorial");
      } else {
        alert(
          data?.error?.message ||
          data?.message ||
          "Invalid OTP"
        );
      }
    } catch (error) {
      console.error("OTP Verification Error:", error);
      alert("OTP verification failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white gap-4">

      <h1 className="text-3xl font-bold">
        Verify OTP
      </h1>

      <p className="text-gray-400">
        Enter the OTP sent to your email
      </p>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="px-4 py-2 rounded bg-gray-800 border border-gray-600"
      />

      <button
        onClick={verifyOtp}
        className="px-6 py-2 bg-cyan-500 rounded hover:bg-cyan-400"
      >
        Verify OTP
      </button>

    </div>
  );
}