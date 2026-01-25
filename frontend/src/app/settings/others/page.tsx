"use client";

import { useState } from "react";

const tabs = [
  { key: "general", label: "GENERAL PRINT" },
  { key: "department", label: "DEPARTMENT" },
  { key: "service", label: "SERVICE TYPE" },
  { key: "vitals", label: "VITALS" },
  { key: "sms", label: "SMS / EMAIL" },
  { key: "survey", label: "SURVEY FORM" },
  { key: "ssf", label: "SSF" },
];

export default function OthersSettingsPage() {
  const [active, setActive] = useState("general");

  return (
    <div className="bg-white rounded-lg p-6 max-w-5xl">
      {/* Tabs */}
      <div className="flex gap-6 border-b mb-6">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={`pb-2 text-sm font-medium ${
              active === t.key
                ? "border-b-2 border-green-600 text-green-600"
                : "text-gray-500"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {active === "general" ? <GeneralPrint /> : <div>Coming soon</div>}
    </div>
  );
}

function GeneralPrint() {
  return (
    <div className="space-y-4 max-w-md">
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" defaultChecked />
        Centralized Header
      </label>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" defaultChecked />
        Enable letterhead color
      </label>

      <input className="input" placeholder="Hex value" />

      <div>
        <div className="text-xs mb-1">
          Clinic Name Font Size Scale (0.5 – 2)
        </div>
        <input type="number" step="0.1" defaultValue={1.8} className="input" />
      </div>
    </div>
  );
}
