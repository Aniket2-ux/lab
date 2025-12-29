"use client";

import { useRouter } from "next/navigation";

export default function ModulesPage() {
  const router = useRouter();

  const go = (path: string) => {
    router.push(path);
  };

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 16 }}>Module Setting</h2>

      <div className="modules-grid">
        <div className="module-card" onClick={() => go("/settings/modules/calendar-client")}>
          <h3>Calendar and Client</h3>
          <p>Manage Calendar and Client settings</p>
        </div>

        <div className="module-card">
          <h3>OPD</h3>
          <p>Manage OPD settings</p>
        </div>

        <div className="module-card">
          <h3>Lab</h3>
          <p>Manage Lab settings</p>
        </div>

        <div className="module-card">
          <h3>Billing</h3>
          <p>Manage Billing settings</p>
        </div>

        <div className="module-card">
          <h3>Stock</h3>
          <p>Manage Stock settings</p>
        </div>

        <div className="module-card">
          <h3>IPD</h3>
          <p>Manage IPD settings</p>
        </div>

        <div className="module-card">
          <h3>HMIS</h3>
          <p>Manage HMIS settings</p>
        </div>
      </div>
    </div>
  );
}
