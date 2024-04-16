import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../images/logo/logo.svg";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
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

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden border-r border-stroke bg-white duration-300 ease-linear lg:static lg:translate-x-0 dark:border-stroke dark:bg-boxdark ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="dark flex h-[73px] items-center justify-between gap-2 border-b border-stroke px-4 py-4 md:px-6 2xl:px-11 dark:border-stroke">
        <NavLink
          to="/"
          className="mx-[auto] flex justify-center gap-2 text-center"
        >
          <img src={Logo} alt="Logo" width={"42.104px"} />
          <h3 className="text-[17px] font-bold text-[#171923]">Thawd</h3>
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-2 ml-4 text-sm font-semibold text-bodydark2">
              OVERVIEW
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <NavLink
                  to="/"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-gray-700 duration-300 ease-in-out ${
                    pathname === "/"
                      ? "bg-primary text-white dark:bg-meta-4"
                      : "hover:bg-gray-200 hover:text-black dark:hover:bg-meta-4"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                    />
                  </svg>
                  Dashboard
                </NavLink>
              </li>
            </ul>
            <h3 className="mb-2 ml-4 text-sm font-semibold text-bodydark2">
              CONTENT
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <NavLink
                  to="/simulate-threat"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-gray-700 duration-300 ease-in-out ${
                    pathname.includes("simulate-threat")
                      ? "bg-primary text-white dark:bg-meta-4"
                      : "hover:bg-gray-200 hover:text-black dark:hover:bg-meta-4"
                  }`}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.05 16.375C15.7083 16.375 15.425 16.0917 15.425 15.75V5.91669C15.425 5.07502 15.25 4.79169 14.1917 4.79169H13.325C12.2667 4.79169 12.0917 5.07502 12.0917 5.91669V15.75C12.0917 16.0917 11.8083 16.375 11.4667 16.375C11.125 16.375 10.8417 16.0917 10.8417 15.75V5.91669C10.8417 4.31669 11.6583 3.54169 13.325 3.54169H14.1917C15.8667 3.54169 16.675 4.31669 16.675 5.91669V15.75C16.675 16.0917 16.3917 16.375 16.05 16.375Z"
                      fill={
                        pathname.includes("simulate-threat")
                          ? "#fff"
                          : "#514F56"
                      }
                    />
                    <path
                      d="M8.9667 16.375C8.62503 16.375 8.3417 16.0916 8.3417 15.75V10.0833C8.3417 9.24165 8.1667 8.95831 7.10836 8.95831H6.2417C5.18336 8.95831 5.00836 9.24165 5.00836 10.0833V15.75C5.00836 16.0916 4.72503 16.375 4.38336 16.375C4.0417 16.375 3.75836 16.0916 3.75836 15.75V10.0833C3.75836 8.48331 4.57503 7.70831 6.2417 7.70831H7.10836C8.78336 7.70831 9.5917 8.48331 9.5917 10.0833V15.75C9.5917 16.0916 9.30836 16.375 8.9667 16.375Z"
                      fill={
                        pathname.includes("simulate-threat")
                          ? "#fff"
                          : "#514F56"
                      }
                    />
                    <path
                      d="M18.3334 16.4583H1.66669C1.32502 16.4583 1.04169 16.175 1.04169 15.8333C1.04169 15.4916 1.31669 15.2083 1.66669 15.2083H18.3334C18.675 15.2083 18.9584 15.4916 18.9584 15.8333C18.9584 16.175 18.6834 16.4583 18.3334 16.4583Z"
                      fill={
                        pathname.includes("simulate-threat")
                          ? "#fff"
                          : "#514F56"
                      }
                    />
                  </svg>
                  Simulate Threat
                </NavLink>
              </li>
              {/* <!-- Menu Item Profile --> */}

              {/* <!-- Menu Item Tables --> */}
              <li>
                <NavLink
                  to="/threat_builder"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-gray-700 duration-300 ease-in-out  ${
                    pathname.includes("threat_builder")
                      ? "bg-primary text-white dark:bg-meta-4"
                      : "hover:bg-gray-200 hover:text-black dark:hover:bg-meta-4"
                  }`}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.9 17.3583C13.8917 17.3583 13.875 17.3583 13.8667 17.3583H4.62501C2.17501 17.1833 1.07501 15.3 1.07501 13.6167C1.07501 12.1167 1.95001 10.45 3.85835 9.99165C3.32501 7.90832 3.77501 5.94998 5.13335 4.53332C6.67501 2.91665 9.15001 2.27498 11.275 2.93332C13.225 3.53332 14.6 5.14165 15.1 7.37498C16.8083 7.75832 18.1667 9.04998 18.7167 10.8333C19.3083 12.775 18.775 14.7667 17.3167 16.0417C16.3833 16.8833 15.1667 17.3583 13.9 17.3583ZM4.64168 11.125C4.63335 11.125 4.63335 11.125 4.62501 11.125C3.04168 11.2417 2.31668 12.4583 2.31668 13.6167C2.31668 14.775 3.04168 15.9917 4.65835 16.1083H13.8583C14.825 16.0917 15.75 15.7583 16.4667 15.1083C17.7667 13.9667 17.8583 12.3417 17.5083 11.2C17.1583 10.05 16.1833 8.74998 14.4833 8.53332C14.2083 8.49998 13.9917 8.29165 13.9417 8.01665C13.6083 6.01665 12.525 4.63332 10.9 4.13332C9.20835 3.61665 7.25835 4.12498 6.03335 5.39998C4.92501 6.55832 4.60835 8.15832 5.12501 9.91665C5.55001 9.97498 5.95835 10.1 6.33335 10.2917C6.64168 10.45 6.76668 10.825 6.60835 11.1333C6.45001 11.4417 6.07501 11.5667 5.76668 11.4083C5.42501 11.2333 5.05001 11.1417 4.67501 11.1417C4.66668 11.125 4.65835 11.125 4.64168 11.125Z"
                      fill={
                        pathname.includes("threat_builder") ? "#fff" : "#514F56"
                      }
                    />
                    <path
                      d="M13.2084 8.89169C12.975 8.89169 12.7584 8.76669 12.65 8.54169C12.4917 8.23335 12.625 7.85835 12.9334 7.70002C13.45 7.44169 14.025 7.30002 14.5917 7.29169C14.925 7.28336 15.225 7.55835 15.225 7.90835C15.2334 8.25002 14.9584 8.54169 14.6084 8.54169C14.225 8.55002 13.8334 8.64169 13.4834 8.81669C13.3917 8.86669 13.3 8.89169 13.2084 8.89169Z"
                      fill={
                        pathname.includes("threat_builder") ? "#fff" : "#514F56"
                      }
                    />
                  </svg>
                  Build Threat
                </NavLink>
              </li>
              {/* <!-- Menu Item Tables --> */}

              {/* <!-- Menu Item Settings --> */}
              {/* <li>
                <NavLink
                  to="/"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-gray-700 duration-300 ease-in-out ${
                    pathname.includes("settings")
                      ? "bg-primary text-white dark:bg-meta-4"
                      : "hover:bg-gray-200 hover:text-black dark:hover:bg-meta-4"
                  }`}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 11.0833C9.8917 11.0833 9.78336 11.0583 9.68336 11L2.32503 6.74165C2.03336 6.56665 1.92503 6.18332 2.10003 5.88332C2.27503 5.58332 2.65836 5.48332 2.95836 5.65832L10 9.73332L17 5.68332C17.3 5.50832 17.6834 5.61665 17.8584 5.90832C18.0334 6.20832 17.925 6.59165 17.6334 6.76665L10.325 11C10.2167 11.05 10.1084 11.0833 10 11.0833Z"
                      fill="#514F56"
                    />
                    <path
                      d="M10 18.6333C9.65833 18.6333 9.375 18.35 9.375 18.0083V10.45C9.375 10.1083 9.65833 9.82501 10 9.82501C10.3417 9.82501 10.625 10.1083 10.625 10.45V18.0083C10.625 18.35 10.3417 18.6333 10 18.6333Z"
                      fill="#514F56"
                    />
                    <path
                      d="M9.99997 18.9584C9.26664 18.9584 8.54164 18.8 7.96664 18.4834L3.51664 16.0084C2.3083 15.3417 1.36664 13.7334 1.36664 12.35V7.64169C1.36664 6.25835 2.3083 4.65835 3.51664 3.98335L7.96664 1.51669C9.10831 0.883354 10.8916 0.883354 12.0333 1.51669L16.4833 3.99169C17.6916 4.65835 18.6333 6.26669 18.6333 7.65002V12.3584C18.6333 13.7417 17.6916 15.3417 16.4833 16.0167L12.0333 18.4834C11.4583 18.8 10.7333 18.9584 9.99997 18.9584ZM9.99997 2.29169C9.47497 2.29169 8.9583 2.40002 8.57497 2.60835L4.12497 5.08335C3.32497 5.52502 2.61664 6.72502 2.61664 7.64169V12.35C2.61664 13.2667 3.32497 14.4667 4.12497 14.9167L8.57497 17.3917C9.3333 17.8167 10.6666 17.8167 11.425 17.3917L15.875 14.9167C16.675 14.4667 17.3833 13.275 17.3833 12.35V7.64169C17.3833 6.72502 16.675 5.52502 15.875 5.07502L11.425 2.60002C11.0416 2.40002 10.525 2.29169 9.99997 2.29169Z"
                      fill="#514F56"
                    />
                  </svg>
                  MITRE ATT&CK
                </NavLink>
              </li> */}
              {/* <!-- Menu Item Settings --> */}
            </ul>
          </div>

          <div>
            <h3 className="mb-2 ml-4 text-sm font-semibold text-bodydark2">
              AGENTS
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Chart --> */}
              <li>
                <NavLink
                  to="/agents"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-gray-700 duration-300 ease-in-out hover:bg-gray-200 hover:text-black dark:hover:bg-meta-4 ${
                    pathname.includes("agents") &&
                    "bg-primary text-white dark:bg-meta-4"
                  }`}
                >
                  <svg
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m17.5 15.5c0 1.11-.89 2-2 2s-2-.89-2-2 .9-2 2-2 2 .9 2 2m-9-2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.89 2-2-.89-2-2-2m14.5 1.5v3c0 .55-.45 1-1 1h-1v1c0 1.11-.89 2-2 2h-14c-1.1 0-2-.89-2-2v-1h-1c-.55 0-1-.45-1-1v-3c0-.55.45-1 1-1h1c0-3.87 3.13-7 7-7h1v-1.27c-.6-.34-1-.99-1-1.73 0-1.1.9-2 2-2s2 .9 2 2c0 .74-.4 1.39-1 1.73v1.27h1c3.87 0 7 3.13 7 7h1c.55 0 1 .45 1 1m-2 1h-2v-2c0-2.76-2.24-5-5-5h-4c-2.76 0-5 2.24-5 5v2h-2v1h2v3h14v-3h2z" />
                  </svg>{" "}
                  Agents
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/attacks-library"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-gray-700 duration-300 ease-in-out hover:bg-gray-200 hover:text-black dark:hover:bg-meta-4 ${
                    pathname.includes("attacks-library") &&
                    "bg-primary text-white dark:bg-meta-4"
                  }`}
                >
                  <svg
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m17.5 15.5c0 1.11-.89 2-2 2s-2-.89-2-2 .9-2 2-2 2 .9 2 2m-9-2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.89 2-2-.89-2-2-2m14.5 1.5v3c0 .55-.45 1-1 1h-1v1c0 1.11-.89 2-2 2h-14c-1.1 0-2-.89-2-2v-1h-1c-.55 0-1-.45-1-1v-3c0-.55.45-1 1-1h1c0-3.87 3.13-7 7-7h1v-1.27c-.6-.34-1-.99-1-1.73 0-1.1.9-2 2-2s2 .9 2 2c0 .74-.4 1.39-1 1.73v1.27h1c3.87 0 7 3.13 7 7h1c.55 0 1 .45 1 1m-2 1h-2v-2c0-2.76-2.24-5-5-5h-4c-2.76 0-5 2.24-5 5v2h-2v1h2v3h14v-3h2z" />
                  </svg>{" "}
                  Attacks Library
                </NavLink>
              </li>
              {/* <!-- Menu Item Chart --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
