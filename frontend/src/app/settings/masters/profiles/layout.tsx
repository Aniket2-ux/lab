import { ReactNode } from "react";

export default function ProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div style={{ display: "flex", height: "100%" }}>{children}</div>;
}
