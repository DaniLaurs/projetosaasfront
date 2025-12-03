export function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute("data-bs-theme");

  const next = current === "dark" ? "light" : "dark";

  html.setAttribute("data-bs-theme", next);
  localStorage.setItem("theme", next);
}

export function loadTheme() {
  const saved = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-bs-theme", saved);
}
