"use client";

import React from "react";
import Link from "next/link";
import Sidebar from "../../components/Sidebar";
import HeaderBar from "../../components/HeaderBar";

type ReportDefinition = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: string;
};

const REPORTS: ReportDefinition[] = [
  {
    id: "stock",
    title: "Stock Reports",
    description: "View stock usage, balance and purchase history.",
    href: "/reports/stock",
    icon: "📦",
  },
  {
    id: "patient",
    title: "Patient Reports",
    description: "Patient-wise visits, bills and lab activity.",
    href: "/reports/patient",
    icon: "👤",
  },
  {
    id: "financial",
    title: "Financial Reports",
    description: "Daily collections, dues and revenue stats.",
    href: "/reports/financial",
    icon: "📈",
  },
  {
    id: "message",
    title: "Message Report",
    description: "Track all SMS / WhatsApp notifications.",
    href: "/reports/message",
    icon: "💬",
  },
  {
    id: "lab",
    title: "Lab Report",
    description: "Test-wise, department-wise lab performance.",
    href: "/reports/lab",
    icon: "⚗️",
  },
  {
    id: "central-monitoring",
    title: "Central Monitoring Report",
    description: "Monitor activities across all departments.",
    href: "/reports/central-monitoring",
    icon: "🖥️",
  },
  {
    id: "branches",
    title: "Central Reporting For Branches",
    description: "Branch-wise consolidated reporting.",
    href: "/reports/branches",
    icon: "🏥",
  },
  {
    id: "other",
    title: "Other Reports",
    description: "Miscellaneous and custom reports.",
    href: "/reports/other",
    icon: "📊",
  },
];

const ReportsPage: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <HeaderBar pageTitle="Reports" />



        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-800">
              Reports
            </h1>

            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Search a report"
                className="h-10 w-56 rounded-md border border-gray-300 bg-white px-3 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              <select
                className="h-10 rounded-md border border-gray-300 bg-white px-3 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                defaultValue=""
              >
                <option value="" disabled>
                  Select category
                </option>
                <option value="all">All</option>
                <option value="stock">Stock</option>
                <option value="patient">Patient</option>
                <option value="financial">Financial</option>
              </select>
            </div>
          </div>

          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {REPORTS.map((report) => (
              <Link
                key={report.id}
                href={report.href}
                className="group flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-500 hover:shadow-md"
              >
                <div>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-gray-100 text-2xl">
                    <span>{report.icon}</span>
                  </div>

                  <h2 className="text-lg font-semibold text-gray-800 group-hover:text-emerald-600">
                    {report.title}
                  </h2>
                  <p className="mt-2 text-sm text-gray-500">
                    {report.description}
                  </p>
                </div>

                <div className="mt-4 text-sm font-medium text-emerald-600 opacity-0 transition group-hover:opacity-100">
                  View report →
                </div>
              </Link>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
};

export default ReportsPage;
