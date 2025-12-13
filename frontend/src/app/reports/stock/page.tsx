"use client";

import React from "react";
import Link from "next/link";
import Sidebar from "../../../components/Sidebar";
import HeaderBar from "../../../components/HeaderBar";

type StockReportCard = {
  id: string;
  title: string;
  href: string;
  icon: string;
};

const STOCK_REPORTS: StockReportCard[] = [
  {
    id: "stock-audit",
    title: "Stock Audit Report",
    href: "/reports/stock/audit",
    icon: "✅",
  },
  {
    id: "stock-cash-flow",
    title: "Stock Cash Flow Report",
    href: "/reports/stock/cash-flow",
    icon: "💶",
  },
  {
    id: "supplier-ledger",
    title: "Supplier Ledger Report",
    href: "/reports/stock/supplier-ledger",
    icon: "📊",
  },
  {
    id: "stock-transactions",
    title: "Stock Transactions",
    href: "/reports/stock/transactions",
    icon: "📦",
  },
  {
    id: "stock-history",
    title: "Stock History Report",
    href: "/reports/stock/history",
    icon: "🕒",
  },
  {
    id: "stock-summary",
    title: "Stock Summary Report",
    href: "/reports/stock/summary",
    icon: "📃",
  },
  {
    id: "stock-expiry",
    title: "Stock Expiry Report",
    href: "/reports/stock/expiry",
    icon: "⚠️",
  },
  {
    id: "stock-ledger",
    title: "Stock Ledger Report",
    href: "/reports/stock/ledger",
    icon: "📑",
  },
];

const StockReportsPage: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <HeaderBar pageTitle="Reports" />

        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <h1 className="mb-6 text-2xl font-semibold tracking-tight text-gray-800">
            Stock Reports
          </h1>

          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {STOCK_REPORTS.map((report) => (
              <Link
                key={report.id}
                href={report.href}
                className="group flex items-center justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-500 hover:shadow-md"
              >
                <div className="flex flex-col gap-2">
                  <span className="text-lg font-semibold text-gray-800 group-hover:text-emerald-600">
                    {report.title}
                  </span>
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-md bg-gray-100 text-3xl">
                  <span>{report.icon}</span>
                </div>
              </Link>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
};

export default StockReportsPage;
