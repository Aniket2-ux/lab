"use client";

import { useEffect, useState, useRef } from "react";
import type React from "react";
import Sidebar from "../../components/Sidebar";
import HeaderBar from "../../components/HeaderBar";
import CreateClientDrawer from "../../components/CreateClientDrawer";


/* ------------ Types ------------ */

type BillItem = {
  id: number;
  description: string;
  dept: string;
  qty: number;
  unit: string;
  rate: number;
};

type DiscountMode = "%" | "Rs";

type Client = {
  id: number;
  fullName: string;
  age: number | null;
  gender: string | null;
  phone: string | null;
};

/* ------------ Billing Page ------------ */

export default function BillingPage() {
  // client + referrer etc.
  const [clientName, setClientName] = useState("WalkIn Customer");
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);

  const [issueDate, setIssueDate] = useState<string>(() => {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  });
  const [referrer, setReferrer] = useState("");

  // items
  const [items, setItems] = useState<BillItem[]>([
    {
      id: 1,
      description: "",
      dept: "",
      qty: 1,
      unit: "pcs",
      rate: 0,
    },
  ]);

  const [remindValue, setRemindValue] = useState(0);
  const [remindUnit, setRemindUnit] = useState<
    "DAYS" | "WEEK" | "MONTH" | "YEARS"
  >("DAYS");

  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [remarks, setRemarks] = useState("");

  const [discountMode, setDiscountMode] = useState<DiscountMode>("%");
  const [discountValue, setDiscountValue] = useState(0);
  const [roundingOff, setRoundingOff] = useState(0);

  const [paidAll, setPaidAll] = useState(true);
  const [tenderAmount, setTenderAmount] = useState(0);

  const [message, setMessage] = useState("");

  // --- client search state ---
  const [allClients, setAllClients] = useState<Client[]>([]);
  const [clientSearch, setClientSearch] = useState("");
  const [clientDropdownOpen, setClientDropdownOpen] = useState(false);
  const [createClientOpen, setCreateClientOpen] = useState(false);

  // load clients once
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/clients");
        if (!res.ok) throw new Error("HTTP " + res.status);
        const data: Client[] = await res.json();
        setAllClients(data);
      } catch (e) {
        console.error("Failed to load clients for billing", e);
      }
    };
    load();
  }, []);

  // ===== derived values =====
  const grossTotal = items.reduce(
    (sum, it) => sum + (Number(it.qty) || 0) * (Number(it.rate) || 0),
    0
  );

  const discountAmount =
    discountMode === "%"
      ? (grossTotal * (Number(discountValue) || 0)) / 100
      : Number(discountValue) || 0;

  const taxableAmount = Math.max(grossTotal - discountAmount, 0);
  const totalAmount = taxableAmount + (Number(roundingOff) || 0);
  const changeAmount = paidAll
    ? Math.max((Number(tenderAmount) || 0) - totalAmount, 0)
    : 0;

  const totalInWords =
    totalAmount === 0
      ? "Zero rupees"
      : `Approximately Rs. ${totalAmount.toFixed(2)}`;

  // ===== item handlers =====
  const handleItemChange = (
    id: number,
    field: keyof BillItem,
    value: string | number
  ) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, [field]: value } : it))
    );
  };

  const addItemRow = () => {
    setItems((prev) => [
      ...prev,
      {
        id: prev.length ? prev[prev.length - 1].id + 1 : 1,
        description: "",
        dept: "",
        qty: 1,
        unit: "pcs",
        rate: 0,
      },
    ]);
  };

  const removeItemRow = (id: number) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  // ===== billing actions (still demo) =====
  const handleSaveDraft = () => {
    console.log({
      selectedClientId,
      clientName,
      issueDate,
      referrer,
      items,
      grossTotal,
      discountMode,
      discountValue,
      taxableAmount,
      roundingOff,
      totalAmount,
      tenderAmount,
      changeAmount,
      paymentMethod,
      remarks,
    });
    setMessage("Bill saved as draft (demo only, not yet connected to backend).");
  };

  const handleFinalise = () => {
    setMessage("Finalise invoice clicked (demo action).");
  };

  const handleFinaliseAndPrint = () => {
    setMessage("Finalise & print clicked (demo action).");
  };

  // ===== client dropdown logic =====
  const clientFieldRef = useRef<HTMLDivElement | null>(null);

  // close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!clientFieldRef.current) return;
      if (!clientFieldRef.current.contains(e.target as Node)) {
        setClientDropdownOpen(false);
      }
    }
    if (clientDropdownOpen) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [clientDropdownOpen]);

  const filteredClients = allClients.filter((c) => {
    if (!clientSearch.trim()) return true;
    const term = clientSearch.toLowerCase();
    return (
      c.fullName.toLowerCase().includes(term) ||
      (c.phone || "").toLowerCase().includes(term)
    );
  });

  const handleSelectClient = (c: Client) => {
    setSelectedClientId(c.id);
    setClientName(c.fullName);
    setClientSearch("");
    setClientDropdownOpen(false);
  };

  const handleAddClientClick = () => {
    setCreateClientOpen(true);
    setClientDropdownOpen(false);
  };

  const handleClientCreated = (c: any) => {
    // new client from CreateClientDrawer (shared component)
    setAllClients((prev) => [c, ...prev]);
    handleSelectClient(c);
    setCreateClientOpen(false);
  };

  const showNameInInput = clientDropdownOpen
    ? clientSearch
    : clientName || "";

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Left vertical sidebar */}
      <Sidebar />

      {/* Main content */}
      <main
        style={{
          flex: 1,
          padding: 24,
          background: "#f5f7fb",
          overflowY: "auto",
        }}
      >
        <HeaderBar pageTitle="Billing" />

        {/* WHITE MAIN BILL CARD */}
        <div
          style={{
            background: "#fff",
            borderRadius: 10,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            padding: 20,
            marginBottom: 16,
          }}
        >
          {/* Top row: client + date + referrer  /  invoice summary */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 24,
              marginBottom: 18,
            }}
          >
            {/* LEFT: client, date, referrer */}
            <div style={{ flex: 1.2 }}>
              {/* Client – SEARCHABLE DROPDOWN */}
              <div style={{ marginBottom: 10 }} ref={clientFieldRef}>
                <label style={labelStyle}>Client</label>
                <div style={{ position: "relative" }}>
                  <input
                    style={{ ...inputStyle, width: "100%" }}
                    value={showNameInInput}
                    onChange={(e) => {
                      setClientSearch(e.target.value);
                      setClientDropdownOpen(true);
                    }}
                    onFocus={() => setClientDropdownOpen(true)}
                    placeholder="Search or type client..."
                  />
                  {/* Cancel to reset to WalkIn */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedClientId(null);
                      setClientName("WalkIn Customer");
                      setClientSearch("");
                    }}
                    style={{
                      position: "absolute",
                      right: 4,
                      top: "50%",
                      transform: "translateY(-50%)",
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                      fontSize: 16,
                      color: "#6b7280",
                    }}
                    title="Clear selection"
                  >
                    ×
                  </button>

                  {clientDropdownOpen && (
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: "100%",
                        marginTop: 4,
                        background: "#ffffff",
                        borderRadius: 6,
                        boxShadow: "0 8px 16px rgba(0,0,0,0.12)",
                        maxHeight: 260,
                        overflowY: "auto",
                        zIndex: 20,
                        fontSize: 13,
                      }}
                    >
                      {filteredClients.length === 0 && (
                        <div
                          style={{
                            padding: "8px 10px",
                            color: "#6b7280",
                          }}
                        >
                          No clients match.
                        </div>
                      )}

                      {filteredClients.map((c) => (
                        <div
                          key={c.id}
                          onClick={() => handleSelectClient(c)}
                          style={{
                            padding: "8px 10px",
                            cursor: "pointer",
                            borderBottom: "1px solid #f3f4f6",
                            background:
                              c.id === selectedClientId
                                ? "#e0f2fe"
                                : "#ffffff",
                          }}
                        >
                          <div style={{ fontWeight: 600 }}>{c.fullName}</div>
                          <div
                            style={{
                              fontSize: 11,
                              color: "#6b7280",
                            }}
                          >
                            {c.id}{" "}
                            {c.age != null ? `, ${c.age} Y` : ""}{" "}
                            {c.gender ? ` / ${c.gender}` : ""}
                          </div>
                        </div>
                      ))}

                      {/* Add "xxx" row */}
                      <div
                        onClick={handleAddClientClick}
                        style={{
                          padding: "8px 10px",
                          cursor: "pointer",
                          borderTop: "1px solid #e5e7eb",
                          background: "#f9fafb",
                          fontWeight: 500,
                          color: "#0b7a53",
                        }}
                      >
                        Add "{clientSearch || clientName || "client"}"
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Issue date */}
              <div style={{ marginBottom: 10 }}>
                <label style={labelStyle}>Issue Date</label>
                <input
                  type="date"
                  style={inputStyle}
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                />
              </div>

              {/* Referrer */}
              <div style={{ marginBottom: 10 }}>
                <label style={labelStyle}>Referrer</label>
                <input
                  style={inputStyle}
                  value={referrer}
                  onChange={(e) => setReferrer(e.target.value)}
                  placeholder="Referrer select or create..."
                />
              </div>
            </div>

            {/* RIGHT: invoice summary */}
            <div
              style={{
                flex: 0.8,
                fontSize: 12,
                display: "grid",
                gridTemplateColumns: "1.1fr 1.3fr",
                rowGap: 8,
                columnGap: 10,
                alignItems: "center",
              }}
            >
              <span style={{ fontWeight: 600 }}>Invoice Number</span>
              <span>2028SL-GDL-2606</span>

              <span style={{ fontWeight: 600 }}>Insurance no.</span>
              <input style={inputStyle} placeholder="Insurance no." />

              <span style={{ fontWeight: 600 }}>Claim code</span>
              <input style={inputStyle} placeholder="Claim code" />
            </div>
          </div>

          {/* Tabs row (Delivered / Item) */}
          <div
            style={{
              display: "flex",
              gap: 16,
              fontSize: 13,
              marginBottom: 10,
              borderBottom: "1px solid #e5e7eb",
              paddingBottom: 4,
            }}
          >
            <div style={{ fontWeight: 600, borderBottom: "2px solid #0b7a53" }}>
              DELIVERED
            </div>
            <div style={{ color: "#6b7280" }}>ITEM</div>
          </div>

          {/* Items + right totals column */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 16,
            }}
          >
            {/* LEFT: item row area */}
            <div style={{ flex: 1.4 }}>
              {/* Delivered checkbox row */}
              <div
                style={{ display: "flex", alignItems: "center", marginBottom: 8 }}
              >
                <input type="checkbox" defaultChecked style={{ marginRight: 6 }} />
                <span style={{ fontSize: 13 }}>Delivered</span>
              </div>

              {/* Table header */}
              <div
                style={{
                  background: "#f9fafb",
                  borderRadius: 6,
                  padding: "8px 10px",
                  fontSize: 12,
                  fontWeight: 600,
                  display: "grid",
                  gridTemplateColumns:
                    "5fr 1.3fr 0.8fr 1fr 1.3fr 1.3fr 40px",
                  columnGap: 6,
                  marginBottom: 6,
                }}
              >
                <div>Description / Product</div>
                <div style={{ textAlign: "center" }}>DEPT</div>
                <div style={{ textAlign: "center" }}>QTY</div>
                <div style={{ textAlign: "center" }}>UNIT</div>
                <div style={{ textAlign: "center" }}>RATE/QTY</div>
                <div style={{ textAlign: "center" }}>AMOUNT</div>
                <div></div>
              </div>

              {/* Item rows */}
              {items.map((item) => {
                const rowAmount =
                  (Number(item.qty) || 0) * (Number(item.rate) || 0);

                return (
                  <div
                    key={item.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "5fr 1.3fr 0.8fr 1fr 1.3fr 1.3fr 40px",
                      columnGap: 6,
                      marginBottom: 6,
                    }}
                  >
                    <input
                      style={inputStyle}
                      placeholder="Enter description or select a product"
                      value={item.description}
                      onChange={(e) =>
                        handleItemChange(
                          item.id,
                          "description",
                          e.target.value
                        )
                      }
                    />
                    <select
                      style={inputStyle}
                      value={item.dept}
                      onChange={(e) =>
                        handleItemChange(item.id, "dept", e.target.value)
                      }
                    >
                      <option value="">Dept</option>
                      <option value="Lab">Lab</option>
                      <option value="Radiology">Radiology</option>
                    </select>
                    <input
                      style={inputStyle}
                      type="number"
                      min={1}
                      value={item.qty}
                      onChange={(e) =>
                        handleItemChange(
                          item.id,
                          "qty",
                          Number(e.target.value) || 0
                        )
                      }
                    />
                    <select
                      style={inputStyle}
                      value={item.unit}
                      onChange={(e) =>
                        handleItemChange(item.id, "unit", e.target.value)
                      }
                    >
                      <option value="pcs">pcs</option>
                      <option value="test">test</option>
                    </select>
                    <input
                      style={inputStyle}
                      type="number"
                      min={0}
                      value={item.rate}
                      onChange={(e) =>
                        handleItemChange(
                          item.id,
                          "rate",
                          Number(e.target.value) || 0
                        )
                      }
                    />
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 13,
                        border: "1px solid #e5e7eb",
                        borderRadius: 4,
                        background: "#f9fafb",
                      }}
                    >
                      Rs. {rowAmount.toFixed(2)}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItemRow(item.id)}
                      style={{
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        color: "#dc2626",
                        fontSize: 18,
                      }}
                      title="Remove row"
                    >
                      ×
                    </button>
                  </div>
                );
              })}

              {/* Add item button */}
              <button
                type="button"
                onClick={addItemRow}
                style={{
                  marginTop: 8,
                  padding: "8px 14px",
                  borderRadius: 4,
                  border: "1px solid #0b7a53",
                  background: "#e6f4ef",
                  color: "#0b7a53",
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                ADD BILL ITEM
              </button>
            </div>

            {/* RIGHT: totals column */}
            <div
              style={{
                flex: 0.9,
                fontSize: 13,
                display: "grid",
                rowGap: 8,
              }}
            >
              <RowLabelValue label="Gross total amount" value={grossTotal} />

              {/* Discount */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.4fr 3fr",
                  alignItems: "center",
                  columnGap: 6,
                }}
              >
                <span style={{ color: "#4b5563" }}>Discount</span>
                <div style={{ display: "flex", gap: 6 }}>
                  <select
                    style={{ ...inputStyle, width: 70 }}
                    value={discountMode}
                    onChange={(e) =>
                      setDiscountMode(e.target.value as DiscountMode)
                    }
                  >
                    <option value="%">%</option>
                    <option value="Rs">Rs</option>
                  </select>
                  <input
                    style={{ ...inputStyle, flex: 1 }}
                    type="number"
                    min={0}
                    value={discountValue}
                    onChange={(e) =>
                      setDiscountValue(Number(e.target.value) || 0)
                    }
                  />
                </div>
              </div>

              <RowLabelValue label="Taxable Amount" value={taxableAmount} />

              {/* Rounding Off */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.4fr 3fr",
                  alignItems: "center",
                  columnGap: 6,
                }}
              >
                <span style={{ color: "#4b5563" }}>Rounding Off</span>
                <input
                  style={inputStyle}
                  type="number"
                  value={roundingOff}
                  onChange={(e) =>
                    setRoundingOff(Number(e.target.value) || 0)
                  }
                />
              </div>

              <RowLabelValue label="Total Amount" value={totalAmount} bold />

              <div style={{ fontSize: 12, color: "#6b7280" }}>
                {totalInWords}
              </div>

              {/* Paid All */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginTop: 6,
                }}
              >
                <input
                  type="checkbox"
                  checked={paidAll}
                  onChange={(e) => setPaidAll(e.target.checked)}
                />
                <span>Paid All</span>
              </div>

              {/* Tender & change */}
              <RowLabelInput
                label="Tender Amount"
                value={tenderAmount}
                onChange={(v) => setTenderAmount(v)}
              />

              <RowLabelValue label="Change Amount" value={changeAmount} />
            </div>
          </div>

          {/* Remind + payment + remarks (under items) */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 40,
              marginTop: 20,
            }}
          >
            {/* Left tools */}
            <div style={{ flex: 1.4, fontSize: 13 }}>
              {/* Remind on */}
              <div style={{ marginBottom: 12 }}>
                <div style={{ marginBottom: 6, fontWeight: 600 }}>Remind On</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <button
                    type="button"
                    onClick={() =>
                      setRemindValue((v) => Math.max(v - 1, 0))
                    }
                    style={circleButton}
                  >
                    -
                  </button>
                  <input
                    style={{ ...inputStyle, width: 60, textAlign: "center" }}
                    type="number"
                    min={0}
                    value={remindValue}
                    onChange={(e) =>
                      setRemindValue(Math.max(Number(e.target.value) || 0, 0))
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setRemindValue((v) => v + 1)}
                    style={circleButton}
                  >
                    +
                  </button>

                  {(["DAYS", "WEEK", "MONTH", "YEARS"] as const).map((u) => (
                    <button
                      key={u}
                      type="button"
                      onClick={() => setRemindUnit(u)}
                      style={{
                        padding: "5px 10px",
                        borderRadius: 4,
                        border:
                          remindUnit === u
                            ? "1px solid #0b7a53"
                            : "1px solid #e5e7eb",
                        background:
                          remindUnit === u ? "#e6f4ef" : "#ffffff",
                        fontSize: 11,
                        cursor: "pointer",
                      }}
                    >
                      {u}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment method */}
              <div style={{ marginBottom: 12 }}>
                <div style={{ marginBottom: 4, fontWeight: 600 }}>
                  Payment method
                </div>
                <select
                  style={{ ...inputStyle, width: 200 }}
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option>Cash</option>
                  <option>Card</option>
                  <option>Online</option>
                </select>
              </div>

              {/* Remarks */}
              <div>
                <div style={{ marginBottom: 4, fontWeight: 600 }}>Remarks</div>
                <textarea
                  style={{ ...inputStyle, minHeight: 80 }}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Any notes or instructions..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ACTION BAR */}
        <div
          style={{
            position: "sticky",
            bottom: 0,
            left: 0,
            right: 0,
            marginLeft: -24,
            marginRight: -24,
            padding: "10px 24px",
            background: "#ffffff",
            borderTop: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 13,
          }}
        >
          <div>
            <strong>Total Amount:</strong> Rs. {totalAmount.toFixed(2)}
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button type="button" style={bottomButtonMuted}>
              PAY USING QR CODE
            </button>
            <button type="button" style={bottomButtonMuted}>
              PAY WITH NEPAL PAY
            </button>
            <button type="button" style={bottomButtonMuted}>
              PRINT PREVIEW
            </button>
            <button
              type="button"
              style={bottomButtonGreen}
              onClick={handleSaveDraft}
            >
              SAVE AS DRAFT
            </button>
            <button
              type="button"
              style={bottomButtonMuted}
              onClick={handleFinalise}
            >
              FINALISE INVOICE
            </button>
            <button
              type="button"
              style={bottomButtonMuted}
              onClick={handleFinaliseAndPrint}
            >
              FINALISE AND PRINT
            </button>
          </div>
        </div>

        {message && (
          <div style={{ marginTop: 8, fontSize: 13, color: "#2e7d32" }}>
            {message}
          </div>
        )}

        {/* Right side Create Client drawer (shared component) */}
        {createClientOpen && (
          <CreateClientDrawer
            onClose={() => setCreateClientOpen(false)}
            onCreated={handleClientCreated}
            initialName={
              clientSearch ||
              (clientName === "WalkIn Customer" ? "" : clientName)
            }
          />
        )}
      </main>
    </div>
  );
}

/* ------------ Small helper components ------------ */

function RowLabelValue({
  label,
  value,
  bold,
}: {
  label: string;
  value: number;
  bold?: boolean;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1.4fr 3fr",
        alignItems: "center",
        columnGap: 6,
      }}
    >
      <span style={{ color: "#4b5563" }}>{label}</span>
      <div
        style={{
          ...inputStyle,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          border: "1px solid #e5e7eb",
          background: "#f9fafb",
          fontWeight: bold ? 700 : 500,
        }}
      >
        Rs. {value.toFixed(2)}
      </div>
    </div>
  );
}

function RowLabelInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1.4fr 3fr",
        alignItems: "center",
        columnGap: 6,
      }}
    >
      <span style={{ color: "#4b5563" }}>{label}</span>
      <input
        style={inputStyle}
        type="number"
        min={0}
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
      />
    </div>
  );
}

/* ------------ shared styles ------------ */

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

const circleButton: React.CSSProperties = {
  width: 28,
  height: 28,
  borderRadius: "50%",
  border: "1px solid #d1d5db",
  background: "#ffffff",
  cursor: "pointer",
  fontSize: 16,
};

const bottomButtonMuted: React.CSSProperties = {
  padding: "8px 14px",
  borderRadius: 4,
  border: "1px solid #e5e7eb",
  background: "#f9fafb",
  color: "#374151",
  fontSize: 12,
  cursor: "pointer",
  whiteSpace: "nowrap",
};

const bottomButtonGreen: React.CSSProperties = {
  padding: "8px 14px",
  borderRadius: 4,
  border: "none",
  background: "#0b7a53",
  color: "#ffffff",
  fontSize: 12,
  fontWeight: 600,
  cursor: "pointer",
  whiteSpace: "nowrap",
};
