import { ReactNode } from "react";

export default function SampleTypeLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div style={{ display: "flex", height: "100%" }}>{children}</div>;
}
