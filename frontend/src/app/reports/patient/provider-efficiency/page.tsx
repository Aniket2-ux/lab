"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";
import HeaderBar from "@/components/HeaderBar";
import BackButton from "@/components/BackButton";

const ServiceProviderEfficiencyReportPage: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <HeaderBar pageTitle="Reports" />

        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <BackButton className="mb-4" />

          <h1 className="mb-4 text-2xl font-semibold tracking-tight text-gray-800">
            Service Provider Efficiency Report
          </h1>

          {/* Filter bar */}
          <section className="mb-6 rounded-md bg-gray-100 p-4 md:p-6">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Period */}
              <div className="flex flex-col text-sm">
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
                  <option>All</option>
                  <option>Patho</option>
                  <option>OPD</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-700">
                APPLY FILTER
              </button>
            </div>
          </section>

          {/* Table */}
          <section className="rounded-md bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  <tr>
                    <th className="px-4 py-3">Service Provider Name</th>
                    <th className="px-4 py-3">Registration Number</th>
                    <th className="px-4 py-3">Department</th>
                    <th className="px-4 py-3">New Client</th>
                    <th className="px-4 py-3">Old Client</th>
                    <th className="px-4 py-3">Follow Up Client</th>
                    <th className="px-4 py-3">Total Clients</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      className="px-4 py-8 text-center text-gray-500"
                      colSpan={7}
                    >
                      No items to show.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ServiceProviderEfficiencyReportPage;
