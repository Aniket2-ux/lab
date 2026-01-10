"use client";

export default function VendorTable({ data, type }: any) {
  return (
    <table style={{ width: "100%", marginTop: 20, borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ background: "#f5f5f5" }}>
          <th>Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr><td colSpan={4} style={{ textAlign: "center", padding: 20 }}>No records found</td></tr>
        ) : (
          data.map((v: any, i: number) => (
            <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
              <td>{v.name}</td>
              <td>{v.phone}</td>
              <td>{v.email}</td>
              <td>{v.address}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
