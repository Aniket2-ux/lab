// frontend/src/app/services/page.tsx
"use client";
import { useEffect, useState } from "react";
import type React from "react";
import Sidebar from "../../components/Sidebar";
import HeaderBar from "../../components/HeaderBar";

type Service = {
  id: number;
  name: string;
  serviceCode: string | null;
  type: string;
  department: string | null;
  price: string | number;
  createdAt: string;
};

const TABS = [
  { key: "all", label: "All" },
  { key: "package", label: "Package" },
  { key: "labTest", label: "Lab Test" },
  { key: "medicalTest", label: "Medical Test" },
  { key: "consultation", label: "Consultation" },
  { key: "imaging", label: "Imaging Tests" },
  { key: "procedures", label: "Procedures" },
  { key: "vaccination", label: "Vaccination" },
];

const TYPE_OPTIONS = [
  { value: "consultation", label: "Consultation" },
  { value: "labTest", label: "Lab Test" },
  { value: "medicalTest", label: "Medical Test" },
  { value: "imaging", label: "Imaging" },
  { value: "package", label: "Package" },
  { value: "procedures", label: "Procedures" },
  { value: "vaccination", label: "Vaccination" },
];

const typeLabel = (value: string) =>
  TYPE_OPTIONS.find((t) => t.value === value)?.label ?? value;

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";

// ---- Types for create-service form ----
type ProviderRate = {
  id: number;
  provider: string;
  rateMode: "RS" | "%";
  rateValue: number;
};

type DeptEntry = {
  id: number;
  department: string;
};


export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [filtered, setFiltered] = useState<Service[]>([]);
  const [activeType, setActiveType] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // selection state for bulk delete
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // create-service modal state
  const [showCreate, setShowCreate] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // top-level form fields
  const [svcType, setSvcType] = useState("consultation");
  const [svcName, setSvcName] = useState("");
  const [svcCode, setSvcCode] = useState("");
  const [svcUnit, setSvcUnit] = useState("pcs");
  const [clinicPrice, setClinicPrice] = useState(0); // inc. tax
  const [taxPercent, setTaxPercent] = useState(0);
  const [materialCharge, setMaterialCharge] = useState(0);
  const [labCharge, setLabCharge] = useState(0);

  const [providerRates, setProviderRates] = useState<ProviderRate[]>([]);
  const [departments, setDepartments] = useState<DeptEntry[]>([]);
  const [createAnother, setCreateAnother] = useState(false);

  // derived
  const clinicPriceWithoutVAT =
    clinicPrice / (1 + (taxPercent || 0) / 100) || 0;

  // ---------- fetch services ----------
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);


      

      const res = await fetch(`${API_BASE}/api/services`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
        
        
        
        
        
        
        
        
        const data: Service[] = await res.json();
        setServices(data);
        setFiltered(data);
      } catch (err) {
        console.error("Failed to load services", err);
        setError("Failed to load services");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // ---------- filter ----------
  useEffect(() => {
    let list = [...services];

    if (activeType !== "all") {
      list = list.filter(
        (s) => s.type.toLowerCase() === activeType.toLowerCase()
      );
    }

    if (search.trim()) {
      const term = search.toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(term) ||
          (s.serviceCode ?? "").toLowerCase().includes(term)
      );
    }

    setFiltered(list);

    // when filters change, drop selections that are no longer visible
    setSelectedIds((prev) => prev.filter((id) => list.some((s) => s.id === id)));
  }, [services, activeType, search]);

  // ---------- selection helpers ----------
  const toggleRow = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleAllVisible = () => {
    const visibleIds = filtered.map((s) => s.id);
    const allSelected = visibleIds.every((id) => selectedIds.includes(id));

    if (allSelected) {
      // unselect all visible
      setSelectedIds((prev) => prev.filter((id) => !visibleIds.includes(id)));
    } else {
      // select all visible (keep others)
      setSelectedIds((prev) => Array.from(new Set([...prev, ...visibleIds])));
    }
  };

  const handleDeleteSelected = async () => {
    if (!selectedIds.length) return;
    const ok = window.confirm(
      `Delete ${selectedIds.length} selected service(s)?`
    );
    if (!ok) return;

    
    
    try {
      const res = await fetch(
  `${API_BASE}/api/services/bulk-delete`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ids: selectedIds }),
  }
);



      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `HTTP ${res.status}`);
      }

      // update local state
      setServices((prev) =>
        prev.filter((s) => !selectedIds.includes(s.id))
      );
      setSelectedIds([]);
    } catch (err) {
      console.error("Failed to delete selected services", err);
      alert("Failed to delete selected services.");
    }
  };

  const resetCreateForm = () => {
    setSvcType("consultation");
    setSvcName("");
    setSvcCode("");
    setSvcUnit("pcs");
    setClinicPrice(0);
    setTaxPercent(0);
    setMaterialCharge(0);
    setLabCharge(0);
    setProviderRates([]);
    setDepartments([]);
    setCreateAnother(false);
    setSaveError(null);
  };

  const handleSaveService = async () => {
    if (!svcName.trim()) {
      setSaveError("Service name is required.");
      return;
    }

    try {
      setSaving(true);
      setSaveError(null);

      const payload = {
        type: svcType,
        name: svcName,
        serviceCode: svcCode,
        unit: svcUnit,
        price: clinicPrice,
        taxPercent,
        materialCharge,
        labCharge,
        providerRates,
        departments,
      };

     const res = await fetch(`${API_BASE}/api/services`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});


      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `HTTP ${res.status}`);
      }

      const created: Service = await res.json();

      setServices((prev) => [created, ...prev]);

      if (!createAnother) {
        setShowCreate(false);
        resetCreateForm();
      } else {
        resetCreateForm();
        setShowCreate(true);
      }
    } catch (err: any) {
      console.error("Failed to save service", err);
      setSaveError(err?.message || "Failed to save service");
    } finally {
      setSaving(false);
    }
  };

  const addProviderRate = () => {
    setProviderRates((prev) => [
      ...prev,
      {
        id: prev.length ? prev[prev.length - 1].id + 1 : 1,
        provider: "",
        rateMode: "RS",
        rateValue: 0,
      },
    ]);
  };

  const updateProviderRate = (
    id: number,
    field: keyof ProviderRate,
    value: string | number
  ) => {
    setProviderRates((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const removeProviderRate = (id: number) => {
    setProviderRates((prev) => prev.filter((r) => r.id !== id));
  };

  const addDepartment = () => {
    setDepartments((prev) => [
      ...prev,
      {
        id: prev.length ? prev[prev.length - 1].id + 1 : 1,
        department: "",
      },
    ]);
  };

  const updateDepartment = (id: number, value: string) => {
    setDepartments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, department: value } : d))
    );
  };

  const removeDepartment = (id: number) => {
    setDepartments((prev) => prev.filter((d) => d.id !== id));
  };

  // ---------- render ----------
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <main style={{ flex: 1, padding: 24, background: "#f5f7fb" }}>
        <HeaderBar pageTitle="Services" />

        {/* Title + search + button */}
        <div
          style={{
            marginTop: 16,
            marginBottom: 12,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ margin: 0 }}>Services</h2>

          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              placeholder="Search name or code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                padding: 8,
                borderRadius: 4,
                border: "1px solid #ccc",
                minWidth: 220,
              }}
            />
            <button
              style={{
                padding: "8px 14px",
                borderRadius: 4,
                border: "none",
                background: "#0b7a53",
                color: "#fff",
                fontWeight: 600,
                cursor: "pointer",
              }}
              onClick={() => {
                resetCreateForm();
                setShowCreate(true);
              }}
            >
              CREATE SERVICE ▾
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: 12,
            marginBottom: 12,
            fontSize: 14,
          }}
        >
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveType(t.key)}
              style={{
                padding: "6px 10px",
                borderRadius: 20,
                border:
                  activeType === t.key
                    ? "1px solid #0b7a53"
                    : "1px solid transparent",
                background:
                  activeType === t.key ? "rgba(11,122,83,0.08)" : "transparent",
                cursor: "pointer",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Table */}
        <div
          style={{
            background: "#fff",
            borderRadius: 10,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            padding: 8,
          }}
        >
          {loading && <p style={{ padding: 8 }}>Loading…</p>}
          {error && <p style={{ padding: 8, color: "red" }}>{error}</p>}
          {!loading && !error && filtered.length === 0 && (
            <p style={{ padding: 8 }}>No services found.</p>
          )}

          {/* selection bar like screenshot */}
          {!loading && !error && selectedIds.length > 0 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "8px 8px",
                color: "#0b7a53",
                fontSize: 13,
              }}
            >
              <span>{selectedIds.length} Selected</span>
              <button
                type="button"
                onClick={handleDeleteSelected}
                style={{
                  padding: "6px 12px",
                  borderRadius: 4,
                  border: "1px solid #dc2626",
                  background: "#fee2e2",
                  color: "#b91c1c",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                DELETED SELECTED SERVICES
              </button>
            </div>
          )}

          {!loading && !error && filtered.length > 0 && (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 14,
              }}
            >
              <thead>
                <tr
                  style={{
                    background: "#f1f5f3",
                    textAlign: "left",
                  }}
                >
                  <th style={{ padding: 8, width: 32 }}>
                    <input
                      type="checkbox"
                      onChange={toggleAllVisible}
                      checked={
                        filtered.length > 0 &&
                        filtered.every((s) => selectedIds.includes(s.id))
                      }
                    />
                  </th>
                  <th style={{ padding: 8 }}>Name</th>
                  <th style={{ padding: 8 }}>Service Code</th>
                  <th style={{ padding: 8 }}>Type</th>
                  <th style={{ padding: 8 }}>Department</th>
                  <th style={{ padding: 8, textAlign: "right" }}>Price</th>
                  <th style={{ padding: 8 }}>Created Date</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => {
                  const selected = selectedIds.includes(s.id);
                  return (
                    <tr
                      key={s.id}
                      style={{
                        background: selected ? "#e6f4ef" : "transparent",
                      }}
                    >
                      <td
                        style={{
                          padding: 8,
                          borderTop: "1px solid #eee",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => toggleRow(s.id)}
                        />
                      </td>
                      <td
                        style={{
                          padding: 8,
                          borderTop: "1px solid #eee",
                        }}
                      >
                        {s.name}
                      </td>
                      <td
                        style={{
                          padding: 8,
                          borderTop: "1px solid #eee",
                        }}
                      >
                        {s.serviceCode ?? "-"}
                      </td>
                      <td
                        style={{
                          padding: 8,
                          borderTop: "1px solid #eee",
                        }}
                      >
                        {typeLabel(String(s.type))}
                      </td>
                      <td
                        style={{
                          padding: 8,
                          borderTop: "1px solid #eee",
                        }}
                      >
                        {s.department ?? "-"}
                      </td>
                      <td
                        style={{
                          padding: 8,
                          borderTop: "1px solid #eee",
                          textAlign: "right",
                        }}
                      >
                        Rs.{Number(s.price).toFixed(2)}
                      </td>
                      <td
                        style={{
                          padding: 8,
                          borderTop: "1px solid #eee",
                        }}
                      >
                        {new Date(s.createdAt).toLocaleDateString("en-GB")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* ---------- CREATE SERVICE MODAL ---------- */}
        {showCreate && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.25)",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              paddingTop: 40,
              zIndex: 999,
            }}
          >
            <div
              style={{
                width: "80%",
                maxWidth: 900,
                maxHeight: "85vh",
                overflowY: "auto",
                background: "#fff",
                borderRadius: 10,
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                padding: 24,
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
                <h2 style={{ margin: 0 }}>Create Service</h2>
                <button
                  onClick={() => {
                    setShowCreate(false);
                  }}
                  style={{
                    border: "none",
                    background: "transparent",
                    fontSize: 20,
                    cursor: "pointer",
                  }}
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              {/* Top row: service type */}
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Services</label>
                <select
                  style={inputStyle}
                  value={svcType}
                  onChange={(e) => setSvcType(e.target.value)}
                >
                  {TYPE_OPTIONS.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Name, code, units */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "2.3fr 1.2fr 1fr",
                  gap: 12,
                  marginBottom: 12,
                }}
              >
                <div>
                  <label style={labelStyle}>Name</label>
                  <input
                    style={inputStyle}
                    placeholder="Enter service name"
                    value={svcName}
                    onChange={(e) => setSvcName(e.target.value)}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Service Code</label>
                  <input
                    style={inputStyle}
                    placeholder="Service code"
                    value={svcCode}
                    onChange={(e) => setSvcCode(e.target.value)}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Units</label>
                  <select
                    style={inputStyle}
                    value={svcUnit}
                    onChange={(e) => setSvcUnit(e.target.value)}
                  >
                    <option value="pcs">pcs</option>
                    <option value="test">test</option>
                    <option value="session">session</option>
                  </select>
                </div>
              </div>

              {/* Price / tax / material / lab charge */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.4fr 1.4fr 1.4fr 1.4fr",
                  gap: 12,
                  marginBottom: 16,
                }}
              >
                <div>
                  <label style={labelStyle}>Clinic Price (Inc. Tax)</label>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span>Rs.</span>
                    <input
                      style={{ ...inputStyle, flex: 1 }}
                      type="number"
                      min={0}
                      value={clinicPrice}
                      onChange={(e) =>
                        setClinicPrice(Number(e.target.value) || 0)
                      }
                    />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Tax Percent</label>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <input
                      style={{ ...inputStyle, flex: 1 }}
                      type="number"
                      min={0}
                      value={taxPercent}
                      onChange={(e) =>
                        setTaxPercent(Number(e.target.value) || 0)
                      }
                    />
                    <span>%</span>
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Material Charge</label>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <input
                      style={{ ...inputStyle, flex: 1 }}
                      type="number"
                      min={0}
                      value={materialCharge}
                      onChange={(e) =>
                        setMaterialCharge(Number(e.target.value) || 0)
                      }
                    />
                    <span>%</span>
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Lab Charge</label>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span>Rs</span>
                    <input
                      style={{ ...inputStyle, flex: 1 }}
                      type="number"
                      min={0}
                      value={labCharge}
                      onChange={(e) =>
                        setLabCharge(Number(e.target.value) || 0)
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Clinic price without VAT */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>
                  Clinic Price:
                </div>
                <div style={{ fontSize: 13 }}>
                  Without VAT{" "}
                  <strong>Rs {clinicPriceWithoutVAT.toFixed(2)}</strong>
                </div>
              </div>

              {/* Service Provider Payable Rates */}
              <div style={{ marginTop: 20, marginBottom: 8, fontSize: 13 }}>
                <strong>Service Provider Payable Rates (Optional)</strong>
              </div>
              {providerRates.map((r) => (
                <div
                  key={r.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1.2fr 40px",
                    gap: 10,
                    marginBottom: 8,
                    alignItems: "flex-end",
                  }}
                >
                  <div>
                    <label style={labelStyle}>Service provider</label>
                    <select
                      style={inputStyle}
                      value={r.provider}
                      onChange={(e) =>
                        updateProviderRate(r.id, "provider", e.target.value)
                      }
                    >
                      <option value="">Service Provider</option>
                      <option value="Dr A">Dr A</option>
                      <option value="Dr B">Dr B</option>
                      <option value="Partner Lab">Partner Lab</option>
                    </select>
                  </div>

                  <div>
                    <label style={labelStyle}>Rate</label>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <div
                        style={{
                          display: "inline-flex",
                          border: "1px solid #0b7a53",
                          borderRadius: 4,
                          overflow: "hidden",
                          fontSize: 11,
                        }}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            updateProviderRate(r.id, "rateMode", "RS")
                          }
                          style={{
                            padding: "4px 8px",
                            border: "none",
                            cursor: "pointer",
                            background:
                              r.rateMode === "RS" ? "#0b7a53" : "transparent",
                            color: r.rateMode === "RS" ? "#fff" : "#0b7a53",
                          }}
                        >
                          RS.
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            updateProviderRate(r.id, "rateMode", "%")
                          }
                          style={{
                            padding: "4px 8px",
                            border: "none",
                            cursor: "pointer",
                            background:
                              r.rateMode === "%" ? "#0b7a53" : "transparent",
                            color: r.rateMode === "%" ? "#fff" : "#0b7a53",
                          }}
                        >
                          %
                        </button>
                      </div>

                      <input
                        style={{ ...inputStyle, flex: 1 }}
                        type="number"
                        min={0}
                        value={r.rateValue}
                        onChange={(e) =>
                          updateProviderRate(
                            r.id,
                            "rateValue",
                            Number(e.target.value) || 0
                          )
                        }
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeProviderRate(r.id)}
                    style={{
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                      fontSize: 20,
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={addProviderRate}
                style={{
                  marginTop: 4,
                  marginBottom: 16,
                  border: "none",
                  background: "transparent",
                  color: "#0b7a53",
                  fontSize: 13,
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Add serviceprovider payable rates
              </button>

              {/* Departments */}
              <div style={{ marginBottom: 4, fontSize: 13 }}>
                <strong>Add Department</strong>
              </div>
              {departments.map((d) => (
                <div
                  key={d.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 40px",
                    gap: 10,
                    marginBottom: 8,
                    alignItems: "flex-end",
                  }}
                >
                  <div>
                    <label style={labelStyle}>Select Department</label>
                    <select
                      style={inputStyle}
                      value={d.department}
                      onChange={(e) => updateDepartment(d.id, e.target.value)}
                    >
                      <option value="">Select department</option>
                      <option value="Pathology">Pathology</option>
                      <option value="Radiology">Radiology</option>
                      <option value="OPD">OPD</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeDepartment(d.id)}
                    style={{
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                      fontSize: 20,
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={addDepartment}
                style={{
                  marginTop: 4,
                  marginBottom: 20,
                  border: "none",
                  background: "transparent",
                  color: "#0b7a53",
                  fontSize: 13,
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Add Another
              </button>

              {/* Footer: errors + create another + buttons */}
              {saveError && (
                <div
                  style={{
                    marginBottom: 8,
                    color: "red",
                    fontSize: 13,
                  }}
                >
                  {saveError}
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 8,
                }}
              >
                <label style={{ fontSize: 13 }}>
                  <input
                    type="checkbox"
                    checked={createAnother}
                    onChange={(e) => setCreateAnother(e.target.checked)}
                    style={{ marginRight: 6 }}
                  />
                  Create another after save
                </label>

                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    type="button"
                    onClick={() => setShowCreate(false)}
                    style={{
                      padding: "8px 16px",
                      borderRadius: 4,
                      border: "none",
                      background: "transparent",
                      color: "#4b5563",
                      cursor: "pointer",
                    }}
                    disabled={saving}
                  >
                    CANCEL
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveService}
                    style={{
                      padding: "8px 20px",
                      borderRadius: 4,
                      border: "none",
                      background: "#0b7a53",
                      color: "#fff",
                      fontWeight: 600,
                      cursor: "pointer",
                      opacity: saving ? 0.7 : 1,
                    }}
                    disabled={saving}
                  >
                    {saving ? "SAVING..." : "SAVE"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// shared styles
const labelStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  marginBottom: 4,
  display: "block",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "6px 8px",
  borderRadius: 4,
  border: "1px solid #d1d5db",
  fontSize: 13,
  boxSizing: "border-box",
};
