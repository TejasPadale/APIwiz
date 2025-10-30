import React from "react";

export default function EditorPanel({
  jsonText,
  setJsonText,
  searchQuery,
  setSearchQuery,
  onGenerate,
  onClear,
  onSearch,
  message,
}) {
  return (
    <aside className="w-1/3 p-4 flex flex-col gap-3 border-r border-gray-300 dark:border-gray-700 overflow-y-auto">
      <h2 className="font-medium">Paste or Type JSON</h2>
      <textarea
        value={jsonText}
        onChange={(e) => setJsonText(e.target.value)}
        className="flex-1 p-2 border rounded-md bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 resize-none text-sm font-mono text-gray-900 dark:text-gray-100"
      />
      <div className="flex gap-2">
        <button
          onClick={onGenerate}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
        >
          Generate Tree
        </button>
        <button
          onClick={onClear}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
        >
          Clear
        </button>
      </div>
      <div className="flex gap-2">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search (e.g. $.user.address.city)"
          className="flex-1 p-2 border rounded-md bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-sm text-gray-900 dark:text-gray-100"
        />
        <button
          onClick={onSearch}
          className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          Search
        </button>
      </div>
      {message && (
        <p className="text-sm mt-2 text-indigo-500 dark:text-indigo-400">
          {message}
        </p>
      )}
    </aside>
  );
}