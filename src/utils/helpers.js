export function fmt(t) {
  if (!t) return "";
  const p = t.split(":");
  const h = parseInt(p[0], 10);
  return (h > 12 ? h - 12 : h === 0 ? 12 : h) + ":" + p[1] + " " + (h >= 12 ? "PM" : "AM");
}

export function initials(name) {
  return (name || "??").trim().split(" ").map((n) => n[0] || "").join("").slice(0, 2).toUpperCase();
}

export function merge(obj, key, val) {
  const n = {};
  Object.keys(obj).forEach((k) => { n[k] = obj[k]; });
  n[key] = val;
  return n;
}
