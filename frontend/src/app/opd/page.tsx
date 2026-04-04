"use client";

import { Suspense } from "react";
import OPDContent from "./OPDContent";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OPDContent />
    </Suspense>
  );
}