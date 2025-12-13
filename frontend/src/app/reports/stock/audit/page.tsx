"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";
import HeaderBar from "@/components/HeaderBar";
import BackButton from "@/components/BackButton";

const StockAuditReportPage: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <HeaderBar pageTitle="Reports" />

        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {/* Back button */}
          <BackButton className="mb-4" />
           

          {/* Title */}
          <h1 className="mb-4 text-2xl font-semibold tracking-tight text-gray-800">
            Stock Audit Report
          </h1>

          {/* Filter bar */}
          <section className="mb-6 rounded-md bg-gray-100 p-4 md:p-6">
            <div className="grid gap-4 md:grid-cols-4">
              {/* Filter by product nature */}
              <div className="flex flex-col text-sm">
                <span className="mb-1 text-gray-600">
                  Filter By Product Nature
                </span>
                <select className="h-9 rounded-md border border-gray-300 bg-white px-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500">
                  <option>Sellable</option>
                  <option>Non-sellable</option>
                  <option>All</option>
                </select>

                <label className="mt-2 flex items-center gap-2 text-xs text-gray-700">
                  <input type="checkbox" className="h-4 w-4" />
                  Show below zero stocks
                </label>
              </div>

              {/* Filter by product */}
              <div className="flex flex-col text-sm">
                <span className="mb-1 text-gray-600">Filter by product</span>
                <select className="h-9 rounded-md border border-gray-300 bg-white px-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500">
                  <option>All products</option>
                </select>

                <label className="mt-2 flex items-center gap-2 text-xs text-gray-700">
                  <input type="checkbox" className="h-4 w-4" />
                  Show Only Below Min Stock
                </label>
              </div>

              {/* Filter by category */}
              <div className="flex flex-col text-sm">
                <span className="mb-1 text-gray-600">Filter by category</span>
                <select className="h-9 rounded-md border border-gray-300 bg-white px-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500">
                  <option>Medicine</option>
                  <option>All</option>
                </select>

                <label className="mt-2 flex items-center gap-2 text-xs text-gray-700">
                  <input type="checkbox" className="h-4 w-4" />
                  Show Expired
                </label>
              </div>

              {/* Show items expiring in */}
              <div className="flex flex-col text-sm">
                <span className="mb-1 text-gray-600">
                  Show items expiring in
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    className="h-9 w-20 rounded-md border border-gray-300 bg-white px-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                  <span>days</span>
                </div>
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
                    <th className="px-4 py-3">Item Name</th>
                    <th className="px-4 py-3">Supplier</th>
                    <th className="px-4 py-3">Expiry Date</th>
                    <th className="px-4 py-3">VAT %</th>
                    <th className="px-4 py-3">Minimum Qty</th>
                    <th className="px-4 py-3">Purchase Price</th>
                    <th className="px-4 py-3">Total Purchased Qty</th>
                    <th className="px-4 py-3">Available Stock</th>
                    <th className="px-4 py-3">Total Stock Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      className="px-4 py-8 text-center text-gray-500"
                      colSpan={9}
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

export default StockAuditReportPage;
