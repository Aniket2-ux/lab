import { apiClient } from "./apiClient";

export type DashboardSummary = {
  totalAmount: number;
  invoiceCount: number;
};

export async function fetchDashboardSummary() {
  return apiClient<DashboardSummary>("/api/dashboard/summary");
}
