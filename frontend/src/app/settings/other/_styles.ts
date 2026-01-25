export const box = {
  background: "#fff",
  borderRadius: 10,
  padding: 24,
  maxWidth: 1000,
};

export const input = {
  padding: 8,
  width: 220,
  marginTop: 8,
};

export const button = {
  padding: "8px 16px",
  background: "#16a34a",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};

export const grid3 = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 12,
};

export const checkbox = {
  display: "flex",
  gap: 8,
  marginBottom: 8,
};

export const twoCol = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 40,
};

export const table = {
  width: "100%",
  marginTop: 20,
  borderCollapse: "collapse" as const,
};
