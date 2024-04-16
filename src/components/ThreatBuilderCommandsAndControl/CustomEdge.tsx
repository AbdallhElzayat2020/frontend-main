import { getBezierPath, BaseEdge } from "reactflow";

export default function CustomEdge({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
}: any) {
  const edgePathParams = {
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  };

  const [path] = getBezierPath(edgePathParams);

  return <BaseEdge path={path} markerEnd={markerEnd} />;
}
