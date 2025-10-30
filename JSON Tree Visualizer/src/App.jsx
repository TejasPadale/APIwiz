import React, { useCallback, useRef, useState, useEffect } from "react";
import { jsonToFlow } from "./utils/jsonToFlow";
import Header from "./components/Header";
import EditorPanel from "./components/EditorPanel";
import FlowCanvas from "./components/FlowCanvas";
import Footer from "./components/Footer";

export default function App() {
  const [jsonText, setJsonText] = useState(`{ "user": { "id": 1, "name": "John" } }`);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [dark, setDark] = useState(false);
  const reactFlowInstance = useRef(null);

  const buildTree = useCallback(() => {
    try {
      const parsed = JSON.parse(jsonText);
      const { nodes, edges } = jsonToFlow(parsed, "$", dark);
      setNodes(nodes);
      setEdges(edges);
      setMessage("");
      setTimeout(() => reactFlowInstance.current?.fitView({ padding: 0.2 }), 100);
    } catch (err) {
      setMessage("❌ Invalid JSON: " + err.message);
      setNodes([]);
      setEdges([]);
    }
  }, [jsonText, dark]);

  useEffect(() => {
    buildTree();
  }, []);

  const handleSearch = () => {
    const match = nodes.find(
      (n) => n.data.path.toLowerCase() === searchQuery.trim().toLowerCase()
    );
    if (match && reactFlowInstance.current) {
      setNodes((nds) =>
        nds.map((n) => ({
          ...n,
          style: {
            ...n.style,
            boxShadow:
              n.id === match.id
                ? "0 0 0 4px rgba(239,68,68,0.6)"
                : dark
                ? "0 4px 8px rgba(0,0,0,0.5)"
                : "0 2px 6px rgba(0,0,0,0.2)",
          },
        }))
      );
      reactFlowInstance.current.setCenter(
        match.position.x + 80,
        match.position.y + 20,
        { zoom: 1.3 }
      );
      setMessage("✅ Match found!");
    } else {
      setMessage("⚠️ No match found");
    }
  };

  const onNodeClick = (_, node) => {
    navigator.clipboard.writeText(node.data.path);
    setMessage(`📋 Copied path: ${node.data.path}`);
    setTimeout(() => setMessage(""), 1500);
  };

  return (
    <div
      className={`flex flex-col h-screen transition-colors duration-500 ${
        dark ? "dark bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Header dark={dark} setDark={setDark} />
      <main className="flex flex-1 overflow-hidden">
        <EditorPanel
          jsonText={jsonText}
          setJsonText={setJsonText}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onGenerate={buildTree}
          onClear={() => {
            setJsonText("");
            setNodes([]);
            setEdges([]);
            setMessage("");
          }}
          onSearch={handleSearch}
          message={message}
        />
        <FlowCanvas
          nodes={nodes}
          edges={edges}
          dark={dark}
          onNodeClick={onNodeClick}
          onInit={(rfi) => (reactFlowInstance.current = rfi)}
        />
      </main>
      <Footer />
    </div>
  );
}
