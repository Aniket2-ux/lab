const API_BASE =
  typeof window !== "undefined"
    ? process.env.NEXT_PUBLIC_API_BASE
    : process.env.NEXT_PUBLIC_API_BASE;

if (!API_BASE) {
  throw new Error("NEXT_PUBLIC_API_BASE is not defined");
}

export async function apiClient<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    cache: "no-store", // 🚨 IMPORTANT: disable Next cache
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}
