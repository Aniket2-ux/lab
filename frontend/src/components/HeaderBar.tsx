"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type HeaderBarProps = {
  pageTitle: string;
};

export default function HeaderBar({ pageTitle }: HeaderBarProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    router.push("/");
  };

  return (
    <div
      style={{
        background: "#ffffff",
        padding: "14px 24px",
        borderRadius: "10px",
        marginBottom: 18,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
      }}
    >
      {/* Left side: breadcrumb + lab name */}
      <div>
        <div style={{ fontSize: 12, color: "#888" }}>Patho &gt; {pageTitle}</div>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#222" }}>
          GM Diagnostic Lab
        </h3>
      </div>

      {/* Right side: icons + profile */}
      <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
        <span style={iconStyle}>🔍</span>
        <span style={iconStyle}>💬</span>
        <span style={iconStyle}>👍</span>
        <span style={iconStyle}>❓</span>
        <span style={iconStyle}>🔔</span>

        {/* Profile with dropdown */}
        <div style={{ position: "relative" }}>
          <div
            onClick={() => setOpen((o) => !o)}
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "#0b7a53",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            U
          </div>

          {open && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: 40,
                minWidth: 180,
                background: "#fff",
                borderRadius: 8,
                boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
                padding: "8px 0",
                zIndex: 20,
              }}
            >
              <div style={menuHeaderStyle}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "#0b7a53",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: 700,
                    marginRight: 8,
                  }}
                >
                  U
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>User Name</div>
                  <div style={{ fontSize: 11, color: "#777" }}>
                    admin@example.com
                  </div>
                </div>
              </div>

              <button
                style={menuItemStyle}
                onClick={() => {
                  setOpen(false);
                  router.push("/change-password");
                }}
              >
                🔑 Change password
              </button>

              <hr style={{ margin: "4px 0", borderColor: "#eee" }} />

              <button
                style={{ ...menuItemStyle, color: "#c62828" }}
                onClick={logout}
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const iconStyle: React.CSSProperties = {
  cursor: "pointer",
  fontSize: 18,
};

const menuHeaderStyle: React.CSSProperties = {
  padding: "8px 12px",
  borderBottom: "1px solid #eee",
  display: "flex",
  alignItems: "center",
};

const menuItemStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  padding: "8px 12px",
  textAlign: "left",
  background: "none",
  border: "none",
  fontSize: 13,
  cursor: "pointer",
};
