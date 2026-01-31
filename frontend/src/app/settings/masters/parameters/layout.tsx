import { ReactNode } from "react";

export default function ParameterLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div style={{ display: "flex", height: "100%" }}>{children}</div>;
}
