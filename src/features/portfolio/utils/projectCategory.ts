export function getCmsProjectCategory(
  projectType: string,
  fallback?: string,
): string {
  const type = projectType.toLowerCase();
  if (/saas|platform/.test(type)) return "saas";
  if (/\bmobile\b|\bandroid\b|\bios\b/.test(type)) return "mobile";
  if (/\bweb\b/.test(type)) return "web";
  return fallback ?? "web";
}
