export function getDynamicColor(depth, complexity, darkMode) {
  const hue = Math.max(10, 220 - depth * 40 - complexity * 5);
  const saturation = Math.min(90, 60 + complexity * 10);
  const lightness = darkMode
    ? Math.max(25, 65 - depth * 10 - complexity * 3)
    : Math.max(30, 80 - depth * 10 - complexity * 3);

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
