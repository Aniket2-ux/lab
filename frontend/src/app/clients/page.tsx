"use client";

import { useEffect, useState } from "react";
import type React from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import HeaderBar from "../../components/HeaderBar";

import { API_BASE } from "@/lib/apiBase";




type Client = {
  id: number;
  fullName: string;
  age: number | null;
  gender: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  knownFrom?: string | null;
  internalNotes?: string | null;
  lastVisitedAt?: string | null;
  createdAt: string;
};

type NewClient = {
  // basic
  fullName: string;
  phone: string;
  email: string;
  age: string;
  monthAge: string;
  gender: string;
  dobBs: string;
  address: string;
  palikaDistrictProvince: string;
  knownFrom: string;
  panVatNumber: string;
  internalNotes: string;
  insuranceNumber: string;
  nationalIdentityNumber: string;
  registrationNumber: string;

  // More
  additionalPhone: string;
  associateCompany: string;
  occupation: string;
  maritalStatus: string;
  bloodGroup: string;
  ethnicity: string;
  nationality: string;
  appliedCountry: string;

  // Passport
  passportNumber: string;
  passportIssuePlace: string;
  passportIssueDateBs: string;
  passportExpiryDateBs: string;
};

const KNOWN_FROM_OPTIONS = [
  "Facebook",
  "Instagram",
  "Website",
  "Google Business",
  "Doctor Referral",
  "Friend / Family",
  "Other",
];

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const MARITAL_STATUSES = ["Single", "Married", "Divorced", "Widowed"];

export default function ClientsPage() {
  const router = useRouter();

  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);

  const [createOpen, setCreateOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const [createPrefillName, setCreatePrefillName] = useState("");

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  // ---- fetch all clients ----
  useEffect(() => {
    const load = async () => {
    try {
  setLoading(true);

  const res = await fetch(`${API_BASE}/api/clients`);

  if (!res.ok) throw new Error("HTTP " + res.status);

  const data: Client[] = await res.json();
  setClients(data);
} catch (err){
      
        console.error("Failed to load clients", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = clients.filter((c) => {
    if (!search.trim()) return true;
    const term = search.toLowerCase();
    return (
      c.fullName.toLowerCase().includes(term) ||
      (c.phone || "").toLowerCase().includes(term)
    );
  });

  const handleCreated = (client: Client) => {
    setClients((prev) => [client, ...prev]);
    setCreateOpen(false);
    setSearch("");
    setSearchDropdownOpen(false);
  };

  const openDetails = (client: Client) => {
    setSelectedClient(client);
    setDetailsOpen(true);
    setSearchDropdownOpen(false);
  };

  const handleCreatePrescriptionFromDetails = () => {
    if (!selectedClient) return;
    const c = selectedClient;
    router.push(
      `/opd?clientId=${c.id}&clientName=${encodeURIComponent(
        c.fullName
      )}&age=${c.age ?? ""}&gender=${c.gender ?? ""}`
    );
  };

  const openCreateClient = (prefill?: string) => {
    setCreatePrefillName(prefill || "");
    setCreateOpen(true);
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Sidebar />

      <main
        style={{
          flex: 1,
          padding: 24,
          background: "#f5f7fb",
          overflowY: "auto",
        }}
      >
        <HeaderBar pageTitle="Clients" />

        {/* Top toolbar: tabs + search + buttons */}
        <div
          style={{
            background: "#fff",
            borderRadius: 10,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            padding: 16,
            marginBottom: 16,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {/* Tabs row */}
          <div style={{ display: "flex", gap: 18, fontSize: 13 }}>
            <strong>All</strong>
            <span style={{ color: "#6b7280" }}>Checked In Clients</span>
            <span style={{ color: "#6b7280" }}>Visited Today</span>
            <span style={{ color: "#6b7280" }}>Visited Last Seven Days</span>
            <span style={{ color: "#6b7280" }}>Visited Last Six Months</span>
          </div>

          {/* Right controls */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            {/* Search + dropdown */}
            <div style={{ flex: 1, position: "relative" }}>
              <input
                placeholder="Type client name..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSearchDropdownOpen(true);
                }}
                onFocus={() => {
                  if (search.trim()) setSearchDropdownOpen(true);
                }}
                style={{
                  width: "100%",
                  padding: "8px 10px",
                  borderRadius: 4,
                  border: "1px solid #d1d5db",
                  fontSize: 13,
                }}
              />

              {searchDropdownOpen && search.trim() && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    marginTop: 4,
                    background: "#ffffff",
                    borderRadius: 4,
                    boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
                    maxHeight: 260,
                    overflowY: "auto",
                    zIndex: 50,
                    border: "1px solid #e5e7eb",
                  }}
                >
                  {filtered.length === 0 && (
                    <div
                      style={{
                        padding: "8px 10px",
                        fontSize: 13,
                        color: "#6b7280",
                      }}
                    >
                      No matching clients
                    </div>
                  )}

                  {filtered.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => {
                        openDetails(c);
                        setSearch("");
                      }}
                      style={{
                        padding: "8px 10px",
                        borderBottom: "1px solid #f3f4f6",
                        fontSize: 13,
                        cursor: "pointer",
                      }}
                    >
                      <div style={{ fontWeight: 600 }}>{c.fullName}</div>
                      <div style={{ color: "#6b7280", fontSize: 11 }}>
                        {(c.age ? `${c.age} Y` : "")}
                        {c.gender ? ` / ${c.gender}` : ""}
                        {c.phone ? ` · ${c.phone}` : ""}
                      </div>
                    </div>
                  ))}

                  <div
                    onClick={() => {
                      openCreateClient(search);
                      setSearchDropdownOpen(false);
                    }}
                    style={{
                      padding: "8px 10px",
                      background: "#0b7a53",
                      color: "#ffffff",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                      borderBottomLeftRadius: 4,
                      borderBottomRightRadius: 4,
                    }}
                  >
                    ➕ Add "{search}"
                  </div>
                </div>
              )}
            </div>

            {/* Settings button */}
            <button
              type="button"
              title="Settings"
              onClick={() => setSettingsOpen(true)}
              style={{
                width: 36,
                height: 36,
                borderRadius: 6,
                border: "1px solid #e5e7eb",
                background: "#ffffff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
              }}
            >
              ⚙
            </button>

            {/* Reports button */}
            <button
              type="button"
              title="Reports"
              onClick={() => router.push("/reports")}
              style={{
                width: 36,
                height: 36,
                borderRadius: 6,
                border: "1px solid #e5e7eb",
                background: "#ffffff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
              }}
            >
              ☰
            </button>

            {/* Create client button */}
            <button
              type="button"
              onClick={() => openCreateClient()}
              style={{
                padding: "9px 18px",
                borderRadius: 6,
                border: "none",
                background: "#0b7a53",
                color: "#ffffff",
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              CREATE CLIENT ▾
            </button>
          </div>
        </div>

        {/* Table of clients */}
        <div
          style={{
            background: "#fff",
            borderRadius: 10,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            padding: 0,
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              padding: "10px 12px",
              background: "#f9fafb",
              display: "grid",
              gridTemplateColumns:
                "2.4fr 0.9fr 1fr 1.4fr 1.6fr 1.4fr 1.2fr 1.4fr",
            }}
          >
            <span>NAME</span>
            <span>AGE</span>
            <span>GENDER</span>
            <span>EMAIL</span>
            <span>INTERNAL NOTES</span>
            <span>MOBILE PHONE</span>
            <span>CREATED AT</span>
            <span>LAST VISITED AT</span>
          </div>

          {loading ? (
            <p style={{ padding: 12, fontSize: 13 }}>Loading…</p>
          ) : filtered.length === 0 ? (
            <p style={{ padding: 12, fontSize: 13 }}>No clients found.</p>
          ) : (
            filtered.map((c, idx) => (
              <div
                key={c.id}
                onClick={() => openDetails(c)}
                style={{
                  padding: "10px 12px",
                  display: "grid",
                  gridTemplateColumns:
                    "2.4fr 0.9fr 1fr 1.4fr 1.6fr 1.4fr 1.2fr 1.4fr",
                  fontSize: 13,
                  background: idx % 2 === 0 ? "#ffffff" : "#f9fafb",
                  borderBottom: "1px solid #f1f5f9",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <span>{c.fullName}</span>
                <span>{c.age ? `${c.age} yrs` : "-"}</span>
                <span>{c.gender || "-"}</span>
                <span>{c.email || "-"}</span>
                <span style={{ color: "#6b7280" }}>
                  {c.internalNotes ? c.internalNotes.slice(0, 25) + "…" : "-"}
                </span>
                <span>{c.phone || "-"}</span>
                <span>
                  {new Date(c.createdAt).toLocaleDateString("en-GB")}
                </span>
                <span>
                  {c.lastVisitedAt
                    ? new Date(c.lastVisitedAt).toLocaleDateString("en-GB")
                    : "-"}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Create client drawer */}
        {createOpen && (
          <CreateClientDrawer
            onClose={() => setCreateOpen(false)}
            onCreated={handleCreated}
            initialName={createPrefillName}
          />
        )}

        {/* Settings dialog */}
        {settingsOpen && (
          <ClientSettingsDrawer onClose={() => setSettingsOpen(false)} />
        )}

        {/* Client details drawer */}
        {detailsOpen && selectedClient && (
          <ClientDetailsDrawer
            client={selectedClient}
            onClose={() => setDetailsOpen(false)}
            onCreatePrescription={handleCreatePrescriptionFromDetails}
          />
        )}
      </main>
    </div>
  );
}

/* ---------------- Client Details drawer ---------------- */

function ClientDetailsDrawer({
  client,
  onClose,
  onCreatePrescription,
}: {
  client: Client;
  onClose: () => void;
  onCreatePrescription: () => void;
}) {
  const ageText = client.age ? `${client.age} Years` : "";
  const genderText = client.gender || "";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,23,42,0.35)",
        display: "flex",
        justifyContent: "flex-end",
        zIndex: 40,
      }}
    >
      <div
        style={{
          width: 520,
          maxWidth: "100%",
          height: "100%",
          background: "#ffffff",
          boxShadow: "-4px 0 12px rgba(0,0,0,0.1)",
          padding: 20,
          overflowY: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <h2 style={{ margin: 0, fontSize: 18 }}>Client Details</h2>
          <button
            type="button"
            onClick={onClose}
            style={{
              border: "none",
              background: "transparent",
              fontSize: 20,
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: 600, fontSize: 16 }}>
            {client.fullName}
          </div>
          <div style={{ fontSize: 13, color: "#4b5563" }}>
            {ageText} {ageText && genderText ? " " : ""}
            {genderText}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1.2fr",
            rowGap: 4,
            columnGap: 20,
            fontSize: 13,
            marginBottom: 16,
          }}
        >
          <span style={{ color: "#6b7280" }}>Created At</span>
          <span>
            {new Date(client.createdAt).toLocaleString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>

          <span style={{ color: "#6b7280" }}>Customer Number</span>
          <span>{client.id}</span>

          <span style={{ color: "#6b7280" }}>App link sent status</span>
          <span>Not sent yet</span>
        </div>

        <div style={{ marginBottom: 24 }}>
          <button
            type="button"
            onClick={onCreatePrescription}
            style={{
              padding: "8px 14px",
              borderRadius: 4,
              border: "1px solid #0b7a53",
              background: "#e6f4ef",
              color: "#0b7a53",
              fontSize: 13,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            CREATE PRESCRIPTION ▾
          </button>
        </div>

        <div
          style={{
            display: "flex",
            gap: 24,
            fontSize: 13,
            borderBottom: "1px solid #e5e7eb",
            paddingBottom: 6,
            marginBottom: 10,
          }}
        >
          <span style={{ fontWeight: 600, borderBottom: "2px solid #0b7a53" }}>
            Visits
          </span>
          <span style={{ color: "#6b7280" }}>Bills</span>
          <span style={{ color: "#6b7280" }}>Prescriptions</span>
          <span style={{ color: "#6b7280" }}>Vitals</span>
          <span style={{ color: "#6b7280" }}>Labs</span>
          <span style={{ color: "#6b7280" }}>Reports</span>
        </div>

        <div style={{ fontSize: 13, color: "#6b7280" }}>No visits yet…</div>
      </div>
    </div>
  );
}

/* ---------------- Create client drawer (big form) ---------------- */

function CreateClientDrawer({
  onClose,
  onCreated,
  initialName = "",
}: {
  onClose: () => void;
  onCreated: (c: Client) => void;
  initialName?: string;
}) {
  const [form, setForm] = useState<NewClient>({
    fullName: "",
    phone: "",
    email: "",
    age: "",
    monthAge: "",
    gender: "",
    dobBs: "",
    address: "",
    palikaDistrictProvince: "",
    knownFrom: "",
    panVatNumber: "",
    internalNotes: "",
    insuranceNumber: "",
    nationalIdentityNumber: "",
    registrationNumber: "",
    additionalPhone: "",
    associateCompany: "",
    occupation: "",
    maritalStatus: "",
    bloodGroup: "",
    ethnicity: "",
    nationality: "",
    appliedCountry: "",
    passportNumber: "",
    passportIssuePlace: "",
    passportIssueDateBs: "",
    passportExpiryDateBs: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showMore, setShowMore] = useState(false);
  const [showPassport, setShowPassport] = useState(false);

  const [dobMode, setDobMode] = useState<"BS" | "AD">("BS");
  const [passportIssueMode, setPassportIssueMode] = useState<"BS" | "AD">("BS");
  const [passportExpiryMode, setPassportExpiryMode] = useState<"BS" | "AD">(
    "BS"
  );

  useEffect(() => {
    if (initialName) {
      setForm((f) => ({ ...f, fullName: initialName }));
    }
  }, [initialName]);

  const update = (field: keyof NewClient, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleSave = async () => {
    if (!form.fullName.trim()) {
      setError("Full name is required");
      return;
    }
    try {
      setSaving(true);
      setError(null);

      // Only send fields that backend knows about
     const res = await fetch(`${API_BASE}/api/clients`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    fullName: form.fullName,
    phone: form.phone || form.additionalPhone || null,
    email: form.email || null,
    age: form.age ? Number(form.age) : null,
    gender: form.gender || null,
    address: form.address || null,
    knownFrom: form.knownFrom || null,
    internalNotes: form.internalNotes || null,
  }),
});


      if (!res.ok) throw new Error("HTTP " + res.status);
      const created: Client = await res.json();
      onCreated(created);
    } catch (err) {
      console.error("Failed to save client", err);
      setError("Failed to save client");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,23,42,0.35)",
        display: "flex",
        justifyContent: "flex-end",
        zIndex: 40,
      }}
    >
      <div
        style={{
          width: 640,
          maxWidth: "100%",
          height: "100%",
          background: "#ffffff",
          boxShadow: "-4px 0 16px rgba(0,0,0,0.18)",
          padding: 20,
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <h2 style={{ margin: 0, fontSize: 18 }}>Create new client</h2>
          <button
            type="button"
            onClick={onClose}
            style={{
              border: "none",
              background: "transparent",
              fontSize: 20,
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>

        {/* Main form - similar layout to your screenshot */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Row 1 */}
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ flex: 1 }}>
              <LabeledInput
                label="Full Name*"
                placeholder="Eg. Ram Mahato"
                value={form.fullName}
                onChange={(v) => update("fullName", v)}
              />
            </div>
            <div style={{ flex: 1 }}>
              <LabeledInput
                label="Phone Number"
                placeholder="+977"
                value={form.phone}
                onChange={(v) => update("phone", v)}
              />
            </div>
          </div>

          {/* Row 2 */}
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ flex: 1 }}>
              <LabeledInput
                label="Email"
                placeholder="Eg. Email"
                value={form.email}
                onChange={(v) => update("email", v)}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={fieldLabel}>Known Us From</label>
              <select
                value={form.knownFrom}
                onChange={(e) => update("knownFrom", e.target.value)}
                style={fieldInput}
              >
                <option value="">Where did you hear about us</option>
                {KNOWN_FROM_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 3: Age / Month / DOB / Gender */}
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ flex: 0.6 }}>
              <LabeledInput
                label="Year"
                placeholder="Age in Yr"
                value={form.age}
                onChange={(v) => update("age", v)}
              />
            </div>
            <div style={{ flex: 0.6 }}>
              <LabeledInput
                label="Month"
                placeholder="Age in M"
                value={form.monthAge}
                onChange={(v) => update("monthAge", v)}
              />
            </div>
            <div style={{ flex: 1.2 }}>
              <label style={fieldLabel}>
                Date of Birth (BS YYYY-MM-DD format)
              </label>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  value={form.dobBs}
                  onChange={(e) => update("dobBs", e.target.value)}
                  placeholder="YYYY-MM-DD"
                  style={fieldInput}
                />
                <div
                  style={{
                    display: "flex",
                    borderRadius: 999,
                    border: "1px solid #d1d5db",
                    overflow: "hidden",
                    fontSize: 11,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setDobMode("AD")}
                    style={{
                      padding: "4px 8px",
                      border: "none",
                      background: dobMode === "AD" ? "#0b7a53" : "transparent",
                      color: dobMode === "AD" ? "#fff" : "#4b5563",
                      cursor: "pointer",
                    }}
                  >
                    AD
                  </button>
                  <button
                    type="button"
                    onClick={() => setDobMode("BS")}
                    style={{
                      padding: "4px 8px",
                      border: "none",
                      background: dobMode === "BS" ? "#0b7a53" : "transparent",
                      color: dobMode === "BS" ? "#fff" : "#4b5563",
                      cursor: "pointer",
                    }}
                  >
                    BS
                  </button>
                </div>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <label style={fieldLabel}>Gender</label>
              <select
                value={form.gender}
                onChange={(e) => update("gender", e.target.value)}
                style={fieldInput}
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          {/* Row 4: Address / Palika */}
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ flex: 1 }}>
              <LabeledInput
                label="Address"
                placeholder="Tole/Village/City-Ward no"
                value={form.address}
                onChange={(v) => update("address", v)}
              />
            </div>
            <div style={{ flex: 1 }}>
              <LabeledInput
                label="Palika, District, Province"
                placeholder="Palika, District, Province"
                value={form.palikaDistrictProvince}
                onChange={(v) => update("palikaDistrictProvince", v)}
              />
            </div>
          </div>

          {/* Row 5: PAN / Internal notes */}
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ flex: 1 }}>
              <LabeledInput
                label="PAN/VAT Number"
                placeholder="Enter pan/vat number"
                value={form.panVatNumber}
                onChange={(v) => update("panVatNumber", v)}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={fieldLabel}>Internal Notes</label>
              <textarea
                value={form.internalNotes}
                onChange={(e) => update("internalNotes", e.target.value)}
                style={{ ...fieldInput, minHeight: 36, resize: "vertical" }}
                placeholder="Internal Notes"
              />
            </div>
          </div>

          {/* Row 6: Insurance / National ID */}
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ flex: 1 }}>
              <LabeledInput
                label="Insurance Number"
                placeholder="Insurance Number"
                value={form.insuranceNumber}
                onChange={(v) => update("insuranceNumber", v)}
              />
            </div>
            <div style={{ flex: 1 }}>
              <LabeledInput
                label="National Identity Number"
                placeholder="National Identity Number"
                value={form.nationalIdentityNumber}
                onChange={(v) => update("nationalIdentityNumber", v)}
              />
            </div>
          </div>

          {/* Row 7: Registration number */}
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ flex: 1 }}>
              <LabeledInput
                label="Registration Number"
                placeholder="Registration Number"
                value={form.registrationNumber}
                onChange={(v) => update("registrationNumber", v)}
              />
            </div>
          </div>

          {/* MORE section */}
          <div
            style={{
              marginTop: 4,
              borderRadius: 6,
              border: "1px solid #e5e7eb",
              padding: 12,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => setShowMore((x) => !x)}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#047857",
                }}
              >
                More
              </div>
              <div style={{ fontSize: 18 }}>{showMore ? "▾" : "▸"}</div>
            </div>

            {showMore && (
              <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <LabeledInput
                      label="Additional Phone Number"
                      placeholder="+977"
                      value={form.additionalPhone}
                      onChange={(v) => update("additionalPhone", v)}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <LabeledInput
                      label="Associate Company"
                      placeholder="Associate Company"
                      value={form.associateCompany}
                      onChange={(v) => update("associateCompany", v)}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <LabeledInput
                      label="Occupation"
                      placeholder="Occupation"
                      value={form.occupation}
                      onChange={(v) => update("occupation", v)}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={fieldLabel}>Marital Status</label>
                    <select
                      value={form.maritalStatus}
                      onChange={(e) => update("maritalStatus", e.target.value)}
                      style={fieldInput}
                    >
                      <option value="">Select</option>
                      {MARITAL_STATUSES.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <label style={fieldLabel}>Blood Group</label>
                    <select
                      value={form.bloodGroup}
                      onChange={(e) => update("bloodGroup", e.target.value)}
                      style={fieldInput}
                    >
                      <option value="">Blood Group</option>
                      {BLOOD_GROUPS.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div style={{ flex: 1 }}>
                    <LabeledInput
                      label="Ethnicity"
                      placeholder="Ethnicity"
                      value={form.ethnicity}
                      onChange={(v) => update("ethnicity", v)}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <LabeledInput
                      label="Nationality"
                      placeholder="Nationality"
                      value={form.nationality}
                      onChange={(v) => update("nationality", v)}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <LabeledInput
                      label="Applied Country"
                      placeholder="Applied Country"
                      value={form.appliedCountry}
                      onChange={(v) => update("appliedCountry", v)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* PASSPORT section */}
          <div
            style={{
              marginTop: 8,
              borderRadius: 6,
              border: "1px solid #e5e7eb",
              padding: 12,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => setShowPassport((x) => !x)}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#047857",
                }}
              >
                Passport
              </div>
              <div style={{ fontSize: 18 }}>{showPassport ? "▾" : "▸"}</div>
            </div>

            {showPassport && (
              <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <LabeledInput
                      label="Passport Number"
                      placeholder="Passport Number"
                      value={form.passportNumber}
                      onChange={(v) => update("passportNumber", v)}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <LabeledInput
                      label="Passport Issue Place"
                      placeholder="Passport Issue Place"
                      value={form.passportIssuePlace}
                      onChange={(v) => update("passportIssuePlace", v)}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <label style={fieldLabel}>
                      Passport issue date (BS YYYY-MM-DD)
                    </label>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <input
                        value={form.passportIssueDateBs}
                        onChange={(e) => update("passportIssueDateBs", e.target.value)}
                        placeholder="YYYY-MM-DD"
                        style={fieldInput}
                      />
                      <div
                        style={{
                          display: "flex",
                          borderRadius: 999,
                          border: "1px solid #d1d5db",
                          overflow: "hidden",
                          fontSize: 11,
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => setPassportIssueMode("AD")}
                          style={{
                            padding: "4px 8px",
                            border: "none",
                            background:
                              passportIssueMode === "AD"
                                ? "#0b7a53"
                                : "transparent",
                            color:
                              passportIssueMode === "AD" ? "#fff" : "#4b5563",
                            cursor: "pointer",
                          }}
                        >
                          AD
                        </button>
                        <button
                          type="button"
                          onClick={() => setPassportIssueMode("BS")}
                          style={{
                            padding: "4px 8px",
                            border: "none",
                            background:
                              passportIssueMode === "BS"
                                ? "#0b7a53"
                                : "transparent",
                            color:
                              passportIssueMode === "BS" ? "#fff" : "#4b5563",
                            cursor: "pointer",
                          }}
                        >
                          BS
                        </button>
                      </div>
                    </div>
                  </div>

                  <div style={{ flex: 1 }}>
                    <label style={fieldLabel}>
                      Passport expiry date (BS YYYY-MM-DD)
                    </label>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <input
                        value={form.passportExpiryDateBs}
                        onChange={(e) =>
                          update("passportExpiryDateBs", e.target.value)
                        }
                        placeholder="YYYY-MM-DD"
                        style={fieldInput}
                      />
                      <div
                        style={{
                          display: "flex",
                          borderRadius: 999,
                          border: "1px solid #d1d5db",
                          overflow: "hidden",
                          fontSize: 11,
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => setPassportExpiryMode("AD")}
                          style={{
                            padding: "4px 8px",
                            border: "none",
                            background:
                              passportExpiryMode === "AD"
                                ? "#0b7a53"
                                : "transparent",
                            color:
                              passportExpiryMode === "AD" ? "#fff" : "#4b5563",
                            cursor: "pointer",
                          }}
                        >
                          AD
                        </button>
                        <button
                          type="button"
                          onClick={() => setPassportExpiryMode("BS")}
                          style={{
                            padding: "4px 8px",
                            border: "none",
                            background:
                              passportExpiryMode === "BS"
                                ? "#0b7a53"
                                : "transparent",
                            color:
                              passportExpiryMode === "BS" ? "#fff" : "#4b5563",
                            cursor: "pointer",
                          }}
                        >
                          BS
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {error && (
            <div style={{ marginTop: 8, fontSize: 12, color: "#b91c1c" }}>
              {error}
            </div>
          )}

          {/* Buttons */}
          <div
            style={{
              marginTop: 18,
              display: "flex",
              justifyContent: "flex-end",
              gap: 8,
            }}
          >
            <button
              type="button"
              onClick={onClose}
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
      </div>
    </div>
  );
}

/* ---------------- Settings drawer (UI only) ---------------- */

function ClientSettingsDrawer({ onClose }: { onClose: () => void }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,23,42,0.35)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: 40,
        zIndex: 40,
      }}
    >
      <div
        style={{
          width: 540,
          maxWidth: "100%",
          maxHeight: "90vh",
          background: "#ffffff",
          borderRadius: 10,
          boxShadow: "0 16px 40px rgba(0,0,0,0.2)",
          overflowY: "auto",
          padding: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 12,
            alignItems: "center",
          }}
        >
          <h2 style={{ margin: 0, fontSize: 18 }}>
            Calendar And Client Settings
          </h2>
          <button
            type="button"
            onClick={onClose}
            style={{
              border: "none",
              background: "transparent",
              fontSize: 20,
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>

        <h4 style={{ marginTop: 16, marginBottom: 8, fontSize: 13 }}>
          Calendar
        </h4>
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <div style={{ flex: 1 }}>
            <label style={fieldLabel}>Primary Calendar</label>
            <select style={fieldInput}>
              <option>Bikram Sambat (BS)</option>
              <option>Gregorian (AD)</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={fieldLabel}>Starting Month</label>
            <select style={fieldInput}>
              <option>Shrawan</option>
              <option>Baisakh</option>
              <option>January</option>
            </select>
          </div>
        </div>

        <label style={{ display: "flex", gap: 8, fontSize: 13, marginBottom: 8 }}>
          <input type="checkbox" defaultChecked />
          Require Referrer
        </label>

        <h4 style={{ marginTop: 16, marginBottom: 8, fontSize: 13 }}>Client</h4>
        <label style={{ display: "flex", gap: 8, fontSize: 13 }}>
          <input type="checkbox" defaultChecked />
          Allow Client Duplication
        </label>
        <label style={{ display: "flex", gap: 8, fontSize: 13 }}>
          <input type="checkbox" />
          Require Email
        </label>
        <label style={{ display: "flex", gap: 8, fontSize: 13 }}>
          <input type="checkbox" />
          Require Date of Birth
        </label>
        <label style={{ display: "flex", gap: 8, fontSize: 13 }}>
          <input type="checkbox" />
          Require Phone Number
        </label>

        <h4 style={{ marginTop: 16, marginBottom: 8, fontSize: 13 }}>
          Client And Calendar
        </h4>
        <label style={{ display: "flex", gap: 8, fontSize: 13 }}>
          <input type="checkbox" />
          Require Known Us From
        </label>

        <div
          style={{
            marginTop: 18,
            display: "flex",
            justifyContent: "flex-end",
            gap: 8,
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: "8px 16px",
              borderRadius: 4,
              border: "1px solid #e5e7eb",
              background: "#ffffff",
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            CLOSE
          </button>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: "8px 18px",
              borderRadius: 4,
              border: "none",
              background: "#0b7a53",
              color: "#ffffff",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- shared helpers ---------------- */

function LabeledInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label style={fieldLabel}>{label}</label>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        style={fieldInput}
      />
    </div>
  );
}

const fieldLabel: React.CSSProperties = {
  display: "block",
  fontSize: 12,
  fontWeight: 600,
  marginBottom: 4,
};

const fieldInput: React.CSSProperties = {
  width: "100%",
  padding: "7px 9px",
  borderRadius: 4,
  border: "1px solid #d1d5db",
  fontSize: 13,
  boxSizing: "border-box",
};
