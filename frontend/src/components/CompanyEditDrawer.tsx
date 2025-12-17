"use client";

import { useState } from "react";

export default function CompanyEditDrawer({
  data,
  onClose,
  onSave,
}: {
  data: any;
  onClose: () => void;
  onSave: (data: any) => void;
}) {
  const [form, setForm] = useState({ ...data });

  return (
    <div className="drawer-overlay">
      <div className="drawer">
        <div className="drawer-header">
          <span>Edit Company</span>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="drawer-body">
          <Input
            label="Company Name"
            value={form.name}
            onChange={(v) => setForm({ ...form, name: v })}
          />
          <Input
            label="Short Name"
            value={form.shortName}
            onChange={(v) => setForm({ ...form, shortName: v })}
          />
          <Input
            label="City"
            value={form.city}
            onChange={(v) => setForm({ ...form, city: v })}
          />
          <Input
            label="Address"
            value={form.address}
            onChange={(v) => setForm({ ...form, address: v })}
          />
          <Input
            label="Email"
            value={form.email}
            onChange={(v) => setForm({ ...form, email: v })}
          />
          <Input
            label="Mobile"
            value={form.mobile}
            onChange={(v) => setForm({ ...form, mobile: v })}
          />
        </div>

        <div className="drawer-footer">
          <button onClick={onClose}>Cancel</button>
          <button
            className="save-btn"
            onClick={() => {
              onSave(form);
              onClose();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
