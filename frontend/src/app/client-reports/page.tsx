"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ClientReportLogin() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  function submit() {
    if (!code || !password) return;
    router.push(`/client-reports/${code}?p=${password}`);
  }

  return (
    <div style={container}>
      <h2>View Lab Report</h2>

      <input
        placeholder="Report Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={input}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={input}
      />

      <button onClick={submit} style={btn}>
        VIEW REPORT
      </button>
    </div>
  );
}

/* ---------- styles ---------- */

const container = {
  maxWidth: 360,
  margin: "100px auto",
  background: "#fff",
  padding: 24,
  borderRadius: 8,
  textAlign: "center" as const,
};

const input = {
  width: "100%",
  padding: 10,
  marginBottom: 12,
  borderRadius: 6,
  border: "1px solid #ccc",
};

const btn = {
  width: "100%",
  background: "#16a34a",
  color: "#fff",
  border: "none",
  padding: 10,
  borderRadius: 6,
  fontWeight: 600,
};
