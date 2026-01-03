"use client";

import UsersTabs from "./UsersTabs";

export default function UsersPage() {
  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 16 }}>Users</h2>
      <UsersTabs />
    </div>
  );
}
