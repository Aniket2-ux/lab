"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";

type Props = {
  onClose: () => void;
  onCreated?: (client: any) => void;
};

export default function CreateClientDrawer({ onClose, onCreated }: Props) {
  const router = useRouter();

  /* ---------- BASIC ---------- */
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");

  /* ---------- EXTRA ---------- */
  const [address, setAddress] = useState("");
  const [panVatNumber, setPanVatNumber] = useState("");
  const [insuranceNumber, setInsuranceNumber] = useState("");
  const [nationalIdNumber, setNationalIdNumber] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [internalNotes, setInternalNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    setError(null);

    if (!fullName.trim()) {
      setError("Client name is required");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/clients`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          age: age === "" ? null : age,
          gender: gender || null,
          phone: phone || null,
          address: address || null,
          panVatNumber: panVatNumber || null,
          insuranceNumber: insuranceNumber || null,
          nationalIdNumber: nationalIdNumber || null,
          registrationNumber: registrationNumber || null,
          internalNotes: internalNotes || null,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      onCreated?.(data);
      onClose();
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to save client");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="drawer-overlay">
      <div className="drawer">
        <h3>Create Client</h3>

        <input placeholder="Full Name" value={fullName}
          onChange={(e) => setFullName(e.target.value)} />

        <div className="row">
          <input type="number" placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value === "" ? "" : Number(e.target.value))} />

          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <input placeholder="Phone" value={phone}
          onChange={(e) => setPhone(e.target.value)} />

        <input placeholder="Address" value={address}
          onChange={(e) => setAddress(e.target.value)} />

        <input placeholder="PAN / VAT Number" value={panVatNumber}
          onChange={(e) => setPanVatNumber(e.target.value)} />

        <input placeholder="Insurance Number" value={insuranceNumber}
          onChange={(e) => setInsuranceNumber(e.target.value)} />

        <input placeholder="National Identity Number" value={nationalIdNumber}
          onChange={(e) => setNationalIdNumber(e.target.value)} />

        <input placeholder="Registration Number" value={registrationNumber}
          onChange={(e) => setRegistrationNumber(e.target.value)} />

        <textarea placeholder="Internal Notes"
          value={internalNotes}
          onChange={(e) => setInternalNotes(e.target.value)} />

        {error && <p className="error">{error}</p>}

        <div className="actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
