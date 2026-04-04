"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateOPD() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [doctor, setDoctor] = useState("");
  const [test, setTest] = useState("");

  const handleSave = async () => {
    try {
      // 1️⃣ Create client
      const clientRes = await fetch("http://145.223.23.176:5000/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: name, // IMPORTANT: backend expects fullName
          age: Number(age),
          gender,
        }),
      });

      const clientData = await clientRes.json();

      if (!clientRes.ok) {
        alert(clientData.error || "Client creation failed");
        return;
      }

      // 2️⃣ Create visit
      const visitRes = await fetch("http://145.223.23.176:5000/api/visits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientId: clientData.id,
          notes: test,
        }),
      });

      const visitData = await visitRes.json();

      if (!visitRes.ok) {
        alert("Visit creation failed");
        return;
      }

      alert("OPD Created ✅");

      // redirect (optional)
      router.push("/clients");

    } catch (err) {
      console.error(err);
      alert("Something went wrong ❌");
    }
  };

  return (
    <div style={drawer}>
      <div style={header}>
        <h3>New OPD Registration</h3>
        <button onClick={() => router.back()} style={closeBtn}>
          ✕
        </button>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Patient Name *</label>
        <input
          placeholder="Patient Name"
          style={input}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
        <div style={{ flex: 1 }}>
          <label>Age</label>
          <input
            type="number"
            placeholder="35"
            style={input}
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <div style={{ flex: 1 }}>
          <label>Gender</label>
          <select
            style={input}
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Doctor / Referral *</label>
        <select
          style={input}
          value={doctor}
          onChange={(e) => setDoctor(e.target.value)}
        >
          <option value="">Select Doctor</option>
          <option>Dr. R. Sharma</option>
          <option>Dr. S. Yadav</option>
        </select>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Profile / Test *</label>
        <select
          style={input}
          value={test}
          onChange={(e) => setTest(e.target.value)}
        >
          <option value="">Select Profile or Test</option>
          <option>LFT — Liver Function Test</option>
          <option>GLU-F — Fasting Blood Sugar</option>
        </select>
      </div>

      <div style={actions}>
        <button onClick={() => router.back()} style={cancelBtn}>
          CANCEL
        </button>

        <button onClick={handleSave} style={saveBtn}>
          SAVE OPD
        </button>
      </div>
    </div>
  );
}

/* ---------- styles ---------- */

const drawer = {
  position: "fixed" as const,
  right: 0,
  top: 0,
  width: 520,
  height: "100vh",
  background: "#fff",
  padding: 24,
  boxShadow: "-4px 0 12px rgba(0,0,0,0.1)",
  zIndex: 50,
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 24,
};

const input = {
  width: "100%",
  padding: 10,
  marginTop: 6,
  borderRadius: 6,
  border: "1px solid #ccc",
};

const actions = {
  display: "flex",
  justifyContent: "flex-end",
  gap: 12,
};

const cancelBtn = {
  border: "1px solid #16a34a",
  background: "#fff",
  color: "#16a34a",
  padding: "8px 14px",
  borderRadius: 6,
  fontWeight: 600,
};

const saveBtn = {
  border: "none",
  background: "#16a34a",
  color: "#fff",
  padding: "8px 16px",
  borderRadius: 6,
  fontWeight: 600,
};

const closeBtn = {
  background: "none",
  border: "none",
  fontSize: 18,
};