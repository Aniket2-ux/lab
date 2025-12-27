// frontend/src/lib/dashboard.ts

import { apiClient } from "@/lib/apiClient";

export type DashboardSummary = {
  todaySales: number;
  totalSales: number;
};

export async function fetchDashboardSummary() {
  return apiClient.get<DashboardSummary>("/api/billing/summary");
}
