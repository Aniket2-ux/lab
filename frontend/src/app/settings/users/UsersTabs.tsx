"use client";

import { useState } from "react";

/* ---------------- Tabs ---------------- */

const TABS = [
  "ADMINISTRATIVE USER",
  "SERVICE PROVIDERS",
  "ALL",
  "BOOKABLE RESOURCE",
];

export default function UsersTabs() {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      {/* Tabs Header */}
      <div style={tabsHeader}>
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              ...tabBtn,
              ...(activeTab === tab ? activeTabBtn : {}),
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div style={toolbar}>
        <input placeholder="Search" style={search} />

        {activeTab !== "ALL" && (
          <button style={createBtn} onClick={() => setOpenDrawer(true)}>
            {activeTab === "SERVICE PROVIDERS"
              ? "CREATE SERVICE PROVIDER"
              : "ADMINISTRATIVE USER"}
          </button>
        )}
      </div>

      {/* Table */}
      <div style={tableWrap}>
        <table style={table}>
          <thead>
            <tr>
              <th>Name</th>
              {activeTab === "SERVICE PROVIDERS" && <th>Speciality</th>}
              <th>Phone</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={4} style={empty}>
                No records found
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Drawer */}
      {openDrawer && (
        <Drawer title={activeTab} onClose={() => setOpenDrawer(false)} />
      )}
    </>
  );
}

/* ---------------- Drawer ---------------- */

function Drawer({
  title,
  onClose,
}: {
  title: string;
  onClose: () => void;
}) {
  return (
    <div style={drawerOverlay}>
      <div style={drawer}>
        <div style={drawerHeader}>
          <h3>Create {title}</h3>
          <button onClick={onClose}>✕</button>
        </div>

        <div style={formGrid}>
          <Input label="First Name" />
          <Input label="Last Name" />
          <Input label="Mobile Number" />
          <Input label="Email" />
          <Input label="Department" />
          <Input label="User Group" />
        </div>

        <div style={drawerFooter}>
          <button onClick={onClose} style={cancelBtn}>
            Cancel
          </button>
          <button style={saveBtn}>Create</button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Components ---------------- */

function Input({ label }: { label: string }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input style={input} />
    </div>
  );
}

/* ---------------- Styles ---------------- */

const tabsHeader = {
  display: "flex",
  borderBottom: "1px solid #e0e0e0",
  marginBottom: 16,
};

const tabBtn = {
  padding: "10px 16px",
  background: "none",
  border: "none",
  cursor: "pointer",
  fontWeight: 500,
};

const activeTabBtn = {
  borderBottom: "2px solid #198754",
  color: "#198754",
};

const toolbar = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 16,
};

const search = {
  padding: 8,
  width: 240,
  borderRadius: 6,
  border: "1px solid #ccc",
};

const createBtn = {
  background: "#198754",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  borderRadius: 6,
  cursor: "pointer",
};

const tableWrap = {
  background: "#fff",
  borderRadius: 8,
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
};

const table = {
  width: "100%",
  borderCollapse: "collapse" as const,
};

const empty = {
  padding: 24,
  textAlign: "center" as const,
  color: "#777",
};

const drawerOverlay = {
  position: "fixed" as const,
  inset: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "flex-end",
};

const drawer = {
  width: 420,
  background: "#fff",
  height: "100%",
  padding: 20,
};

const drawerHeader = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 16,
};

const formGrid = {
  display: "grid",
  gap: 12,
};

const drawerFooter = {
  display: "flex",
  justifyContent: "flex-end",
  gap: 12,
  marginTop: 20,
};

const input = {
  width: "100%",
  padding: 8,
  borderRadius: 6,
  border: "1px solid #ccc",
};

const labelStyle = {
  fontSize: 12,
  color: "#666",
};

const cancelBtn = {
  background: "#eee",
  border: "none",
  padding: "8px 14px",
  borderRadius: 6,
};

const saveBtn = {
  background: "#198754",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  borderRadius: 6,
};
