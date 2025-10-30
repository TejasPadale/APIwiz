import React from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";

export default function FlowCanvas({
  nodes,
  edges,
  dark,
  onNodeClick,
  onInit,
}) {
  return (
    <section className="flex-1 h-full relative">
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodeClick={onNodeClick}
          onInit={onInit}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          style={{ width: "100%", height: "100%" }}
        >
          <MiniMap
            nodeColor={dark ? "#a5b4fc" : "#6366f1"}
            maskColor={dark ? "rgba(0,0,0,0.6)" : "rgba(240,240,240,0.6)"}
          />
          <Controls className="dark:text-gray-100" />
          <Background color={dark ? "#444" : "#ddd"} gap={16} variant="dots" />
        </ReactFlow>
      </ReactFlowProvider>
    </section>
  );
}
