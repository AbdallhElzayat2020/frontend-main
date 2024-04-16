import { useEffect, useRef, useState } from "react";
import Prevention from "./Prevention";
import Detection from "./Detection";
import Alert from "./Alert";
import Details from "./Details";
import Overview from "./Overview";

export default function SimulationActionControl({
  data,
  setSidebarOpen,
}: {
  data: any;
  setSidebarOpen: (data: any) => void;

  status: "EDIT" | "VIEW";
}) {
  const [tab, setTab] = useState(0);
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !!data ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!!data || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const LIST_FILTERS = [
    {
      text: "Overview",
      icon: <img src="/conditions.svg" />,
      content: <Overview data={data?.Body?.actioninfo?.overview} />,
    },
    {
      text: "Details",
      icon: <img src="/loop.svg" />,
      content: <Details data={data?.Body?.actioninfo?.procedure} />,
    },
    {
      text: "Alert",
      icon: <img src="/loop.svg" />,
      content: <Alert data={data?.Body?.actioninfo?.alert} />,
    },
    {
      text: "Detection",
      icon: <img src="/delay.svg" />,
      content: <Detection data={data?.Body?.actioninfo?.detection} />,
    },
    {
      text: "Prevention",
      icon: <img src="/conditions.svg" />,
      content: <Prevention data={data?.Body?.actioninfo?.prevention} />,
    },
  ];

  return (
    <aside
      ref={sidebar}
      style={{ marginTop: "50px" }}
      className={`fixed right-0 top-5 z-1 flex h-screen w-[500px] flex-col bg-white font-medium shadow-2 duration-300 ease-linear dark:bg-boxdark ${
        data ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="animate space-y-2 px-6 py-5">
        <span className="rounded bg-red-500/20 px-2 py-1 text-[12px] font-semibold text-red-500">
          ATTACK
        </span>
        <h2 className="text-gray-900">
          {data?.Body?.actioninfo?.procedure.Name}
        </h2>
      </div>
      <button
        onClick={() => setSidebarOpen(null)}
        className={`${
          data ? "" : "hidden"
        } absolute left-[-20px] top-[80px] z-1 rounded-full border border-[#E3E8EF] bg-white p-1 text-black duration-300 ease-linear hover:text-black dark:bg-boxdark dark:text-white dark:hover:bg-boxdark dark:hover:bg-opacity-10 dark:hover:text-white`}
      >
        <svg
          width="23"
          height="23"
          viewBox="0 0 23 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.6169 14.4956C16.4236 14.3023 16.4236 13.9818 16.6169 13.7885L19.0918 11.3136L16.6169 8.83874C16.4236 8.64546 16.4236 8.32491 16.6169 8.13163C16.8102 7.93835 17.1307 7.93835 17.324 8.13163L20.1524 10.9601C20.3457 11.1533 20.3457 11.4739 20.1524 11.6672L17.324 14.4956C17.1307 14.6889 16.8102 14.6889 16.6169 14.4956Z"
            fill="#1A202C"
          />
          <path
            d="M5.30343 14.4956L2.475 11.6672C2.28173 11.4739 2.28173 11.1533 2.475 10.9601L5.30343 8.13163C5.4967 7.93835 5.81726 7.93835 6.01054 8.13163C6.20381 8.32491 6.20381 8.64546 6.01054 8.83874L3.53566 11.3136L6.01054 13.7885C6.20381 13.9818 6.20381 14.3023 6.01054 14.4956C5.81726 14.6889 5.49671 14.6889 5.30343 14.4956Z"
            fill="#1A202C"
          />
          <path
            d="M12.3743 11.6673C12.2848 11.5778 12.2282 11.4552 12.2282 11.3138C12.2282 11.0404 12.4545 10.8141 12.7279 10.8141L19.799 10.8141C20.0724 10.8141 20.2987 11.0404 20.2987 11.3138C20.2987 11.5872 20.0724 11.8135 19.799 11.8135L12.7279 11.8135C12.5865 11.8135 12.4639 11.7569 12.3743 11.6673Z"
            fill="#1A202C"
          />
          <path
            d="M2.47493 11.6673C2.38536 11.5778 2.32879 11.4552 2.32879 11.3138C2.32879 11.0404 2.55507 10.8141 2.82848 10.8141L9.89955 10.8141C10.173 10.8141 10.3992 11.0404 10.3992 11.3138C10.3992 11.5872 10.173 11.8135 9.89955 11.8135L2.82848 11.8135C2.68706 11.8135 2.56449 11.7569 2.47493 11.6673Z"
            fill="#292D32"
          />
        </svg>
      </button>

      <div className="flex border border-y border-solid border-gray-200 bg-[#F5F8FA] px-2">
        {LIST_FILTERS.map((item, index) => (
          <div
            onClick={() => setTab(index)}
            className={`flex flex-1 items-center justify-center px-0 py-[15px] transition-all cursor-pointer${
              tab === index ? " border-b border-[#743A8E] bg-[#C999DE1A]" : ""
            }`}
          >
            <p
              className={`${tab === index ? "text-[#743A8E]" : ""} font-medium`}
            >
              {item.text}
            </p>
          </div>
        ))}
      </div>

      <div className="mb-4 h-screen overflow-y-auto py-1">
        {LIST_FILTERS[tab].content}
      </div>
    </aside>
  );
}
