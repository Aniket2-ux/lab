"use client";

import React from "react";
import Link from "next/link";
import Sidebar from "../../../components/Sidebar";
import HeaderBar from "../../../components/HeaderBar";

type ReportCard = {
  id: string;
  title: string;
  href: string;
  icon: string;
};

const PATIENT_REPORTS: ReportCard[] = [
  {
    id: "appointment",
    title: "Appointment Report",
    href: "/reports/patient/appointment",
    icon: "📅",
  },
  {
    id: "prescription",
    title: "Patient Prescription Report",
    href: "/reports/patient/prescription",
    icon: "💊",
  },
  {
    id: "client",
    title: "Client Report",
    href: "/reports/patient/client",
    icon: "👥",
  },
  {
    id: "reminders",
    title: "Reminders Report",
    href: "/reports/patient/reminders",
    icon: "⏰",
  },
  {
    id: "sp-efficiency",
    title: "Service Provider Efficiency Report",
    href: "/reports/patient/service-provider-efficiency",
    icon: "📈",
  },
];

const PatientReportsPage: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <HeaderBar pageTitle="Reports" />

        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <h1 className="mb-6 text-2xl font-semibold tracking-tight text-gray-800">
            Patient Reports
          </h1>

          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PATIENT_REPORTS.map((report) => (
              <Link
                key={report.id}
                href={report.href}
                className="group flex items-center justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-500 hover:shadow-md"
              >
                <div className="text-lg font-semibold text-gray-800 group-hover:text-emerald-600">
                  {report.title}
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

export default PatientReportsPage;
