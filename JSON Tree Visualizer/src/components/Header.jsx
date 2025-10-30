export default function Header({ dark, setDark }) {
  return (
    <header className="p-4 border-b border-gray-300 dark:border-gray-700 flex justify-between items-center">
      <h1 className="text-2xl font-semibold">🌳 JSON Tree Visualizer</h1>
      <label className="flex items-center gap-2 cursor-pointer select-none">
        <span className="text-sm">Dark Mode</span>
        <input
          type="checkbox"
          checked={dark}
          onChange={(e) => setDark(e.target.checked)}
          className="accent-indigo-500 cursor-pointer"
        />
      </label>
    </header>
  );
}
