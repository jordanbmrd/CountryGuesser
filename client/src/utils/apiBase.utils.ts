export function getApiBase(): string {
  const raw = (process.env.REACT_APP_API_URI || "/api").trim();
  const base = raw.length ? raw : "/api";
  return base.replace(/\/+$/, "");
}

