"use client";

export default function Button({
  label,
  onClick,
  variant = "primary",
  disabled,
}: {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}) {
  const styles =
    variant === "primary"
      ? {
          background: "#16a34a",
          color: "#fff",
        }
      : {
          background: "transparent",
          color: "#16a34a",
        };

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        ...styles,
        padding: "8px 18px",
        borderRadius: 6,
        border: variant === "secondary" ? "1px solid #16a34a" : "none",
        fontWeight: 600,
        cursor: "pointer",
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {label}
    </button>
  );
}
