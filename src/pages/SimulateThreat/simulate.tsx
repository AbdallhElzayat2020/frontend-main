import { useParams } from "react-router-dom";
import SimulationActionControl from "../../components/SimulationActionControl";
import { useContext, useEffect, useState } from "react";
import { AppContext, webSocket } from "../../context";
import { ReactFlowProvider } from "reactflow";
import axios from "axios";
import Flow from "./Flow";

export default function Simulate() {
  const params = useParams();
  const { agent } = useContext(AppContext);
  const [threat, setThreat] = useState<any>(null);
  const [actions, setActions] = useState<any>([]);
  const [finalReport, setFinalReport] = useState({
    fail: 0,
    success: 0,
    unknown: 0,
  });
  const { simulation_guid } = useParams();
  // 0: WAITING, 1: IN PROGRESS, 2: DONE
  const [simulationStatus, setSimulationStatus] = useState(0);
  const onMessage = (data: any) => {
    setSimulationStatus(1);
    if (data.Event === 5) {
      setSimulationStatus(2);
    }
    if (data.Event !== 6) {
      setActions((prevActions: any) => {
        const lastAction = prevActions[prevActions.length - 1];

        if (lastAction && lastAction.Body.Name === data.Body.Name) {
          if (data.Body.RetCode === 0) {
            setFinalReport((prevReport: any) => {
              return { ...prevReport, fail: prevReport.fail + 1 };
            });
          } else if (data.Body.RetCode === 1) {
            setFinalReport((prevReport: any) => {
              return { ...prevReport, success: prevReport.success + 1 };
            });
          } else {
            setFinalReport((prevReport: any) => {
              return { ...prevReport, unknown: prevReport.unknown + 1 };
            });
          }

          return [
            ...prevActions.slice(0, -1),
            {
              ...lastAction,
              Body: { ...data.Body, RetCode: data.Body.RetCode },
            },
          ];
        } else {
          return [...prevActions, data];
        }
      });

      actions.map((action: any) => {
        if (action.Event == 5 && data.Event !== 6) {
          setFinalReport((prevReport: any) => {
            actions.forEach((action: any) => {
              if (action.Body.RetCode === 0) {
                prevReport = { ...prevReport, fail: prevReport.fail + 1 };
              } else if (action.Body.RetCode === 1) {
                prevReport = { ...prevReport, success: prevReport.success + 1 };
              } else {
                prevReport = { ...prevReport, unknown: prevReport.unknown + 1 };
              }
            });

            return prevReport; // Return the final state after iterating through all actions
          });
        }
      });
    }
  };

  // GET TEMPLATE
  const fetchData = async () => {
    try {
      const res = await axios.get(`/templates/${params.id}`);
      const data = res.data;
      setThreat(data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
    // @ts-ignore
    webSocket.send(
      JSON.stringify({
        type: "subscribe",
        service: `simulation-${simulation_guid}`,
      })
    );
    // @ts-ignore
    webSocket.on("message", onMessage);
    return () => {
      // @ts-ignore
      webSocket.removeListener("message", onMessage);
    };
  }, []);
  const createMarkup = () => {
    const threatDescriptionWithLinks = addLinksToUrls(
      threat?.ThreatDescription
    );

    return { __html: threatDescriptionWithLinks };
  };

  const addLinksToUrls = (text: any) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    return text.replace(
      urlRegex,
      (url: any) =>
        `<a class="text-primary-70 underline duration-200 hover:text-primary" href="${url}" target="_blank">${url}</a>`
    );
  };

  return (
    <div className="flex flex-col gap-4 p-10">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h1 className="font-medium text-gray-800">{threat?.ThreatName}</h1> -
          {simulationStatus == 0 ? (
            <span className="rounded bg-gray-400/30 px-2 py-[2px] text-base font-medium text-gray-600">
              Waiting
            </span>
          ) : simulationStatus == 1 ? (
            <span className="rounded bg-primary/10 px-2 py-[2px] text-base font-medium text-primary">
              In Progress
            </span>
          ) : (
            <span className="rounded bg-green-600/10 px-2 py-[2px] text-base font-medium text-green-700">
              Simulation Successfully Finished
            </span>
          )}
        </div>
        <div className="flex items-center space-x-1 ">
          <p className=" text-sm font-medium text-gray-900">
            {threat?.UpdatedAt}
          </p>
          <span>-</span>
          <p className="flex flex-row-reverse gap-1 bg-primary/10 px-1 py-1 text-sm font-medium capitalize text-primary">
            {agent}
            {threat?.ThreatOSName == "windows" ? (
              <svg
                width="16"
                height="18"
                viewBox="0 0 16 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_1651_11154)">
                  <path
                    d="M0 3.29414L6.45469 2.40469V8.64141H0V3.29414ZM0 14.7059L6.45469 15.5953V9.43594H0V14.7059ZM7.16484 15.6902L15.75 16.875V9.43594H7.16484V15.6902ZM7.16484 2.30977V8.64141H15.75V1.125L7.16484 2.30977Z"
                    fill="#743A8E"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1651_11154">
                    <rect width="15.75" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            ) : threat?.ThreatOSName == "linux" ? (
              <svg
                width="17"
                height="18"
                viewBox="0 0 17 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.7959 14.4525C15.268 14.2363 15.0422 13.9494 15.0641 13.5214C15.0865 13.0218 14.8031 12.6558 14.6685 12.5112C14.7498 12.2005 14.9875 11.1258 14.6687 10.1924C14.3262 9.19322 13.2804 7.66722 12.2013 6.16719C11.7596 5.55118 11.7387 4.88157 11.7146 4.10621C11.6914 3.36667 11.6653 2.5284 11.2529 1.59652C10.8045 0.581846 9.90475 0 8.7842 0C8.1176 0 7.43336 0.208329 6.90682 0.571519C5.82858 1.31566 5.97111 2.93809 6.06541 4.01167C6.07834 4.15868 6.0905 4.29754 6.09758 4.41611C6.16037 5.46755 6.10324 6.02172 6.02853 6.19015C5.98019 6.30022 5.74224 6.61348 5.49041 6.94515C5.22997 7.28816 4.93471 7.67696 4.69268 8.03927C4.40391 8.47522 4.1708 9.14158 3.94535 9.78599C3.7804 10.2575 3.6246 10.7029 3.47293 10.9691C3.18545 11.4811 3.25698 11.9586 3.31671 12.1792C3.20788 12.2548 3.05066 12.4037 2.91793 12.6842C2.75752 13.0265 2.43205 13.2105 1.75524 13.3406C1.44422 13.4042 1.22976 13.535 1.11762 13.7293C0.954443 14.0121 1.04332 14.3673 1.12441 14.6101C1.24422 14.9671 1.16956 15.193 1.03382 15.6032C1.00254 15.6978 0.967072 15.805 0.931131 15.9232C0.874534 16.1098 0.894954 16.2794 0.991682 16.4273C1.24728 16.8181 1.99314 16.9559 2.76095 17.0465C3.21939 17.1009 3.72115 17.2843 4.20644 17.4617C4.68194 17.6355 5.17361 17.8152 5.62055 17.8697C5.68847 17.8782 5.75575 17.8826 5.82061 17.8826C6.49541 17.8826 6.80029 17.4348 6.89696 17.2508C7.13934 17.2014 7.97532 17.043 8.8369 17.0217C9.69713 16.9972 10.5294 17.167 10.7652 17.2199C10.8393 17.3617 11.0347 17.6858 11.3462 17.8528C11.5174 17.9464 11.7557 18 11.9997 18H11.9998C12.2604 18 12.7562 17.9384 13.1486 17.5256C13.54 17.1108 14.5179 16.5813 15.232 16.1947C15.3914 16.1084 15.5404 16.0277 15.6712 15.9548C16.0723 15.7324 16.2912 15.4147 16.2717 15.083C16.2554 14.8076 16.0731 14.566 15.7959 14.4525ZM6.91561 14.3727C6.86568 14.0209 6.4132 13.6721 5.88919 13.2682C5.46073 12.9378 4.97508 12.5635 4.84129 12.2465C4.56479 11.5924 4.78274 10.4424 5.16275 9.85026C5.35054 9.55376 5.50393 9.10411 5.6523 8.66927C5.81247 8.19973 5.97813 7.71426 6.16338 7.50174C6.45675 7.16995 6.72788 6.52436 6.77592 6.01558C7.05064 6.27785 7.4768 6.61065 7.8705 6.61065C7.93111 6.61065 7.98995 6.60274 8.04619 6.58686C8.31555 6.50908 8.71173 6.28015 9.09486 6.05884C9.42518 5.86798 9.83251 5.63262 9.98578 5.6112C10.2486 5.98855 11.7756 9.36791 11.9317 10.4532C12.0551 11.3119 11.9247 12.0217 11.8592 12.2997C11.8064 12.2925 11.7435 12.2867 11.6774 12.2867C11.252 12.2867 11.1394 12.5189 11.1101 12.6575C11.0347 13.0177 11.0267 14.1694 11.0259 14.4282C10.8721 14.6236 10.0943 15.5438 8.97766 15.7092C8.52281 15.7753 8.09807 15.8088 7.71529 15.8088C7.3881 15.8088 7.1793 15.7836 7.0926 15.7704L6.53147 15.1284C6.75272 15.0191 6.97392 14.7886 6.91561 14.3727ZM7.62765 3.78587C7.61012 3.79342 7.59289 3.80151 7.57595 3.81012C7.57424 3.77212 7.57028 3.73358 7.5642 3.69492C7.50294 3.3423 7.26912 3.08634 7.00833 3.08634C6.98903 3.08634 6.96961 3.08782 6.9483 3.09106C6.79315 3.11691 6.67146 3.23347 6.60477 3.39872C6.66325 3.03612 6.86869 2.76765 7.11243 2.76765C7.39866 2.76765 7.64045 3.15338 7.64045 3.60994C7.64045 3.66748 7.63626 3.72473 7.62765 3.78587ZM9.85175 4.05776C9.87796 3.97431 9.89212 3.88401 9.89212 3.79029C9.89212 3.37635 9.6295 3.05205 9.29422 3.05205C8.96656 3.05205 8.69998 3.3832 8.69998 3.79029C8.69998 3.81803 8.70134 3.84583 8.70394 3.87357C8.68659 3.8669 8.66965 3.86041 8.65312 3.85415C8.61541 3.73995 8.59635 3.6208 8.59635 3.49916C8.59635 3.00419 8.91268 2.60146 9.3016 2.60146C9.69046 2.60146 10.0068 3.00419 10.0068 3.49916C10.0068 3.70507 9.95002 3.9016 9.85175 4.05776ZM9.56499 5.02115C9.55938 5.04617 9.54746 5.05727 9.41562 5.12584C9.34905 5.16049 9.26619 5.20363 9.1625 5.26678L9.09321 5.30874C8.81477 5.47752 8.16281 5.87288 7.98582 5.89607C7.8656 5.91224 7.79124 5.86562 7.62405 5.75201C7.58634 5.72634 7.5462 5.69907 7.50342 5.67163C7.20202 5.47387 7.00815 5.25603 6.98625 5.17087C7.08452 5.09492 7.32808 4.90483 7.45278 4.79228C7.7059 4.55692 7.96062 4.39876 8.08668 4.39876C8.09335 4.39876 8.09937 4.39923 8.10562 4.40041C8.25376 4.42655 8.61913 4.57238 8.886 4.67885C9.00935 4.72807 9.11587 4.77056 9.19082 4.79747C9.42695 4.87856 9.55006 4.98231 9.56499 5.02115ZM11.6865 16.0201C11.8197 15.4193 11.9731 14.6019 11.9483 14.12C11.9425 14.0105 11.9329 13.8914 11.9235 13.7762C11.906 13.5608 11.8799 13.2406 11.9068 13.1456C11.9121 13.1432 11.918 13.141 11.9245 13.1392C11.9257 13.4147 11.9855 13.9642 12.4249 14.1558C12.5559 14.213 12.7056 14.2419 12.8698 14.2419C13.31 14.2419 13.7984 14.0259 13.9985 13.8259C14.1162 13.7081 14.2153 13.5639 14.2847 13.4498C14.2999 13.4942 14.3092 13.5523 14.3043 13.6272C14.2782 14.0335 14.4757 14.5725 14.8515 14.7712L14.9062 14.7999C15.04 14.8702 15.3956 15.0568 15.4013 15.1454C15.4013 15.1454 15.3983 15.1558 15.3784 15.1742C15.2894 15.2556 14.9759 15.4157 14.6728 15.5705C14.1351 15.845 13.5257 16.1562 13.2519 16.4441C12.8666 16.8496 12.4307 17.1221 12.1675 17.1221C12.1358 17.1221 12.1069 17.1181 12.0812 17.1099C11.7954 17.0208 11.5601 16.6083 11.6865 16.0201ZM1.94215 14.4873C1.91299 14.3508 1.88998 14.2431 1.9147 14.1388C1.93265 14.0615 2.31431 13.9786 2.47731 13.9432C2.70647 13.8935 2.94349 13.8421 3.09846 13.748C3.30803 13.6211 3.42152 13.387 3.52161 13.1804C3.59409 13.031 3.66892 12.8766 3.75798 12.8259C3.76299 12.8229 3.77066 12.8195 3.7853 12.8195C3.95214 12.8195 4.30223 13.1702 4.50395 13.4842C4.55512 13.5633 4.6499 13.7219 4.75955 13.9055C5.08751 14.4542 5.53656 15.2058 5.7711 15.4577C5.98244 15.6841 6.32456 16.1195 6.2404 16.4929C6.17879 16.7826 5.85077 17.0182 5.7734 17.0703C5.74531 17.0767 5.71055 17.0799 5.66965 17.0799C5.22077 17.0799 4.33221 16.7065 3.85482 16.5058L3.78418 16.4761C3.5176 16.3644 3.08241 16.2939 2.66156 16.2258C2.3267 16.1716 1.86814 16.0974 1.79213 16.0304C1.73051 15.9613 1.80198 15.7366 1.86501 15.5384C1.9104 15.3959 1.95726 15.2486 1.98293 15.0944C2.01934 14.8484 1.9765 14.6481 1.94215 14.4873Z"
                  fill="#743A8E"
                />
              </svg>
            ) : (
              threat?.ThreatOSName
            )}
          </p>
        </div>
        {threat && (
          <p
            className="text-sm duration-200"
            dangerouslySetInnerHTML={createMarkup()}
          />
        )}
      </div>

      <hr />

      <div className={"h-[400px] w-full border border-slate-200 bg-white "}>
        <ReactFlowProvider>
          <Flow actions={actions} />
        </ReactFlowProvider>
      </div>

      <div className="flex gap-10 border border-gray-200 bg-white ">
        <div className="statusItems flex shrink p-5">
          <StatusItem
            Icon={() => (
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.54 4.67014L13.04 2.61014C12.47 2.40014 11.54 2.40014 10.97 2.61014L5.47005 4.67014C4.41005 5.07014 3.55005 6.31014 3.55005 7.44014V15.5401C3.55005 16.3501 4.08005 17.4201 4.73005 17.9001L10.23 22.0101C11.2 22.7401 12.79 22.7401 13.76 22.0101L19.26 17.9001C19.91 17.4101 20.4401 16.3501 20.4401 15.5401V7.44014C20.4501 6.31014 19.59 5.07014 18.54 4.67014ZM12.75 13.3701V16.0001C12.75 16.4101 12.41 16.7501 12 16.7501C11.59 16.7501 11.25 16.4101 11.25 16.0001V13.3701C10.24 13.0501 9.50005 12.1101 9.50005 11.0001C9.50005 9.62014 10.62 8.50014 12 8.50014C13.38 8.50014 14.5 9.62014 14.5 11.0001C14.5 12.1201 13.76 13.0501 12.75 13.3701Z"
                  fill="#743A8E"
                />
              </svg>
            )}
            label="Prevented"
            count={0}
            color="text-purple-500"
          />
          <StatusItem
            Icon={() => (
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.9999 23.2599C10.9099 23.2599 9.8299 22.9399 8.9799 22.3099L4.6799 19.0999C3.5399 18.2499 2.6499 16.4699 2.6499 15.0599V7.61994C2.6499 6.07994 3.7799 4.43994 5.2299 3.89994L10.2199 2.02994C11.2099 1.65994 12.7699 1.65994 13.7599 2.02994L18.7499 3.89994C20.1999 4.43994 21.3299 6.07994 21.3299 7.61994V15.0499C21.3299 16.4699 20.4399 18.2399 19.2999 19.0899L14.9999 22.2999C14.1699 22.9399 13.0899 23.2599 11.9999 23.2599ZM10.7499 3.43994L5.7599 5.30994C4.9099 5.62994 4.1599 6.70994 4.1599 7.62994V15.0599C4.1599 16.0099 4.8299 17.3399 5.5799 17.8999L9.8799 21.1099C11.0299 21.9699 12.9699 21.9699 14.1299 21.1099L18.4299 17.8999C19.1899 17.3299 19.8499 16.0099 19.8499 15.0599V7.61994C19.8499 6.70994 19.0999 5.62994 18.2499 5.29994L13.2599 3.42994C12.5799 3.18994 11.4199 3.18994 10.7499 3.43994Z"
                  fill="#38A169"
                />
                <path
                  d="M10.66 14.7301C10.47 14.7301 10.28 14.6601 10.13 14.5101L8.51999 12.9001C8.22999 12.6101 8.22999 12.1301 8.51999 11.8401C8.80999 11.5501 9.28999 11.5501 9.57999 11.8401L10.66 12.9201L14.43 9.15012C14.72 8.86012 15.2 8.86012 15.49 9.15012C15.78 9.44012 15.78 9.92012 15.49 10.2101L11.19 14.5101C11.04 14.6601 10.85 14.7301 10.66 14.7301Z"
                  fill="#38A169"
                />
              </svg>
            )}
            label="Detected"
            count={0}
            color="text-green-500"
          />
          <StatusItem
            Icon={() => (
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.9999 23.2599C10.9099 23.2599 9.8299 22.9399 8.9799 22.3099L4.6799 19.0999C3.5399 18.2499 2.6499 16.4699 2.6499 15.0599V7.61994C2.6499 6.07994 3.7799 4.43994 5.2299 3.89994L10.2199 2.02994C11.2099 1.65994 12.7699 1.65994 13.7599 2.02994L18.7499 3.89994C20.1999 4.43994 21.3299 6.07994 21.3299 7.61994V15.0499C21.3299 16.4699 20.4399 18.2399 19.2999 19.0899L14.9999 22.2999C14.1699 22.9399 13.0899 23.2599 11.9999 23.2599ZM10.7499 3.43994L5.7599 5.30994C4.9099 5.62994 4.1599 6.70994 4.1599 7.62994V15.0599C4.1599 16.0099 4.8299 17.3399 5.5799 17.8999L9.8799 21.1099C11.0299 21.9699 12.9699 21.9699 14.1299 21.1099L18.4299 17.8999C19.1899 17.3299 19.8499 16.0099 19.8499 15.0599V7.61994C19.8499 6.70994 19.0999 5.62994 18.2499 5.29994L13.2599 3.42994C12.5799 3.18994 11.4199 3.18994 10.7499 3.43994Z"
                  fill="#E53E3E"
                />
                <path
                  d="M14.1498 14.6899C13.9598 14.6899 13.7698 14.6199 13.6198 14.4699L9.36984 10.2199C9.07984 9.92988 9.07984 9.44988 9.36984 9.15988C9.65984 8.86988 10.1398 8.86988 10.4298 9.15988L14.6798 13.4099C14.9698 13.6999 14.9698 14.1799 14.6798 14.4699C14.5298 14.6099 14.3398 14.6899 14.1498 14.6899Z"
                  fill="#E53E3E"
                />
                <path
                  d="M9.85004 14.7299C9.66004 14.7299 9.47004 14.6599 9.32004 14.5099C9.03004 14.2199 9.03004 13.7399 9.32004 13.4499L13.57 9.19992C13.86 8.90992 14.34 8.90992 14.63 9.19992C14.92 9.48992 14.92 9.96992 14.63 10.2599L10.38 14.5099C10.24 14.6599 10.04 14.7299 9.85004 14.7299Z"
                  fill="#E53E3E"
                />
              </svg>
            )}
            label="Not Detected"
            count={0}
            color="text-red-500"
          />
          <StatusItem
            Icon={() => (
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.9999 23.2599C10.9099 23.2599 9.8299 22.9399 8.9799 22.3099L4.6799 19.0999C3.5399 18.2499 2.6499 16.4699 2.6499 15.0599V7.61994C2.6499 6.07994 3.7799 4.43994 5.2299 3.89994L10.2199 2.02994C11.2099 1.65994 12.7699 1.65994 13.7599 2.02994L18.7499 3.89994C20.1999 4.43994 21.3299 6.07994 21.3299 7.61994V15.0499C21.3299 16.4699 20.4399 18.2399 19.2999 19.0899L14.9999 22.2999C14.1699 22.9399 13.0899 23.2599 11.9999 23.2599ZM10.7499 3.43994L5.7599 5.30994C4.9099 5.62994 4.1599 6.70994 4.1599 7.62994V15.0599C4.1599 16.0099 4.8299 17.3399 5.5799 17.8999L9.8799 21.1099C11.0299 21.9699 12.9699 21.9699 14.1299 21.1099L18.4299 17.8999C19.1899 17.3299 19.8499 16.0099 19.8499 15.0599V7.61994C19.8499 6.70994 19.0999 5.62994 18.2499 5.29994L13.2599 3.42994C12.5799 3.18994 11.4199 3.18994 10.7499 3.43994Z"
                  fill="#718096"
                />
              </svg>
            )}
            label="Not Threat"
            count={0}
            color="text-gray-500"
          />
        </div>
        <div className="grow border-l border-l-gray-200  p-5">
          <div
            className={
              "mr-4 flex items-center  justify-center gap-2 last:mr-0 "
            }
          >
            <div className=" text-sm">
              <div className={` font-medium text-green-600`}>Success</div>
              <div className="text-lg font-bold">{finalReport.success}</div>
            </div>
          </div>
        </div>
        <div className="grow border-l border-l-gray-200  p-5">
          <div
            className={
              "mr-4 flex items-center  justify-center gap-2 last:mr-0 "
            }
          >
            <div className=" text-sm">
              <div className={`font-medium text-red-600`}>Fail</div>
              <div className="text-lg font-bold">{finalReport.fail}</div>
            </div>
          </div>
        </div>
        <div className="grow border-l border-l-gray-200  p-5">
          <div
            className={
              "mr-4 flex items-center  justify-center gap-2 last:mr-0 "
            }
          >
            <div className="text-sm">
              <div className={`text-grey-600 font-medium`}>Unknown</div>
              <div className="text-lg font-bold">{finalReport.unknown}</div>
            </div>
          </div>
        </div>
      </div>

      <ThreatTable actions={actions} />
    </div>
  );
}

const ThreatTable = ({ actions }: any) => {
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const onGetMessage = (data: any) => {
    if (data.Event == 6) {
      setSelectedItem(data);
    }
  };

  const getData = (id: string, name: string) => {
    webSocket.send(
      JSON.stringify({
        type: "ActionInfo",
        id: id,
        service: name,
      })
    );
    // @ts-ignore
    webSocket.on("message", onGetMessage);
  };

  return (
    <>
      <div className="relative mt-5 overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Time
              </th>
              <th scope="col" className="px-6 py-3">
                Technique
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                User
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {actions.map((item: any) => (
              <tr
                key={item.ID}
                className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <td className="px-6 py-4">{item.Time}</td>
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  {item.Body.techniques}
                </th>
                <td className="px-6 py-4"> {item.Body.Name}</td>
                <td className="px-6 py-4">{item.Body.UserName}</td>
                <td className="px-6 py-4">
                  {item.Event === 1 ? (
                    item.Body.RetCode === 99 ? (
                      <span className="me-2 animate-pulse rounded bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                        IN PROGRESS
                      </span>
                    ) : item.Body.RetCode === 0 ? (
                      <span className="me-2 rounded  bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-blue-300">
                        Failure
                      </span>
                    ) : item.Body.RetCode === 1 ? (
                      <span className="me-2 rounded  bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-blue-300">
                        Success
                      </span>
                    ) : (
                      <span className="me-2 rounded  bg-gray-200 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-900 dark:text-blue-300">
                        Unknown
                      </span>
                    )
                  ) : (
                    <span className="me-2 animate-pulse rounded bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      IN PROGRESS
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 ">
                  <a
                    className="cursor-pointer text-primary-70 hover:underline"
                    onClick={() => (
                      setSelectedItem(item),
                      getData(item.ID, item.Body.TrackerID)
                    )}
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <SimulationActionControl
        data={selectedItem}
        setSidebarOpen={() => setSelectedItem(null)}
        status={"VIEW"}
      />
    </>
  );
};

const StatusItem = ({ Icon, label, count, color, className }: any) => {
  return (
    <div
      className={
        "mr-4 flex items-center  justify-center gap-2 last:mr-0 " + className
      }
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-full  border border-gray-200 bg-white ${color}`}
      >
        <Icon className="h-6 w-6" />
      </div>
      <div className="ml-2 text-sm">
        <div className={`font-medium ${color}`}>{label}</div>
        <div className="text-lg font-bold">{count}</div>
      </div>
    </div>
  );
};
