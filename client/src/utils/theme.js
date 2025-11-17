// small helper for theme; currently App.jsx handles theme directly.
// kept for possible future use.
export function getInitialTheme() {
  return localStorage.getItem('theme') || 'light';
}
