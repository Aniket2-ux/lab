// frontend/src/components/CreateClientDrawer.tsx
"use client";

import React, { useEffect, useState } from "react";

/* ---------- Types ---------- */

export type ClientRecord = {
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

type NewClientForm = {
  fullName: string;
  phone: string;
  email: string;
  knownFrom: string;

  ageYear: string;
  ageMonth: string;
  dob: string; // YYYY-MM-DD

  gender: string;
  address: string;
  palikaDistrictProvince: string;
  panVatNumber: string;
  internalNotes: string;
  insuranceNumber: string;
  nationalIdentityNumber: string;
  registrationNumber: string;

  // More section
  additionalPhone: string;
  associateCompany: string;
  occupation: string;
  maritalStatus: string;
  bloodGroup: string;
  ethnicity: string;
  nationality: string;
  appliedCountry: string;

  // Passport section
  passportNumber: string;
  passportIssuePlace: string;
  passportIssueDate: string;
  passportExpiryDate: string;
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

const BLOOD_GROUPS = [
  "",
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];

const MARITAL_STATUSES = ["", "Single", "Married", "Divorced", "Widowed"];

/* ---------- Helpers ---------- */

function calcAgeFromDob(dob: string) {
  if (!dob) return { years: "", months: "" };
  const d = new Date(dob);
  if (Number.isNaN(d.getTime())) return { years: "", months: "" };

  const now = new Date();
  let years = now.getFullYear() - d.getFullYear();
  let months = now.getMonth() - d.getMonth();

  if (now.getDate() < d.getDate()) {
    months -= 1;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  if (years < 0) return { years: "", months: "" };

  return {
    years: String(years),
    months: months ? String(months) : "",
  };
}

/* ---------- Component ---------- */

interface Props {
  /** Pre-fill full name from Billing search / Clients page, optional */
  initialName?: string;
  onClose: () => void;
  onCreated: (c: ClientRecord) => void;
}

const CreateClientDrawer: React.FC<Props> = ({
  initialName,
  onClose,
  onCreated,
}) => {
  const [form, setForm] = useState<NewClientForm>({
    fullName: initialName || "",
    phone: "",
    email: "",
    knownFrom: "",

    ageYear: "",
    ageMonth: "",
    dob: "",

    gender: "",
    address: "",
    palikaDistrictProvince: "",
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
    passportIssueDate: "",
    passportExpiryDate: "",
  });

  // keep initialName in sync if prop changes
  useEffect(() => {
    if (initialName) {
      setForm((f) => ({ ...f, fullName: f.fullName || initialName }));
    }
  }, [initialName]);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showMore, setShowMore] = useState(true);
  const [showPassport, setShowPassport] = useState(true);

  const update = (field: keyof NewClientForm, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  // when DOB changes → auto-calc age
  const handleDobChange = (value: string) => {
    const { years, months } = calcAgeFromDob(value);
    setForm((f) => ({
      ...f,
      dob: value,
      ageYear: years,
      ageMonth: months,
    }));
  };

  // save to backend
  const handleSave = async () => {
    if (!form.fullName.trim()) {
      setError("Full name is required");
      return;
    }

    try {
      setSaving(true);
      setError(null);

      // convert ageYear to a single numeric age (years), backend-style
      const age =
        form.ageYear && !Number.isNaN(Number(form.ageYear))
          ? Number(form.ageYear)
          : null;

      const payload = {
        fullName: form.fullName,
        phone: form.phone || null,
        email: form.email || null,
        age,
        gender: form.gender || null,
        address: form.address || null,
        knownFrom: form.knownFrom || null,
        internalNotes: form.internalNotes || null,

        // Everything below is "extra metadata" – safe if your backend ignores
        palikaDistrictProvince: form.palikaDistrictProvince || null,
        panVatNumber: form.panVatNumber || null,
        insuranceNumber: form.insuranceNumber || null,
        nationalIdentityNumber: form.nationalIdentityNumber || null,
        registrationNumber: form.registrationNumber || null,
        additionalPhone: form.additionalPhone || null,
        associateCompany: form.associateCompany || null,
        occupation: form.occupation || null,
        maritalStatus: form.maritalStatus || null,
        bloodGroup: form.bloodGroup || null,
        ethnicity: form.ethnicity || null,
        nationality: form.nationality || null,
        appliedCountry: form.appliedCountry || null,
        dob: form.dob || null,
        passportNumber: form.passportNumber || null,
        passportIssuePlace: form.passportIssuePlace || null,
        passportIssueDate: form.passportIssueDate || null,
        passportExpiryDate: form.passportExpiryDate || null,
      };

      const res = await fetch("http://localhost:5000/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("HTTP " + res.status);

      const created: ClientRecord = await res.json();
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
        zIndex: 50,
      }}
    >
      <div
        style={{
          width: 640,
          maxWidth: "100%",
          height: "100%",
          background: "#ffffff",
          boxShadow: "-4px 0 12px rgba(0,0,0,0.2)",
          padding: 24,
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 18,
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

        {/* Top section: large grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            columnGap: 16,
            rowGap: 12,
            marginBottom: 16,
          }}
        >
          {/* row 1 */}
          <LabeledInput
            label="Full Name*"
            placeholder="Eg. Ram Mahato"
            value={form.fullName}
            onChange={(v) => update("fullName", v)}
          />
          <LabeledInput
            label="Phone Number"
            placeholder="+977…"
            value={form.phone}
            onChange={(v) => update("phone", v)}
          />

          {/* row 2 */}
          <LabeledInput
            label="Email"
            placeholder="Eg. Email"
            value={form.email}
            onChange={(v) => update("email", v)}
          />
          <div>
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

          {/* row 3 – Age + DOB + Gender – mimic your UI */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              columnGap: 8,
            }}
          >
            <LabeledInput
              label="Age in Yr"
              placeholder="Eg. 25"
              value={form.ageYear}
              onChange={(v) =>
                update("ageYear", v.replace(/[^0-9]/g, "").slice(0, 3))
              }
            />
            <LabeledInput
              label="Age in M"
              placeholder="Eg. 3"
              value={form.ageMonth}
              onChange={(v) =>
                update("ageMonth", v.replace(/[^0-9]/g, "").slice(0, 2))
              }
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              columnGap: 8,
              alignItems: "end",
            }}
          >
            <div>
              <label style={fieldLabel}>Date of Birth (YYYY-MM-DD)</label>
              <input
                type="date"
                value={form.dob}
                onChange={(e) => handleDobChange(e.target.value)}
                style={fieldInput}
              />
            </div>
            <div>
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

          {/* row 4 */}
          <LabeledInput
            label="Address"
            placeholder="Tole/Village/City-Ward no"
            value={form.address}
            onChange={(v) => update("address", v)}
          />
          <LabeledInput
            label="Palika, District, Province"
            placeholder="Palika, District, Province"
            value={form.palikaDistrictProvince}
            onChange={(v) => update("palikaDistrictProvince", v)}
          />

          {/* row 5 */}
          <LabeledInput
            label="PAN/VAT Number"
            placeholder="Enter pan/vat number"
            value={form.panVatNumber}
            onChange={(v) => update("panVatNumber", v)}
          />
          <LabeledInput
            label="Internal Notes"
            placeholder="Internal Notes"
            value={form.internalNotes}
            onChange={(v) => update("internalNotes", v)}
          />

          {/* row 6 */}
          <LabeledInput
            label="Insurance Number"
            placeholder="Insurance Number"
            value={form.insuranceNumber}
            onChange={(v) => update("insuranceNumber", v)}
          />
          <LabeledInput
            label="National Identity Number"
            placeholder="National Identity Number"
            value={form.nationalIdentityNumber}
            onChange={(v) => update("nationalIdentityNumber", v)}
          />

          {/* row 7 */}
          <LabeledInput
            label="Registration Number"
            placeholder="Registration Number"
            value={form.registrationNumber}
            onChange={(v) => update("registrationNumber", v)}
          />
        </div>

        {/* ------- MORE SECTION ------- */}
        <SectionHeader
          title="More"
          open={showMore}
          onToggle={() => setShowMore((o) => !o)}
        />
        {showMore && (
          <div
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: 8,
              padding: 16,
              marginBottom: 16,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              columnGap: 16,
              rowGap: 12,
            }}
          >
            <LabeledInput
              label="Additional Phone Number"
              placeholder="+977"
              value={form.additionalPhone}
              onChange={(v) => update("additionalPhone", v)}
            />
            <LabeledInput
              label="Associate Company"
              placeholder="Associate Company"
              value={form.associateCompany}
              onChange={(v) => update("associateCompany", v)}
            />

            <LabeledInput
              label="Occupation"
              placeholder="Occupation"
              value={form.occupation}
              onChange={(v) => update("occupation", v)}
            />
            <div>
              <label style={fieldLabel}>Marital Status</label>
              <select
                value={form.maritalStatus}
                onChange={(e) => update("maritalStatus", e.target.value)}
                style={fieldInput}
              >
                {MARITAL_STATUSES.map((m) => (
                  <option key={m} value={m}>
                    {m || "Select"}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={fieldLabel}>Blood Group</label>
              <select
                value={form.bloodGroup}
                onChange={(e) => update("bloodGroup", e.target.value)}
                style={fieldInput}
              >
                {BLOOD_GROUPS.map((g) => (
                  <option key={g} value={g}>
                    {g || "Blood Group"}
                  </option>
                ))}
              </select>
            </div>

            <LabeledInput
              label="Ethnicity"
              placeholder="Ethnicity"
              value={form.ethnicity}
              onChange={(v) => update("ethnicity", v)}
            />

            <LabeledInput
              label="Nationality"
              placeholder="Nationality"
              value={form.nationality}
              onChange={(v) => update("nationality", v)}
            />
            <LabeledInput
              label="Applied Country"
              placeholder="Applied Country"
              value={form.appliedCountry}
              onChange={(v) => update("appliedCountry", v)}
            />
          </div>
        )}

        {/* ------- PASSPORT SECTION ------- */}
        <SectionHeader
          title="Passport"
          open={showPassport}
          onToggle={() => setShowPassport((o) => !o)}
        />
        {showPassport && (
          <div
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: 8,
              padding: 16,
              marginBottom: 16,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              columnGap: 16,
              rowGap: 12,
            }}
          >
            <LabeledInput
              label="Passport Number"
              placeholder="Passport Number"
              value={form.passportNumber}
              onChange={(v) => update("passportNumber", v)}
            />
            <LabeledInput
              label="Passport Issue Place"
              placeholder="Passport Issue Place"
              value={form.passportIssuePlace}
              onChange={(v) => update("passportIssuePlace", v)}
            />

            <div>
              <label style={fieldLabel}>
                Passport issue date (BS YYYY-MM-DD)
              </label>
              <input
                type="date"
                value={form.passportIssueDate}
                onChange={(e) => update("passportIssueDate", e.target.value)}
                style={fieldInput}
              />
            </div>
            <div>
              <label style={fieldLabel}>
                Passport expiry date (BS YYYY-MM-DD)
              </label>
              <input
                type="date"
                value={form.passportExpiryDate}
                onChange={(e) => update("passportExpiryDate", e.target.value)}
                style={fieldInput}
              />
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{ marginBottom: 12, fontSize: 12, color: "#b91c1c" }}>
            {error}
          </div>
        )}

        {/* Footer buttons */}
        <div
          style={{
            marginTop: 8,
            display: "flex",
            justifyContent: "flex-end",
            gap: 8,
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: "8px 18px",
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
              padding: "8px 22px",
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
  );
};

export default CreateClientDrawer;

/* ---------- Small shared pieces ---------- */

function LabeledInput(props: {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (v: string) => void;
}) {
  const { label, value, onChange, placeholder } = props;
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

function SectionHeader({
  title,
  open,
  onToggle,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      style={{
        marginTop: 8,
        marginBottom: 4,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
      }}
      onClick={onToggle}
    >
      <span style={{ fontWeight: 600, fontSize: 14 }}>{title}</span>
      <span style={{ fontSize: 16 }}>{open ? "▾" : "▸"}</span>
    </div>
  );
}

/* ---------- Base field styles ---------- */

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
