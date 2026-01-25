"use client";

import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  variant?: "primary" | "outline";
  onClick?: () => void;
  type?: "button" | "submit";
};

export default function Button({
  children,
  variant = "primary",
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={clsx(
        "px-5 py-2 rounded-md text-sm font-medium",
        variant === "primary" &&
          "bg-green-600 text-white hover:bg-green-700",
        variant === "outline" &&
          "border border-green-600 text-green-600 hover:bg-green-50"
      )}
    >
      {children}
    </button>
  );
}
