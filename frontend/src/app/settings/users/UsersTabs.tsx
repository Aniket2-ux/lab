"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type TabKey = "admin" | "service" | "all" | "bookable";

export default function UsersTabs() {
  const [activeTab, setActiveTab] = useState<TabKey>("admin");
  const router = useRouter();

  return (
    <div>
      {/* ---------- TAB HEADER ---------- */}
      <div style={tabsBar}>
        <TabButton
          label="ADMINISTRATIVE USER"
          active={activeTab === "admin"}
          onClick={() => setActiveTab("admin")}
        />
        <TabButton
          label="SERVICE PROVIDERS"
          active={activeTab === "service"}
          onClick={() => setActiveTab("service")}
        />
        <TabButton
          label="ALL"
          active={activeTab === "all"}
          onClick={() => setActiveTab("all")}
        />
        <TabButton
          label="BOOKABLE RESOURCE"
          active={activeTab === "bookable"}
          onClick={() => setActiveTab("bookable")}
        />
      </div>

      {/* ---------- TAB CONTENT ---------- */}
      <div style={{ marginTop: 24 }}>
        {activeTab === "admin" && (
          <Section
            title="Employees (0)"
            buttonLabel="ADMINISTRATIVE USER"
            onCreate={() => router.push("/settings/users/employees/create")}
          />
        )}

        {activeTab === "service" && (
          <Section
            title="Service Providers (0)"
            buttonLabel="CREATE SERVICE PROVIDER"
            onCreate={() =>
              router.push("/settings/users/service-providers/create")
            }
          />
        )}

        {activeTab === "all" && (
          <Section title="All Active Users (0)" />
        )}

        {activeTab === "bookable" && (
          <Section title="Bookable Resources (0)" />
        )}
      </div>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function TabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        ...tabBtn,
        borderBottom: active ? "3px solid #198754" : "3px solid transparent",
        color: active ? "#198754" : "#555",
        fontWeight: active ? 600 : 500,
      }}
    >
      {label}
    </button>
  );
}

function Section({
  title,
  buttonLabel,
  onCreate,
}: {
  title: string;
  buttonLabel?: string;
  onCreate?: () => void;
}) {
  return (
    <div style={card}>
      <div style={cardHeader}>
        <h3 style={{ margin: 0 }}>{title}</h3>
        {buttonLabel && onCreate && (
          <button style={createBtn} onClick={onCreate}>
            {buttonLabel}
          </button>
        )}
      </div>

      {/* EMPTY STATE */}
      <div style={emptyState}>
        No records found.
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const tabsBar = {
  display: "flex",
  gap: 32,
  borderBottom: "1px solid #ddd",
};

const tabBtn = {
  background: "none",
  border: "none",
  padding: "12px 4px",
  cursor: "pointer",
  fontSize: 14,
};

const card = {
  background: "#fff",
  borderRadius: 8,
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  padding: 20,
};

const cardHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 16,
};

const createBtn = {
  background: "#198754",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  borderRadius: 6,
  cursor: "pointer",
  fontSize: 13,
};

const emptyState = {
  padding: "32px",
  textAlign: "center" as const,
  color: "#888",
};
