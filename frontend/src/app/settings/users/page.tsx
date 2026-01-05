"use client";

export default function AllUsersPage() {
  return (
    <div style={card}>
      <h3>All Active Users (0)</h3>
      <p style={muted}>No records found.</p>
    </div>
  );
}

const card = {
  background: "#fff",
  padding: 24,
  borderRadius: 10,
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
};

const muted = { color: "#777" };
