import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === "dark";

  return (
    <button
      onClick={onToggle}
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle theme"
      title="Toggle theme"
      className="relative inline-flex items-center w-12 h-6 p-1 rounded-full bg-gray-200 dark:bg-gray-700 focus:outline-none"
    >
      <span
        className={`absolute left-1 top-1 text-yellow-400 transition-opacity ${
          isDark ? "opacity-0" : "opacity-100"
        }`}
      >
        <FiSun className="w-3 h-3" />
      </span>

      <span
        className={`absolute right-1 top-1 text-gray-100 transition-opacity ${
          isDark ? "opacity-100" : "opacity-0"
        }`}
      >
        <FiMoon className="w-3 h-3" />
      </span>

      <span
        className={`w-4 h-4 bg-white dark:bg-gray-900 rounded-full shadow transform transition-transform ${
          isDark ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </button>
  );
}
