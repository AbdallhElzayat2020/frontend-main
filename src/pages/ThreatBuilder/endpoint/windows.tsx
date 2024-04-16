import { useEffect, useCallback, useState, useContext } from "react";
// import DropdownAddAttack from "../../../components/DropdownAddAttack";
import ThreatBuilderCommandsAndControl from "../../../components/ThreatBuilderCommandsAndControl";
import { v4 as uuidv4 } from "uuid";
import ReactFlow, {
  Controls,
  Background,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";
import { Handle, Position } from "reactflow";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import CustomEdge from "../../../components/ThreatBuilderCommandsAndControl/CustomEdge";
import Buttons from "../../../components/ThreatBuilderCommandsAndControl/Buttons";
import SelectAgent from "../../../components/SelectAgent";
import { AppContext } from "../../../context";

const CustomNode = (props: any) => {
  return (
    <div
      className={`flex min-w-[50px] bg-white ${
        props.data.SID >= 1
          ? "cursor-pointer"
          : "cursor-default bg-primary-70 text-white"
      }`}
    >
      {props.data.SID !== 0 && (
        <Handle
          type="target"
          position={Position.Top}
          isConnectable={props.isConnectable}
        />
      )}
      <div className="flex w-[200px] flex-col justify-start gap-2 border-[1px]  border-solid border-slate-300/70 p-3 transition-all duration-700">
        <span className="w-full text-start text-[12px] font-semibold leading-5 text-primary-70">
          {/* STEP {props.data.SID}{" "} */}
          {props.data.SID === 0
            ? "START"
            : props.data.SID === -1
            ? "END"
            : `STEP ${props.data.SID}`}
        </span>
        <span className="w-full text-start text-sm font-medium">
          {props.data.label}
        </span>
        <div className="flex w-full flex-col text-start text-sm">
          {props?.data?.Tactic ? (
            <div className="flex flex-wrap gap-1">
              {props?.data?.Tactic.map((tactic: any) => (
                <div className="w-fit rounded bg-gray-900/10 px-1 font-semibold text-gray-700 transition-all duration-700">
                  {tactic}
                </div>
              ))}
              <div className="w-fit rounded bg-gray-900/10 px-1 font-semibold text-gray-700 transition-all duration-700">
                {props?.data?.Technique}
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {props.data.SID !== -1 && (
        <Handle
          type="source"
          position={Position.Bottom}
          id={`${props.data.SID}-success`}
          isConnectable={props.isConnectable}
        />
      )}
    </div>
  );
};

const EndpointBuild = () => {
  const params = useParams();
  const { setAgent } = useContext(AppContext);
  const [sidebarOpen, setSidebarOpen] = useState<any>(false);
  const [expanded, setExpanded] = useState<any>(!!sidebarOpen);
  const [records, setRecords] = useState<any>({});
  const [status, setStatus] = useState<"EDIT" | "VIEW">("VIEW");

  const [openedSelectAgent, setOpenedSelectAgent] = useState<any>();
  const [agents, setAgents] = useState<any>([]);

  let navigate = useNavigate();

  const agentOnSelect = async (agent: any) => {
    const simulation = await axios.post("/simulation", {
      Event: 1001,
      Time: new Date().toString(),
      ID: uuidv4(),
      Body: {
        AgentToken: agent.SessionToken,
        Simulationid: params.id,
      },
    });
    navigate(`/simulate-threat/${params.id}/${simulation.data}`);
    setAgent(agent?.HostName);
  };
  const fetchData = async () => {
    try {
      const res = await axios.get(`/templates/${params.id}`);
      const item = res.data;

      setRecords({ ...item, Steps: item.Steps });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const getAgents = async () => {
    try {
      axios.get("/agents").then((res: any) => {
        setAgents(res.data);
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAgents();
    fetchData();
  }, []);

  const handleNodeClick = (event: React.MouseEvent, element: any) => {
    if (element?.id && element.SID >= 0) {
      // This callback will be triggered when a node is clicked
      setSidebarOpen(element);
      setExpanded(true);
    }
  };

  const sortFunc = (a: any, b: any) => {
    // Make SID 0 first
    if (a.SID === 0) return -1;
    if (b.SID === 0) return 1;

    // Make SID -1 last
    if (a.SID === -1) return 1;
    if (b.SID === -1) return -1;

    // Otherwise, sort by SID ascending
    return a.SID - b.SID;
  };

  let rampHeight = 0;

  const initialNodes = Object.values(
    {
      "-99": {
        ProcedureName: "start",
        SID: 0,
        OnSuccess: 1,
        OnFail: 1,
      },
      ...records.Steps,
      "-1": {
        ProcedureName: "end",
        SID: -1,
      },
    } || {}
  )
    .sort(sortFunc)
    .map((item: any, index: number) => {
      let positionX = 200 + rampHeight * 800;
      let positionY = index * 200;

      if (item.SID === -1) {
        positionX = 200;
      } else if (item.SID === 0) {
        positionX = 200;
      } else {
        if (item.OnSuccess !== parseInt(item.SID) + 1) {
          ++rampHeight;
        }
        if (item.OnFail !== parseInt(item.SID) + 1) {
          ++rampHeight;
        }
      }

      return {
        ...item,
        id: `${item.SID}`,
        data: { ...item, label: item.ProcedureName },
        position: { x: positionX, y: positionY },
        type: "CustomNode",
      };
    });

  const initialEdges = initialNodes.flatMap((item: any) => {
    const successEdge = {
      id: `${item.SID}-success`,
      source: `${item.SID}`,
      target: `${item.OnSuccess}`,
      animated: true,
      style: {
        strokeWidth: 1,
        stroke: item.OnSuccess === item.OnFail ? "" : "green",
      },
      label: item.OnSuccess === item.OnFail ? "" : "Success",
      type: "smoothstep",
    };

    const failEdge = {
      id: `${item.SID}-fail`,
      source: `${item.SID}`,
      target: `${item.OnFail}`,
      animated: true,
      style: {
        strokeWidth: 1,
        stroke: item.OnSuccess !== item.OnFail ? "red" : "",
      },
      label: item.OnSuccess === item.OnFail ? "" : "Fail",
      type: "smoothstep",
    };

    return [successEdge, failEdge];
  });

  const edgeTypes = {
    custom: CustomEdge,
  };

  const [, setEdges] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params: any) => setEdges((els) => addEdge(params, els)),
    []
  );

  return (
    <>
      <div className="inline-flex w-full items-start justify-between gap-[8px] border-b border-slate-200 bg-white px-[19px] py-4">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-start justify-start gap-1 border-2 border-[#C999DE] bg-[#E1C4EF] bg-opacity-80 p-2">
            <div className="flex items-center justify-center">
              <div className="relative">
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.4"
                    d="M16.19 2.5H7.81C4.17 2.5 2 4.67 2 8.31V16.68C2 20.33 4.17 22.5 7.81 22.5H16.18C19.82 22.5 21.99 20.33 21.99 16.69V8.31C22 4.67 19.83 2.5 16.19 2.5Z"
                    fill="#743A8E"
                  />
                  <path
                    opacity="0.97"
                    d="M11.9999 10.8099C12.7234 10.8099 13.3099 10.2234 13.3099 9.49994C13.3099 8.77645 12.7234 8.18994 11.9999 8.18994C11.2764 8.18994 10.6899 8.77645 10.6899 9.49994C10.6899 10.2234 11.2764 10.8099 11.9999 10.8099Z"
                    fill="#743A8E"
                  />
                  <path
                    opacity="0.97"
                    d="M8.31 14.1899C7.59 14.1899 7 14.7799 7 15.4999C7 16.2199 7.59 16.8099 8.31 16.8099C9.03 16.8099 9.62 16.2199 9.62 15.4999C9.62 14.7799 9.03 14.1899 8.31 14.1899Z"
                    fill="#743A8E"
                  />
                  <path
                    opacity="0.97"
                    d="M15.69 14.1899C14.97 14.1899 14.38 14.7799 14.38 15.4999C14.38 16.2199 14.97 16.8099 15.69 16.8099C16.41 16.8099 17 16.2199 17 15.4999C17 14.7799 16.41 14.1899 15.69 14.1899Z"
                    fill="#743A8E"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="inline-flex flex-col items-start justify-center">
            <div className="inline-flex items-center justify-start gap-2">
              <div className="text-base font-medium leading-relaxed tracking-tight text-black">
                {records.ThreatDisplayName}
              </div>
              <div className="flex items-center justify-center">
                <div className="relative">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.4"
                      d="M14 14.6667H2C1.72667 14.6667 1.5 14.4401 1.5 14.1667C1.5 13.8934 1.72667 13.6667 2 13.6667H14C14.2733 13.6667 14.5 13.8934 14.5 14.1667C14.5 14.4401 14.2733 14.6667 14 14.6667Z"
                      fill="#4A5568"
                    />
                    <path
                      opacity="0.4"
                      d="M12.68 2.31994C11.3867 1.02661 10.12 0.993275 8.79334 2.31994L7.98668 3.12661C7.92001 3.19328 7.89334 3.29994 7.92001 3.39328C8.42668 5.15994 9.84001 6.57328 11.6067 7.07994C11.6333 7.08661 11.66 7.09328 11.6867 7.09328C11.76 7.09328 11.8267 7.06661 11.88 7.01328L12.68 6.20661C13.34 5.55328 13.66 4.91994 13.66 4.27994C13.6667 3.61994 13.3467 2.97994 12.68 2.31994Z"
                      fill="#4A5568"
                    />
                    <path
                      d="M10.4067 7.68678C10.2133 7.59345 10.0267 7.50011 9.84668 7.39345C9.70001 7.30678 9.56001 7.21345 9.42001 7.11345C9.30668 7.04011 9.17334 6.93345 9.04667 6.82678C9.03334 6.82011 8.98667 6.78011 8.93334 6.72678C8.71334 6.54011 8.46668 6.30011 8.24668 6.03345C8.22668 6.02011 8.19334 5.97345 8.14668 5.91345C8.08001 5.83345 7.96668 5.70011 7.86668 5.54678C7.78668 5.44678 7.69334 5.30011 7.60668 5.15345C7.50001 4.97345 7.40668 4.79345 7.31334 4.60678C7.22001 4.40678 7.14668 4.21345 7.08001 4.03345L2.89334 8.22011C2.80668 8.30678 2.72668 8.47345 2.70668 8.58678L2.34668 11.1401C2.28001 11.5934 2.40668 12.0201 2.68668 12.3068C2.92668 12.5401 3.26001 12.6668 3.62001 12.6668C3.70001 12.6668 3.78001 12.6601 3.86001 12.6468L6.42001 12.2868C6.54001 12.2668 6.70668 12.1868 6.78668 12.1001L10.9733 7.91345C10.7867 7.84678 10.6067 7.77345 10.4067 7.68678Z"
                      fill="#4A5568"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="text-center">
              <span className="text-xs font-bold leading-[19px] tracking-tight text-gray-700">
                {Object.keys(records.Steps || {}).length}{" "}
              </span>
              <span className="text-xs font-medium leading-[19px] tracking-tight text-gray-700">
                Actions
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-start justify-start gap-2">
          <button
            onClick={() => (setOpenedSelectAgent(true), getAgents())}
            className="flex items-center gap-2 bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80"
          >
            Simulate
          </button>
          {/* {status === "VIEW" ? (
            <button
              onClick={() => setStatus("EDIT")}
              className="flex items-center gap-2 bg-[#743A8E1A] px-4.5 py-2 font-medium text-[#743A8E] hover:bg-opacity-80"
            >
              Edit
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  setStatus("VIEW");
                  const tempNodes = [...nodes];
                  const index = tempNodes.findIndex(
                    (item) => item.id === sidebarOpen.id
                  );
                  tempNodes[index] = sidebarOpen;
                  setRecords({ ...records, Steps: tempNodes });
                }}
                className="flex items-center gap-2 bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80"
              >
                save
              </button>
              <button
                onClick={() => setStatus("VIEW")}
                className="flex items-center gap-2 bg-[#743A8E1A] px-4.5 py-2 font-medium text-[#743A8E] hover:bg-opacity-80"
              >
                cancel
              </button>
            </>
          )} */}
        </div>
      </div>

      {/* {!!sidebarOpen && (
        <div className="relative">
          <ThreatBuilderCommandsAndControl
            {...{ sidebarOpen, setSidebarOpen, expanded, setExpanded, status }}
          />
        </div>
      )} */}
      <div
        className={`flex h-[83.7vh] flex-col items-center transition-all duration-300 ease-in-out  ${
          expanded ? " pr-[500px]" : ""
        }`}
      >
        <div style={{ height: "100%", width: "100%" }} className="bg-white">
          <ReactFlowProvider>
            <ReactFlow
              nodeTypes={{ CustomNode: CustomNode }}
              onNodeClick={handleNodeClick}
              nodes={initialNodes}
              edges={initialEdges}
              onConnect={onConnect}
              zoomOnScroll={false}
              proOptions={{
                hideAttribution: true,
              }}
              panOnScroll
              edgeTypes={edgeTypes}
            >
              <MiniMap style={{ height: 50 }} zoomable pannable />

              <Background />
              <Controls />
              {initialNodes[0] && <Buttons />}
            </ReactFlow>
          </ReactFlowProvider>
        </div>
      </div>
      <SelectAgent
        setOpen={setOpenedSelectAgent}
        open={openedSelectAgent}
        onSelect={(e: any) => agentOnSelect(e)}
        agents={agents}
      />
    </>
  );
};

export default EndpointBuild;
