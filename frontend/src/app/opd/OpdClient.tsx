"use client";
const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import HeaderBar from "../../components/HeaderBar";

type FollowUpUnit = "DAYS" | "WEEK" | "MONTH" | "YEARS" | "";

export default function OpdClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const clientId = searchParams.get("clientId");
  const clientName = searchParams.get("clientName") || "Select Client";
  const age = searchParams.get("age");
  const gender = searchParams.get("gender");

  const [serviceProvider, setServiceProvider] = useState("");
  const [department, setDepartment] = useState("");
  const [referTo, setReferTo] = useState("");
  const [chiefComplaints, setChiefComplaints] = useState("");
  const [statusText, setStatusText] = useState("");
  const [investigation, setInvestigation] = useState("");
  const [labServices, setLabServices] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [medication, setMedication] = useState("");
  const [followUpValue, setFollowUpValue] = useState(0);
  const [followUpUnit, setFollowUpUnit] =
    useState<FollowUpUnit>("DAYS");
  const [followUpRemarks, setFollowUpRemarks] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (!clientId) {
      setError("Client is required – open from client details.");
      return;
    }

    try {
      setSaving(true);
      setError(null);

      const res = await
      fetch(`${API_BASE}/api/prescriptions`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            clientId: Number(clientId),
            serviceProvider,
            department,
            referTo,
            chiefComplaints,
            statusText,
            investigation,
            labServices,
            diagnosis,
            medication:
              medication +
              (followUpRemarks
                ? `\n\nFollow-up notes: ${followUpRemarks}`
                : ""),
            followUpValue: followUpValue || null,
            followUpUnit: followUpUnit || null,
          }),
        }
      );

      if (!res.ok) throw new Error("HTTP " + res.status);

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Failed to save prescription");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />

      <main style={{ flex: 1, padding: 24, background: "#f5f7fb" }}>
        <HeaderBar pageTitle="OPD - New Prescription" />

        <div style={cardStyle}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 14 }}>Client</div>
            <div style={clientBox}>{clientName}</div>
            {(age || gender) && (
              <div style={{ fontSize: 13, color: "#555" }}>
                {age && `${age} Y`} {gender && ` / ${gender}`}
              </div>
            )}
          </div>

          <Label>Service Provider</Label>
          <input
            style={inputStyle}
            value={serviceProvider}
            onChange={(e) => setServiceProvider(e.target.value)}
          />

          <Label>Department</Label>
          <input
            style={inputStyle}
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />

          <Label>Chief Complaints</Label>
          <textarea
            style={textareaStyle}
            value={chiefComplaints}
            onChange={(e) => setChiefComplaints(e.target.value)}
          />

          <Label>Status</Label>
          <textarea
            style={textareaStyle}
            value={statusText}
            onChange={(e) => setStatusText(e.target.value)}
          />

          <Label>Investigation</Label>
          <textarea
            style={textareaStyle}
            value={investigation}
            onChange={(e) => setInvestigation(e.target.value)}
          />

          <Label>Diagnosis</Label>
          <textarea
            style={textareaStyle}
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
          />

          <Label>Medication</Label>
          <textarea
            style={textareaStyle}
            value={medication}
            onChange={(e) => setMedication(e.target.value)}
          />

          {error && (
            <div style={{ color: "red", marginTop: 10 }}>{error}</div>
          )}

          <div style={{ marginTop: 20, textAlign: "right" }}>
            <button onClick={handleSave} disabled={saving}>
              {saving ? "Saving…" : "SAVE"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ---------- styles ---------- */

function Label({ children }: { children: React.ReactNode }) {
  return <div style={{ marginTop: 12, fontWeight: 600 }}>{children}</div>;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: 8,
  marginTop: 4,
};

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  minHeight: 70,
};

const cardStyle: React.CSSProperties = {
  background: "#fff",
  padding: 20,
  borderRadius: 8,
};

const clientBox: React.CSSProperties = {
  padding: 8,
  border: "1px solid green",
  marginTop: 4,
};
