"use client";
import React from "react";

export default function AppPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh", // prevents browser body scrolling
        overflow: "hidden",
        width: "100%",
      }}
    >
      {children}
    </div>
  );
}
