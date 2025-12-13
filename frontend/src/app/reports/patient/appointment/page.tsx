"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import HeaderBar from "@/components/HeaderBar";
import BackButton from "@/components/BackButton";
import { fetchAppointmentReport } from "@/lib/patientReports";

const AppointmentReportPage: React.FC = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      // you can pass filters here later
      const res = await fetchAppointmentReport({});
      setRows(res.data || []);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to load report");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // load once when page opens
    loadData();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <HeaderBar pageTitle="Reports" />

        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <BackButton className="mb-4" />

          <h1 className="mb-4 text-2xl font-semibold tracking-tight text-gray-800">
            Appointment Report
          </h1>

          {/* Filter bar */}
          <section className="mb-6 rounded-md bg-gray-100 p-4 md:p-6">
            <div className="grid gap-4 md:grid-cols-4">
              {/* Period */}
              <div className="flex flex-col text-sm md:col-span-2">
                <span className="mb-1 text-gray-600">Period</span>
                <div className="flex items-center gap-2">
                  <input
                    type="datetime-local"
                    className="h-9 flex-1 rounded-md border border-gray-300 bg-white px-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                  <span>-</span>
                  <input
                    type="datetime-local"
                    className="h-9 flex-1 rounded-md border border-gray-300 bg-white px-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Department */}
              <div className="flex flex-col text-sm">
                <span className="mb-1 text-gray-600">Select Department</span>
                <select className="h-9 rounded-md border border-gray-300 bg-white px-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500">
                  <option>Patho</option>
                  <option>OPD</option>
                  <option>All</option>
                </select>
              </div>

              {/* Service provider */}
              <div className="flex flex-col text-sm">
                <span className="mb-1 text-gray-600">Service provider</span>
                <select className="h-9 rounded-md border border-gray-300 bg-white px-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500">
                  <option>All</option>
                </select>
              </div>

              {/* Booking status */}
              <div className="flex flex-col text-sm">
                <span className="mb-1 text-gray-600">Booking Status</span>
                <select className="h-9 rounded-md border border-gray-300 bg-white px-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500">
                  <option>All</option>
                  <option>Booked</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>
              </div>

              {/* Services */}
              <div className="flex flex-col text-sm">
                <span className="mb-1 text-gray-600">Services</span>
                <select className="h-9 rounded-md border border-gray-300 bg-white px-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500">
                  <option>Services</option>
                </select>
              </div>

              {/* Clients */}
              <div className="flex flex-col text-sm">
                <span className="mb-1 text-gray-600">Clients</span>
                <select className="h-9 rounded-md border border-gray-300 bg-white px-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500">
                  <option>Clients</option>
                </select>
              </div>

              {/* Show public only */}
              <div className="flex flex-col justify-end text-sm md:col-span-1">
                <label className="flex items-center gap-2 text-gray-700">
                  <input type="checkbox" className="h-4 w-4" />
                  Show Public Only
                </label>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => loadData()}
                className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-700"
              >
                {loading ? "LOADING..." : "APPLY FILTER"}
              </button>
            </div>
          </section>

          {/* Table */}
          <section className="rounded-md bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  <tr>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Service Provider</th>
                    <th className="px-4 py-3">Date-Time</th>
                    <th className="px-4 py-3">Services</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        className="px-4 py-8 text-center text-gray-500"
                        colSpan={6}
                      >
                        Loading...
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td
                        className="px-4 py-8 text-center text-red-500"
                        colSpan={6}
                      >
                        {error}
                      </td>
                    </tr>
                  ) : rows.length === 0 ? (
                    <tr>
                      <td
                        className="px-4 py-8 text-center text-gray-500"
                        colSpan={6}
                      >
                        No items to show.
                      </td>
                    </tr>
                  ) : (
                    rows.map((row: any, index: number) => (
                      <tr key={index} className="border-t">
                        <td className="px-4 py-2">
                          {row.client?.name || row.customer || "-"}
                        </td>
                        <td className="px-4 py-2">
                          {row.serviceProvider?.name ||
                            row.serviceProviderName ||
                            "-"}
                        </td>
                        <td className="px-4 py-2">
                          {row.dateTime || row.date || "-"}
                        </td>
                        <td className="px-4 py-2">
                          {row.serviceName || row.services || "-"}
                        </td>
                        <td className="px-4 py-2">
                          {row.status || "-"}
                        </td>
                        <td className="px-4 py-2">
                          {row.remarks || "-"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AppointmentReportPage;
