export default function BookableResourcePage() {
  return (
    <div style={card}>
      <h3>Bookable Resources</h3>
      <p style={{ color: "#777" }}>
        No bookable resources configured.
      </p>
    </div>
  );
}

const card = {
  background: "#fff",
  padding: 24,
  borderRadius: 10,
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
};
