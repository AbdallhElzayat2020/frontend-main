import { useEffect, useRef } from "react";
import { useStoreApi, useReactFlow, Panel } from "reactflow";

export default () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const store = useStoreApi();
  const { setCenter } = useReactFlow();

  const focusNode = () => {
    const { nodeInternals } = store.getState();
    const nodes = Array.from(nodeInternals).map(([, node]) => node);

    if (nodes.length > 0) {
      const node = nodes[0] as any;

      const x = node.position.x + node.width / 2;
      const y = node.position.y + node.height / 2;
      const zoom = 1.85;

      setCenter(x, y, { zoom, duration: 1000 });
    }
  };

  const initialFocus = () => {
    const { nodeInternals } = store.getState();
    const nodes = Array.from(nodeInternals).map(([, node]) => node);
    const node = nodes[0] as any;

    const x = node.position.x + node.width / 2;
    const y = node.position.y + 100 + node.height / 2;
    const zoom = 1;

    setCenter(x, y, { zoom, duration: 1000 });
  };

  useEffect(() => {
    setTimeout(() => {
      initialFocus();
    }, 100);
  }, []);

  return (
    <Panel position="top-left">
      <div>
        <button
          ref={buttonRef}
          onClick={focusNode}
          className="flex items-center gap-2 bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80"
        >
          focus node
        </button>
      </div>
    </Panel>
  );
};
