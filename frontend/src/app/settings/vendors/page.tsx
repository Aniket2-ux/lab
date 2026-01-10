"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function VendorsPage() {
  const pathname = usePathname();

  const tabs = [
    { name: "SUPPLIER", link: "/settings/vendors/supplier" },
    { name: "REFERRERS", link: "/settings/vendors/referrers" },
    { name: "ASSOCIATE COMPANIES", link: "/settings/vendors/associateCompanies" }
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Vendors</h2>

      <div style={{ display: "flex", borderBottom: "1px solid #ccc" }}>
        {tabs.map((t) => (
          <Link
            key={t.link}
            href={t.link}
            style={{
              padding: "12px 20px",
              borderBottom: pathname === t.link ? "3px solid green" : "3px solid transparent",
              fontWeight: pathname === t.link ? "bold" : "normal"
            }}
          >
            {t.name}
          </Link>
        ))}
      </div>

      <p style={{ marginTop: 40 }}>
        Select a tab above to view Supplier, Referrer, or Associate Company data.
      </p>
    </div>
  );
}
