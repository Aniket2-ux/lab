"use client";

export default function ServiceProvidersPage() {
  return (
    <div style={card}>
      <h3>Service Providers (0)</h3>
      <p style={{ color: "#777" }}>
        No service providers found.
      </p>

      <button style={primaryBtn}>
        CREATE SERVICE PROVIDER
      </button>
    </div>
  );
}

const card = {
  background: "#fff",
  padding: 24,
  borderRadius: 10,
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
};

const primaryBtn = {
  marginTop: 16,
  background: "#198754",
  color: "#fff",
  border: "none",
  padding: "10px 18px",
  borderRadius: 6,
  cursor: "pointer",
};
