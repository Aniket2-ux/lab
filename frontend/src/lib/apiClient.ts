// frontend/src/lib/apiBase.ts

const baseUrl =
  process.env.NEXT_PUBLIC_API_BASE ||
  "http://145.223.23.176:5000";

export async function apiClient<T = any>(
  path: string,
  init?: RequestInit
): Promise<T> {
  // Read token only in browser
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const res = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers || {}),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Request failed");
  }

  return res.json() as Promise<T>;
}
