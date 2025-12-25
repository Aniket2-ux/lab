"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;



type Props = {
  onClose: () => void;
};

export default function CreateClientDrawer({ onClose }: Props) {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [internalNotes, setInternalNotes] = useState("");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* ================================
     SAVE CLIENT → OPEN NEW BILL
  ================================ */
  const handleSave = async () => {
    if (!fullName.trim()) {
      setError("Full name is required");
      return;
    }

    try {
      setSaving(true);
      setError(null);

      const res = await fetch(`${API_BASE}/api/clients`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone: phone.trim() || null,
          email: email.trim() || null,
          age: age === "" ? null : Number(age),
          gender: gender || null,
          address: address.trim() || null,
          internalNotes: internalNotes.trim() || null,
        }),
      });

      const client = await res.json();

      if (!res.ok) {
        throw new Error(client?.error || "Failed to create client");
      }

      // ✅ CLOSE DRAWER
      onClose();

      // ✅ AUTO OPEN NEW BILL PAGE
      router.push(`/billing/new?clientId=${client.id}`);
    } catch (err: any) {
      setError(err.message || "Failed to save client");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="drawer-overlay">
      <div className="drawer">
        <h3>Create Client</h3>

        <input placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} />
        <input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />

        <div className="row">
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={e => setAge(e.target.value === "" ? "" : Number(e.target.value))}
          />
          <select value={gender} onChange={e => setGender(e.target.value)}>
            <option value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <input placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} />
        <textarea placeholder="Internal Notes" value={internalNotes} onChange={e => setInternalNotes(e.target.value)} />

        {error && <p className="error">{error}</p>}

        <div className="actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save & Create Bill"}
          </button>
        </div>
      </div>
    </div>
  );
}
