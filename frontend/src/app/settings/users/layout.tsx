"use client";

import type { ReactNode } from "react";
import UsersTabs from "./UsersTabs";

export default function UsersLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <UsersTabs />

      <div style={{ marginTop: 20 }}>
        {children}
      </div>
    </div>
  );
}
