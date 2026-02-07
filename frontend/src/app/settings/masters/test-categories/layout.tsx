export default function TestCategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ padding: 24 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h2>Test Categories</h2>
        <a
          href="/settings/masters/test-categories/create"
          style={{
            background: "#16a34a",
            color: "#fff",
            padding: "10px 16px",
            borderRadius: 6,
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          + CREATE CATEGORY
        </a>
      </div>

      {children}
    </div>
  );
}
