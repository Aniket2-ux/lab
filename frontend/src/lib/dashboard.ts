import { apiClient } from "@/lib/apiClient";

export type DashboardSummary = {
  todaySales: number;
  totalSales: number;
};

export async function fetchDashboardSummary() {
  return apiClient<DashboardSummary>(
    "/api/billing/summary"
  );
}
