"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/* ✅ USE ENV VARIABLE */
const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    setMessage("Logging in...");

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Login failed");
        return;
      }

      // ✅ SAVE TOKEN
      localStorage.setItem("token", data.token);

      setMessage("Login successful");

      // ✅ REDIRECT AFTER LOGIN
      router.push("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setMessage("Login error");
    }
  };

  return (
    <div style={{ maxWidth: 350, margin: "80px auto", textAlign: "center" }}>
      <h2>GM Diagnostic Lab Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      />

      <button
        onClick={handleLogin}
        style={{
          width: "100%",
          padding: 10,
          background: "#009150",
          border: "none",
          color: "#fff",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        Login
      </button>

      <p style={{ marginTop: 10, fontSize: 13 }}>{message}</p>
    </div>
  );
}
