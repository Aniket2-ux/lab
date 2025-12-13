// frontend/src/lib/patientReports.ts
import { apiClient } from "./apiClient";

// later we will make a better type
export type AppointmentReportRow = any;

type AppointmentFilters = {
  from?: string;
  to?: string;
  departmentId?: string;
  providerId?: string;
  clientId?: string;
  status?: string;
  publicOnly?: boolean;
};

export async function fetchAppointmentReport(
  filters: AppointmentFilters = {}
) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, String(value));
    }
  });

  const query = params.toString();
  const path = `/api/reports/patient/appointments${
    query ? `?${query}` : ""
  }`;

  // backend should return { data: [] }
  return apiClient<{ data: AppointmentReportRow[]; filters?: any }>(path);
}
