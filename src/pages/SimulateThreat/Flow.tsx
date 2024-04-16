import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  useReactFlow,
} from "reactflow";
import axios from "axios";

const Flow = ({ actions }: any) => {
  const params = useParams();

  const reactFlow = useReactFlow();

  const [allActions, setAllActions] = useState<any>([]);
  const [diffStep, setDiffStep] = useState(0);

  // GET ALL ACTIONS
  const fetchData = async () => {
    try {
      const res = await axios.get(`/templates/${params.id}`);
      const data = res.data;

      const allActions = Object.values(data.Steps).map((item: any) => {
        return (
          item.OnSuccess !== item.OnFail ? setDiffStep(item.SID) : null,
          {
            Name: item.ProcedureName,
            Event: 0,
            OnSuccess: item.OnSuccess,
            OnFail: item.OnFail,
            SID: item.SID,
            Technique: item.Technique,
            Tactic: item.Tactic,
          }
        );
      });

      setAllActions(allActions);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  // UPDATE ACTIONS STATUS
  useEffect(() => {
    actions.map((action: any) =>
      allActions.map((oldActions: any, index: any) => {
        if (action.Body.Name == oldActions.Name) {
          const newAction = {
            ...oldActions,
            Event: action.Event,
            Techniques: action.Body.techniques,
            RetCode: action.Body.RetCode,
          };

          allActions[index] = newAction;

          if (newAction.OnSuccess !== newAction.OnFail) {
            if (newAction.RetCode !== 1) {
              const node = reactFlow.getNode(`horizontal-${-1}`);

              // @ts-ignore
              reactFlow.setCenter(node?.position.x, 50, {
                duration: 1000,
                zoom: 1,
              });
            }
          } else {
            const node = reactFlow.getNode(`horizontal-${index}`);
            // @ts-ignore
            reactFlow.setCenter(node?.position.x, 50, {
              duration: 1000,
              zoom: 1,
            });
          }
        }
      })
    );
  }, [actions]);

  useEffect(() => {
    fetchData();
  }, []);

  const nodesArray = [
    {
      id: `horizontal-${-99}`,
      sourcePosition: "right",
      targetPosition: "left",
      className: "p-0 rounded-none border-none w-fit",
      data: {
        label: (
          <>
            <div
              className={` flex w-[200px] flex-col justify-start gap-2 border-[1px] border-solid border-slate-300/70 p-3 transition-all duration-700`}
            >
              <span className="w-full text-start font-semibold leading-5">
                START
              </span>
            </div>
          </>
        ),
      },
      position: { x: -300, y: 0 },
    },
    ...allActions.map((item: any, index: number) => {
      return {
        id: `horizontal-${item.SID}`,
        sourcePosition: "right",
        targetPosition: "left",
        className: "p-0 rounded-none border-none w-fit",
        data: {
          label: (
            <>
              <div
                className={`${
                  item.Event == 0 && "opacity-40"
                } flex w-[200px] flex-col justify-start gap-2 border-[1px] border-solid border-slate-300/70 p-3 transition-all duration-700`}
              >
                <span className="w-full text-start text-[12px] font-semibold leading-5 text-primary-70">
                  STEP {item.SID}
                </span>
                <span className="w-full text-start font-semibold leading-5">
                  {item.Name}
                </span>
                <div className="flex flex-wrap gap-1">
                  {item.Event ? (
                    item.RetCode === 0 ? (
                      <div className="bgred w-fit rounded bg-red-600/20 px-2 font-semibold text-red-500 transition-all duration-700">
                        Faild
                      </div>
                    ) : item.RetCode === 1 ? (
                      <div className="w-fit rounded bg-green-700/20 px-2 font-semibold text-green-700 transition-all duration-700">
                        Success
                      </div>
                    ) : item.RetCode === 2 ? (
                      <div className="w-fit rounded bg-slate-800/20 px-2 font-semibold text-slate-900 transition-all duration-700">
                        Unknown
                      </div>
                    ) : (
                      <div className="w-fit rounded bg-slate-800/20 px-2 font-semibold text-slate-900 transition-all duration-700">
                        On Progress
                      </div>
                    )
                  ) : (
                    <div className="w-fit rounded bg-slate-800/20 px-2 font-semibold text-slate-900 transition-all duration-700">
                      Waiting
                    </div>
                  )}
                  <div className="flex w-full flex-col text-start">
                    <div className="flex flex-wrap gap-1">
                      {item.Tactic[0] !== "" ? (
                        <div className="w-fit rounded bg-slate-800/20 px-2 font-semibold text-slate-900 transition-all duration-700">
                          {item.Tactic[0]}
                        </div>
                      ) : null}
                      {item.Technique[0] !== "" ? (
                        <div className="w-fit rounded bg-slate-800/20 px-2 font-semibold text-slate-900 transition-all duration-700">
                          {item.Technique[0]}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ),
        },
        position: { x: index * 300, y: item.SID > diffStep ? -300 : 0 },
      };
    }),
    {
      id: `horizontal-${-1}`,
      sourcePosition: "right",
      targetPosition: "left",
      className: "p-0 rounded-none border-none w-fit",
      data: {
        label: (
          <>
            <div
              className={` flex w-[200px] flex-col justify-start gap-2 border-[1px] border-solid border-slate-300/70 p-3 transition-all duration-700`}
            >
              <span className="w-full text-start font-semibold leading-5">
                END
              </span>
            </div>
          </>
        ),
      },
      position: { x: allActions.length * 300 + 150, y: 0 },
    },
  ];

  const edgesArray = [
    {
      id: `horizontal-${-99}`,
      source: `horizontal-${-99}`,
      type: "smoothstep",
      target: `horizontal-${1}`,
      animated: true,
    },
    ...[].concat(
      ...allActions.map((item: any, index: number) => {
        if (item.OnSuccess !== item.OnFail) {
          return [
            {
              id: `horizontal-${item.SID}`,
              source: `horizontal-${item.SID}`,
              type: "smoothstep",
              target: `horizontal-${item.OnFail}`,
              animated: true,
              label: "On Fail",
              style: {
                color: "red",
                stroke: "red",
                strokeWidth: 2,
              },
            },
            {
              id: `horizontal-${item.SID}`,
              source: `horizontal-${item.SID}`,
              type: "smoothstep",
              target: `horizontal-${item.OnSuccess}`,
              animated: true,
              label: "On Success",
              style: {
                color: "red",
                stroke: "green",
                strokeWidth: 2,
              },
            },
          ];
        } else {
          return [
            {
              id: `horizontal-${item.SID}`,
              source: `horizontal-${item.SID}`,
              type: "smoothstep",
              target: `horizontal-${item.OnFail}`,
              animated: true,
              lable: "hi",
              style: {
                strokeWidth: 2,
              },
            },
          ];
        }
      })
    ),
    {
      id: `horizontal-${-1}`,
      type: "smoothstep",
      animated: true,
    },
  ];

  return (
    <>
      <ReactFlow nodes={nodesArray} edges={edgesArray} zoomOnScroll={false}>
        <Background />
        <MiniMap style={{ height: 50 }} zoomable pannable />
        <Controls />
      </ReactFlow>
    </>
  );
};

export default Flow;
