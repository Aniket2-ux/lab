"use client";

import React, { useState, useEffect } from "react";

export type Client = {
  id: number;
  fullName: string;
  age: number | null;
  gender: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  knownFrom?: string | null;
  internalNotes?: string | null;
  createdAt: string;
  lastVisitedAt?: string | null;
};

type NewClientForm = {
  fullName: string;
  phone: string;
  email: string;
  knownFrom: string;
  year: string;
  month: string;
  dob: string;
  gender: string;
  address: string;
  palikaDistrictProvince: string;
  panVat: string;
  internalNotes: string;
  insuranceNumber: string;
  nationalId: string;
  registrationNumber: string;

  moreOpen: boolean;
  passportOpen: boolean;
  additionalPhone: string;
  associateCompany: string;
  occupation: string;
  maritalStatus: string;
  bloodGroup: string;
  ethnicity: string;
  nationality: string;
  appliedCountry: string;

  passportNumber: string;
  passportIssuePlace: string;
  passportIssueDate: string;
  passportExpiryDate: string;
};

const initialForm: NewClientForm = {
  fullName: "",
  phone: "",
  email: "",
  knownFrom: "",
  year: "",
  month: "",
  dob: "",
  gender: "",
  address: "",
  palikaDistrictProvince: "",
  panVat: "",
  internalNotes: "",
  insuranceNumber: "",
  nationalId: "",
  registrationNumber: "",

  moreOpen: false,
  passportOpen: false,
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
};

const knownFromOptions = [
  "Facebook",
  "Instagram",
  "Website",
  "Google Business",
  "Doctor Referral",
  "Friend / Family",
  "Other",
];

export type CreateClientModalProps = {
  open: boolean;
  onClose: () => void;
  onCreated: (client: Client) => void;
  /** Optional: pre-fill name (for “Add 'mah'”) */
  initialName?: string;
};

export default function CreateClientModal({
  open,
  onClose,
  onCreated,
  initialName,
}: CreateClientModalProps) {
  const [form, setForm] = useState<NewClientForm>({
    ...initialForm,
    fullName: initialName || "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setForm((f) => ({ ...initialForm, fullName: initialName || "" }));
    setSaving(false);
    setError(null);
  }, [open, initialName]);

  if (!open) return null;

  const update = (field: keyof NewClientForm, value: string | boolean) => {
    setForm((f) => ({ ...f, [field]: value } as NewClientForm));
  };

  const handleSave = async () => {
    if (!form.fullName.trim()) {
      setError("Full Name is required");
      return;
    }

    try {
      setSaving(true);
      setError(null);

      const payload: any = {
        fullName: form.fullName,
        phone: form.phone || null,
        email: form.email || null,
        address: form.address || null,
        gender: form.gender || null,
        knownFrom: form.knownFrom || null,
        internalNotes: form.internalNotes || null,
        panVat: form.panVat || null,
        insuranceNumber: form.insuranceNumber || null,
        nationalId: form.nationalId || null,
        registrationNumber: form.registrationNumber || null,
      };

      const res = await fetch("http://localhost:5000/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("HTTP " + res.status);

      const created: Client = await res.json();
      onCreated(created);
      onClose();
    } catch (err) {
      console.error("Failed to create client", err);
      setError("Failed to save client. Please try again.");
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
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: 40,
        zIndex: 60,
      }}
    >
      <div
        style={{
          width: "900px",
          maxWidth: "100%",
          maxHeight: "90vh",
          background: "#ffffff",
          borderRadius: 4,
          boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* header */}
        <div
          style={{
            padding: "14px 20px",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              onClick={onClose}
              style={{
                border: "none",
                background: "transparent",
                fontSize: 18,
                cursor: "pointer",
                lineHeight: 1,
              }}
            >
              ×
            </button>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>
              Create new client
            </h2>
          </div>
        </div>

        {/* body */}
        <div
          style={{
            padding: "20px 22px 12px",
            overflowY: "auto",
          }}
        >
          {/* main grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              columnGap: 16,
              rowGap: 12,
            }}
          >
            <Field
              label="Full Name*"
              placeholder="Eg. Ram Mahato"
              value={form.fullName}
              onChange={(v) => update("fullName", v)}
            />
            <Field
              label="Phone Number"
              placeholder="+977"
              value={form.phone}
              onChange={(v) => update("phone", v)}
            />

            <Field
              label="Email"
              placeholder="Eg. Email"
              value={form.email}
              onChange={(v) => update("email", v)}
            />
            <SelectField
              label="Known Us From"
              value={form.knownFrom}
              onChange={(v) => update("knownFrom", v)}
            >
              <option value="">Where did you hear about us</option>
              {knownFromOptions.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </SelectField>

            <Field
              label="Year"
              placeholder="Age in Yr"
              value={form.year}
              onChange={(v) => update("year", v)}
            />
            <Field
              label="Month"
              placeholder="Age in M"
              value={form.month}
              onChange={(v) => update("month", v)}
            />
            <Field
              label="Date of Birth (BS YYYY-MM-DD format)"
              placeholder="YYYY-MM-DD"
              value={form.dob}
              onChange={(v) => update("dob", v)}
            />
            <SelectField
              label="Gender"
              value={form.gender}
              onChange={(v) => update("gender", v)}
            >
              <option value="">Select gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </SelectField>

            <Field
              label="Address"
              placeholder="Tole/Village/City-Ward no"
              value={form.address}
              onChange={(v) => update("address", v)}
            />
            <Field
              label="Palika, District, Province"
              placeholder="Palika, District, Province"
              value={form.palikaDistrictProvince}
              onChange={(v) => update("palikaDistrictProvince", v)}
            />

            <Field
              label="PAN/VAT Number"
              placeholder="Enter pan/vat number"
              value={form.panVat}
              onChange={(v) => update("panVat", v)}
            />
            <Field
              label="Internal Notes"
              placeholder="Internal Notes"
              value={form.internalNotes}
              onChange={(v) => update("internalNotes", v)}
            />

            <Field
              label="Insurance Number"
              placeholder="Insurance Number"
              value={form.insuranceNumber}
              onChange={(v) => update("insuranceNumber", v)}
            />
            <Field
              label="National Identity Number"
              placeholder="National Identity Number"
              value={form.nationalId}
              onChange={(v) => update("nationalId", v)}
            />

            <Field
              label="Registration Number"
              placeholder="Registration Number"
              value={form.registrationNumber}
              onChange={(v) => update("registrationNumber", v)}
            />
          </div>

          {/* More section */}
          <SectionHeader
            title="More"
            collapsed={!form.moreOpen}
            onToggle={() => update("moreOpen", !form.moreOpen)}
          />

          {form.moreOpen && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                columnGap: 16,
                rowGap: 12,
                marginTop: 8,
                marginBottom: 8,
              }}
            >
              <Field
                label="Additional Phone Number"
                placeholder="+977"
                value={form.additionalPhone}
                onChange={(v) => update("additionalPhone", v)}
              />
              <Field
                label="Associate Company"
                placeholder="Associate Company"
                value={form.associateCompany}
                onChange={(v) => update("associateCompany", v)}
              />

              <Field
                label="Occupation"
                placeholder="Occupation"
                value={form.occupation}
                onChange={(v) => update("occupation", v)}
              />
              <Field
                label="Marital Status"
                placeholder="Marital Status"
                value={form.maritalStatus}
                onChange={(v) => update("maritalStatus", v)}
              />

              <Field
                label="Blood Group"
                placeholder="Blood Group"
                value={form.bloodGroup}
                onChange={(v) => update("bloodGroup", v)}
              />
              <Field
                label="Ethnicity"
                placeholder="Ethnicity"
                value={form.ethnicity}
                onChange={(v) => update("ethnicity", v)}
              />

              <Field
                label="Nationality"
                placeholder="Nationality"
                value={form.nationality}
                onChange={(v) => update("nationality", v)}
              />
              <Field
                label="Applied Country"
                placeholder="Applied Country"
                value={form.appliedCountry}
                onChange={(v) => update("appliedCountry", v)}
              />
            </div>
          )}

          {/* Passport section */}
          <SectionHeader
            title="Passport"
            collapsed={!form.passportOpen}
            onToggle={() => update("passportOpen", !form.passportOpen)}
          />

          {form.passportOpen && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                columnGap: 16,
                rowGap: 12,
                marginTop: 8,
              }}
            >
              <Field
                label="Passport Number"
                placeholder="Passport Number"
                value={form.passportNumber}
                onChange={(v) => update("passportNumber", v)}
              />
              <Field
                label="Passport Issue Place"
                placeholder="Passport Issue Place"
                value={form.passportIssuePlace}
                onChange={(v) => update("passportIssuePlace", v)}
              />

              <Field
                label="Passport issue date (BS YYYY-MM-DD)"
                placeholder="YYYY-MM-DD"
                value={form.passportIssueDate}
                onChange={(v) => update("passportIssueDate", v)}
              />
              <Field
                label="Passport expiry date (BS YYYY-MM-DD)"
                placeholder="YYYY-MM-DD"
                value={form.passportExpiryDate}
                onChange={(v) => update("passportExpiryDate", v)}
              />
            </div>
          )}

          {error && (
            <div style={{ marginTop: 10, color: "#b91c1c", fontSize: 12 }}>
              {error}
            </div>
          )}
        </div>

        {/* footer */}
        <div
          style={{
            padding: "10px 20px",
            borderTop: "1px solid #e5e7eb",
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
}

/* helpers */

function Field(props: {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label style={fieldLabel}>{props.label}</label>
      <input
        value={props.value}
        placeholder={props.placeholder}
        onChange={(e) => props.onChange(e.target.value)}
        style={fieldInput}
      />
    </div>
  );
}

function SelectField(props: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label style={fieldLabel}>{props.label}</label>
      <select
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        style={fieldInput}
      >
        {props.children}
      </select>
    </div>
  );
}

function SectionHeader({
  title,
  collapsed,
  onToggle,
}: {
  title: string;
  collapsed: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      style={{
        marginTop: 18,
        padding: "10px 6px 4px",
        borderTop: "1px solid #e5e7eb",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
      }}
      onClick={onToggle}
    >
      <span style={{ fontSize: 13, fontWeight: 600 }}>{title}</span>
      <span style={{ fontSize: 16 }}>{collapsed ? "▾" : "▴"}</span>
    </div>
  );
}

const fieldLabel: React.CSSProperties = {
  display: "block",
  fontSize: 11,
  fontWeight: 600,
  marginBottom: 3,
};

const fieldInput: React.CSSProperties = {
  width: "100%",
  padding: "7px 9px",
  borderRadius: 4,
  border: "1px solid #d1d5db",
  fontSize: 13,
  boxSizing: "border-box",
};
