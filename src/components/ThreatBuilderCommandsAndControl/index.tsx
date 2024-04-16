import { useEffect, useRef, useState } from "react";
import ProgressTab from "./ProgressTab";
import ConditionsTab from "./ConditionsTab";
import DelayTab from "./DelayTab";
import LoopTab from "./LoopTab";

export default function ThreatBuilderCommandsAndControl({
  sidebarOpen,
  setSidebarOpen,
  expanded,
  setExpanded,
  status,
}: {
  sidebarOpen: any;
  setSidebarOpen: (sidebarOpen: any) => void;
  expanded: any;
  setExpanded: (expanded: boolean) => void;
  status: "EDIT" | "VIEW";
}) {
  const [tab, setTab] = useState(0);
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem(
    "ThreatBuilder-sidebar-expanded"
  );
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  console.log(sidebarOpen)

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !!sidebarOpen ||
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
      if (!!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  const LIST_FILTERS = [
    {
      text: "Progress",
      icon: <img src="/progress.svg" />,
      content: (
        <ProgressTab
          {...{ sidebarOpen, setSidebarOpen, disabled: status === "VIEW" }}
        />
      ),
    },
    {
      text: "Conditions",
      icon: <img src="/conditions.svg" />,
      content: <ConditionsTab />,
    },
    {
      text: "Delay",
      icon: <img src="/delay.svg" />,
      content: <DelayTab />,
    },
    {
      text: "Loop",
      icon: <img src="/loop.svg" />,
      content: <LoopTab />,
    },
  ];

  return (
    <aside
      ref={sidebar}
      className={`absolute right-0 top-0 z-1 flex h-screen w-[500px] flex-col bg-white shadow-2 duration-300 ease-linear dark:bg-boxdark ${
        expanded ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="absolute left-[-20px] top-[10px] z-1 rounded-full border border-[#E3E8EF] bg-white p-1 text-black duration-300 ease-linear hover:text-black dark:bg-boxdark dark:text-white dark:hover:bg-boxdark dark:hover:bg-opacity-10 dark:hover:text-white"
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

      <div className="flex items-center gap-2 px-[24px] py-[20px]">
        <div
          className={`flex w-full flex-1 flex-col gap-2 ${
            status === "VIEW" ? "opacity-50" : ""
          }`}
        >
          <label htmlFor="name" className="font-medium text-[#4A5568]">
            Attack name
          </label>
          <input
            id="name"
            type="text"
            disabled={status === "VIEW"}
            value={sidebarOpen.ProcedureName}
            className={`
              rounded-md border border-[#E3E8EF] px-[20px]
              py-[16px] text-[#4A5568] outline-none dark:bg-boxdark dark:text-white
            `}
            onChange={(e) => {
              setSidebarOpen({ ...sidebarOpen, Name: e.target.value });
            }}
          />
        </div>
      </div>

      <div className="flex">
        {LIST_FILTERS.map((item, index) => (
          <div
            onClick={() => setTab(index)}
            className={`flex flex-1 items-center justify-center gap-2 px-[15px] py-[15px] transition-all cursor-pointer${
              tab === index ? " border-b border-[#743A8E] bg-[#C999DE1A]" : ""
            }`}
          >
            {item.icon}
            <p
              className={`${tab === index ? "text-[#743A8E]" : ""} font-medium`}
            >
              {item.text}
            </p>
          </div>
        ))}
      </div>

      <div className="px-[24px] py-[20px]">{LIST_FILTERS[tab].content}</div>
    </aside>
  );
}
