"use client";

import UsersTabs from "./UsersTabs";

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 16 }}>Users</h2>
      <UsersTabs />
      <div style={{ marginTop: 24 }}>{children}</div>
    </div>
  );
}
