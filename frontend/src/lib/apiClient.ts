// frontend/src/lib/apiClient.ts

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://145.223.23.176:5000";

async function request<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}

export const apiClient = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, body?: any) =>
    request<T>(url, {
      method: "POST",
      body: JSON.stringify(body),
    }),
  put: <T>(url: string, body?: any) =>
    request<T>(url, {
      method: "PUT",
      body: JSON.stringify(body),
    }),
  delete: <T>(url: string) =>
    request<T>(url, { method: "DELETE" }),
};
