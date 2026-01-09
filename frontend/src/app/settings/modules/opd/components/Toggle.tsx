"use client";

export default function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label style={wrap}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{ transform: "scale(1.2)", marginRight: 10 }}
      />
      {label}
    </label>
  );
}

const wrap = {
  display: "flex",
  alignItems: "center",
  marginTop: 10,
  fontSize: 14,
  cursor: "pointer",
};
