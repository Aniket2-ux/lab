import { Suspense } from "react";
import OpdClient from "./OpdClient";

export default function OpdPage() {
  return (
    <Suspense fallback={<div style={{ padding: 20 }}>Loading OPD…</div>}>
      <OpdClient />
    </Suspense>
  );
}
