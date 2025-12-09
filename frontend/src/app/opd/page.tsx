"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import HeaderBar from "../../components/HeaderBar";

type FollowUpUnit = "DAYS" | "WEEK" | "MONTH" | "YEARS" | "";

export default function OpdPage() {
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
  const [followUpUnit, setFollowUpUnit] = useState<FollowUpUnit>("DAYS");
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

      const res = await fetch("http://localhost:5000/api/prescriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId: Number(clientId),
          serviceProvider,
          department,
          chiefComplaints,
          statusText,
          investigation,
          labServices,
          diagnosis,
          medication:
            medication +
            (followUpRemarks ? `\n\nFollow-up notes: ${followUpRemarks}` : ""),
          followUpValue: followUpValue || null,
          followUpUnit: followUpUnit || null,
        }),
      });

      if (!res.ok) throw new Error("HTTP " + res.status);

      // after save go back to dashboard (or clients)
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Failed to save prescription");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar />
      <main
        style={{
          flex: 1,
          padding: 24,
          background: "#f5f7fb",
          overflowY: "auto",
        }}
      >
        <HeaderBar pageTitle="OPD - New Prescription" />

        <div
          style={{
            background: "#fff",
            borderRadius: 10,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            padding: 20,
            marginBottom: 16,
          }}
        >
          {/* TOP BAR WITH CLIENT INFO */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 14, marginBottom: 4 }}>Client</div>
            <div
              style={{
                border: "1px solid #16a34a",
                borderRadius: 4,
                padding: "8px 10px",
                fontWeight: 600,
              }}
            >
              {clientName}
            </div>
            {(age || gender) && (
              <div style={{ marginTop: 4, fontSize: 13, color: "#4b5563" }}>
                {age ? `${age} Y` : ""} {gender ? ` / ${gender}` : ""}
              </div>
            )}
          </div>

          {/* BASIC FIELDS – service provider, department, etc */}
          <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
            <div style={{ flex: 1 }}>
              <Label>Service provider</Label>
              <input
                style={inputStyle}
                value={serviceProvider}
                onChange={(e) => setServiceProvider(e.target.value)}
                placeholder="Service provider"
              />
            </div>
            <div style={{ flex: 1 }}>
              <Label>Departments</Label>
              <input
                style={inputStyle}
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="Departments"
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
            <div style={{ flex: 1 }}>
              <Label>Refer To</Label>
              <input
                style={inputStyle}
                value={referTo}
                onChange={(e) => setReferTo(e.target.value)}
                placeholder="Service provider"
              />
            </div>
            <div style={{ flex: 1 }}>
              <Label>Created Date</Label>
              <input
                style={inputStyle}
                value={new Date().toLocaleDateString("en-GB")}
                readOnly
              />
            </div>
          </div>

          <h3 style={{ marginTop: 16, marginBottom: 8, fontSize: 14 }}>
            Vitals
          </h3>
          {/* just a placeholder */}
          <button
            type="button"
            style={{
              padding: "6px 12px",
              borderRadius: 4,
              border: "1px dashed #94a3b8",
              background: "#f9fafb",
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            ADD NEW
          </button>

          <h3 style={{ marginTop: 20, marginBottom: 8, fontSize: 14 }}>
            Chief Complaints
          </h3>
          <textarea
            style={{ ...inputStyle, minHeight: 60 }}
            value={chiefComplaints}
            onChange={(e) => setChiefComplaints(e.target.value)}
            placeholder="Search or type symptoms"
          />

          <h3 style={{ marginTop: 20, marginBottom: 8, fontSize: 14 }}>
            Status
          </h3>
          <textarea
            style={{ ...inputStyle, minHeight: 80 }}
            value={statusText}
            onChange={(e) => setStatusText(e.target.value)}
            placeholder="Type status here"
          />

          <h3 style={{ marginTop: 20, marginBottom: 8, fontSize: 14 }}>
            Investigation
          </h3>
          <textarea
            style={{ ...inputStyle, minHeight: 80 }}
            value={investigation}
            onChange={(e) => setInvestigation(e.target.value)}
            placeholder="Type investigation here"
          />

          <h3 style={{ marginTop: 20, marginBottom: 8, fontSize: 14 }}>
            Lab Services
          </h3>
          <textarea
            style={{ ...inputStyle, minHeight: 60 }}
            value={labServices}
            onChange={(e) => setLabServices(e.target.value)}
            placeholder="Search and select tests / test groups"
          />

          <h3 style={{ marginTop: 20, marginBottom: 8, fontSize: 14 }}>
            Diagnosis
          </h3>
          <textarea
            style={{ ...inputStyle, minHeight: 80 }}
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            placeholder="Write / search diagnosis"
          />

          <h3 style={{ marginTop: 20, marginBottom: 8, fontSize: 14 }}>
            Medication
          </h3>
          <textarea
            style={{ ...inputStyle, minHeight: 80 }}
            value={medication}
            onChange={(e) => setMedication(e.target.value)}
            placeholder="Type medication here"
          />

          {/* FOLLOW UP SECTION */}
          <h3 style={{ marginTop: 20, marginBottom: 8, fontSize: 14 }}>
            Follow up
          </h3>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              type="button"
              style={circleBtn}
              onClick={() =>
                setFollowUpValue((v) => (v > 0 ? v - 1 : 0))
              }
            >
              –
            </button>
            <input
              type="number"
              min={0}
              value={followUpValue}
              onChange={(e) =>
                setFollowUpValue(Math.max(Number(e.target.value) || 0, 0))
              }
              style={{
                ...inputStyle,
                width: 60,
                textAlign: "center",
              }}
            />
            <button
              type="button"
              style={circleBtn}
              onClick={() => setFollowUpValue((v) => v + 1)}
            >
              +
            </button>

            {(["DAYS", "WEEK", "MONTH", "YEARS"] as FollowUpUnit[]).map(
              (u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => setFollowUpUnit(u)}
                  style={{
                    padding: "6px 10px",
                    borderRadius: 4,
                    border:
                      followUpUnit === u
                        ? "1px solid #16a34a"
                        : "1px solid #e5e7eb",
                    background:
                      followUpUnit === u ? "#dcfce7" : "#ffffff",
                    fontSize: 12,
                    cursor: "pointer",
                  }}
                >
                  {u}
                </button>
              )
            )}
          </div>

          <textarea
            style={{ ...inputStyle, minHeight: 60, marginTop: 8 }}
            value={followUpRemarks}
            onChange={(e) => setFollowUpRemarks(e.target.value)}
            placeholder="Type follow up remarks"
          />

          {error && (
            <div
              style={{
                marginTop: 10,
                fontSize: 12,
                color: "#b91c1c",
              }}
            >
              {error}
            </div>
          )}

          {/* bottom actions */}
          <div
            style={{
              marginTop: 20,
              display: "flex",
              justifyContent: "flex-end",
              gap: 8,
            }}
          >
            <button
              type="button"
              onClick={() => router.back()}
              style={{
                padding: "8px 16px",
                borderRadius: 4,
                border: "1px solid #e5e7eb",
                background: "#ffffff",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              CANCEL
            </button>
            <button
              type="button"
              disabled={saving}
              onClick={handleSave}
              style={{
                padding: "8px 18px",
                borderRadius: 4,
                border: "none",
                background: "#0b7a53",
                color: "#ffffff",
                fontSize: 13,
                fontWeight: 600,
                cursor: saving ? "default" : "pointer",
                opacity: saving ? 0.8 : 1,
              }}
            >
              {saving ? "Saving…" : "SAVE"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 12,
        fontWeight: 600,
        marginBottom: 4,
      }}
    >
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "7px 9px",
  borderRadius: 4,
  border: "1px solid #d1d5db",
  fontSize: 13,
  boxSizing: "border-box",
};

const circleBtn: React.CSSProperties = {
  width: 28,
  height: 28,
  borderRadius: "50%",
  border: "1px solid #d1d5db",
  background: "#ffffff",
  cursor: "pointer",
  fontSize: 16,
  lineHeight: "24px",
};
