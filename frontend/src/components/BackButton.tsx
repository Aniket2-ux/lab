"use client";

import React from "react";
import { useRouter } from "next/navigation";

type BackButtonProps = {
  label?: string;
  className?: string;
};

const BackButton: React.FC<BackButtonProps> = ({
  label = "Back",
  className = "",
}) => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className={`inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 ${className}`}
    >
      <span className="mr-1.5 text-lg leading-none">←</span>
      {label}
    </button>
  );
};

export default BackButton;
