import { getDynamicColor } from "./getDynamicColor";

let idCounter = 1;
const getId = () => `node_${idCounter++}`;

export function jsonToFlow(json, rootKey = "$", darkMode = false) {
  idCounter = 1;
  const nodes = [];
  const edges = [];

  const levelGapY = 140;
  const nodeGapX = 150;

  function buildTree(value, key, path) {
    const nodeId = getId();
    const label = key === null ? "root" : String(key);
    const node = { id: nodeId, label, value, path, children: [] };

    if (value !== null && typeof value === "object") {
      const entries = Array.isArray(value)
        ? value.map((v, i) => [i, v])
        : Object.entries(value);
      for (const [k, v] of entries) {
        node.children.push(buildTree(v, k, `${path}.${k}`));
      }
    }

    return node;
  }

  function countLeaves(node) {
    if (node.children.length === 0) return 1;
    return node.children.reduce((sum, child) => sum + countLeaves(child), 0);
  }

  function countDescendants(node) {
    if (!node.children.length) return 0;
    return node.children.reduce(
      (sum, child) => sum + 1 + countDescendants(child),
      0
    );
  }

  function assignPositions(node, depth = 0, xOffset = 600) {
    const leafCount = countLeaves(node);
    let currentX = xOffset - ((leafCount - 1) * nodeGapX) / 2;
    node.y = depth * levelGapY;

    if (node.children.length === 0) {
      node.x = currentX;
      return leafCount;
    }

    node.children.forEach((child) => {
      const childLeaves = countLeaves(child);
      const childCenter = currentX + ((childLeaves - 1) * nodeGapX) / 2;
      child.x = childCenter;
      child.y = (depth + 1) * levelGapY;
      currentX += childLeaves * nodeGapX;
      assignPositions(child, depth + 1, childCenter);
    });

    const firstChild = node.children[0];
    const lastChild = node.children[node.children.length - 1];
    node.x = (firstChild.x + lastChild.x) / 2;

    return leafCount;
  }

  const root = buildTree(json, rootKey, rootKey);
  assignPositions(root);

  function buildFlow(node, depth = 0) {
    const display =
      node.children.length === 0
        ? `${node.label}: ${String(node.value)}`
        : node.label;
    const complexity = countDescendants(node);
    const bgColor = getDynamicColor(depth, complexity, darkMode);

    nodes.push({
      id: node.id,
      data: { label: display, path: node.path },
      position: { x: node.x, y: node.y },
      style: {
        padding: 10,
        borderRadius: 10,
        background: bgColor,
        color: "white",
        fontWeight: "500",
        textAlign: "center",
        transition: "background 0.6s ease, transform 0.2s",
        boxShadow: darkMode
          ? `0 4px 8px rgba(0,0,0,0.5)`
          : `0 4px 8px rgba(0,0,0,0.2)`,
      },
    });

    node.children.forEach((child) => {
      edges.push({
        id: `e_${node.id}_${child.id}`,
        source: node.id,
        target: child.id,
      });
      buildFlow(child, depth + 1);
    });
  }

  buildFlow(root);
  return { nodes, edges };
}
