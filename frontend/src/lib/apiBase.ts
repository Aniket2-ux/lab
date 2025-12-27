export const API_BASE = (() => {
  const base = process.env.NEXT_PUBLIC_API_BASE;
  if (!base) {
    throw new Error("NEXT_PUBLIC_API_BASE is not defined");
  }
  return base;
})();
