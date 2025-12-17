"use client";

import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function CreateEmployeeDrawer({
  open,
  onClose,
  onSuccess,
}: Props) {
  const [form, setForm] = useState({
    department: "All",
    group: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    pan: "",
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30">
      <div className="w-[460px] h-full bg-white flex flex-col">
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Create Employee</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-xl"
          >
            ×
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-auto px-6 py-6 space-y-4">
          {/* Department */}
          <Field label="Department *">
            <select
              value={form.department}
              onChange={(e) =>
                setForm({ ...form, department: e.target.value })
              }
              className="select"
            >
              <option>All</option>
              <option>Pathology</option>
              <option>Radiology</option>
            </select>
          </Field>

          {/* User Group */}
          <Field label="User Group *">
            <select
              value={form.group}
              onChange={(e) =>
                setForm({ ...form, group: e.target.value })
              }
              className="select"
            >
              <option value="">Select</option>
              <option value="Administrative">Administrative</option>
              <option value="Doctor">Doctor</option>
              <option value="Technician">Technician</option>
            </select>
          </Field>

          {/* First Name */}
          <Field label="First Name *">
            <input
              value={form.firstName}
              onChange={(e) =>
                setForm({ ...form, firstName: e.target.value })
              }
              className="input"
            />
          </Field>

          {/* Last Name */}
          <Field label="Last Name *">
            <input
              value={form.lastName}
              onChange={(e) =>
                setForm({ ...form, lastName: e.target.value })
              }
              className="input"
            />
          </Field>

          {/* Mobile */}
          <Field label="Mobile Number *">
            <div className="flex">
              <span className="px-3 flex items-center border border-r-0 rounded-l text-sm bg-gray-50">
                +977
              </span>
              <input
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
                className="input rounded-l-none"
              />
            </div>
          </Field>

          {/* Email */}
          <Field label="Email *">
            <input
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="input"
            />
          </Field>

          {/* PAN */}
          <Field label="Pan Number">
            <input
              value={form.pan}
              onChange={(e) =>
                setForm({ ...form, pan: e.target.value })
              }
              className="input"
            />
          </Field>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-4 px-6 py-4 border-t">
          <button
            onClick={onClose}
            className="text-sm text-green-600 font-medium"
          >
            CANCEL
          </button>
          <button
            onClick={onSuccess}
            className="bg-green-600 text-white px-6 py-2 rounded text-sm font-medium"
          >
            CREATE
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Reusable Field ---------- */

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">
        {label}
      </label>
      {children}
    </div>
  );
}
