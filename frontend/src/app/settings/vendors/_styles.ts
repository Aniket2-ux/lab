export const box = {
  background: "#fff",
  borderRadius: 10,
  padding: 24,
  maxWidth: 1100,
};

export const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 24,
};

export const input = {
  padding: 8,
  width: 240,
};

export const button = {
  background: "#16a34a",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  borderRadius: 6,
  cursor: "pointer",
  fontSize: 13,
};

export const table = {
  width: "100%",
  borderCollapse: "collapse" as const,
  marginTop: 20,
};

export const th = {
  textAlign: "left" as const,
  fontSize: 12,
  color: "#6b7280",
};

export const td = {
  padding: "14px 0",
  borderTop: "1px solid #e5e7eb",
  fontSize: 14,
};

export const drawer = {
  position: "fixed" as const,
  right: 0,
  top: 0,
  bottom: 0,
  width: 520,
  background: "#fff",
  padding: 24,
  boxShadow: "-10px 0 30px rgba(0,0,0,0.15)",
  zIndex: 50,
};
