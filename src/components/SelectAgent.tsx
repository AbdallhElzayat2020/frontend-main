import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "./ui/input";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
export default function SelectAgent({
  setOpen,
  onSelect,
  open,
  agents,
}: {
  setOpen: (open: boolean) => void;
  onSelect: Function;
  open: boolean;
  agents: any;
}) {
  const [selectedAgent, selectAgent] = useState<any>();
  const [filteredAgents, setFilteredAgents] = useState([]);

  const handleFilter = (event: any) => {
    const value = event.target.value.trim();
    console.log("hahaa", value);
    const filtered = agents?.filter((agent: any) =>
      agent?.HostName?.includes(value)
    );

    setFilteredAgents(filtered);
  };

  useEffect(() => {
    setFilteredAgents(agents);
  }, [agents]);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Select Agent</DialogTitle>
          </DialogHeader>
          <div className="flex  w-full flex-col gap-1 overflow-y-hidden">
            <div className="mb-2 flex items-center  border border-gray-200 ps-2">
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.58329 18.4246C4.87496 18.4246 1.04163 14.5913 1.04163 9.88298C1.04163 5.17464 4.87496 1.34131 9.58329 1.34131C14.2916 1.34131 18.125 5.17464 18.125 9.88298C18.125 14.5913 14.2916 18.4246 9.58329 18.4246ZM9.58329 2.59131C5.55829 2.59131 2.29163 5.86631 2.29163 9.88298C2.29163 13.8996 5.55829 17.1746 9.58329 17.1746C13.6083 17.1746 16.875 13.8996 16.875 9.88298C16.875 5.86631 13.6083 2.59131 9.58329 2.59131Z"
                  fill="#718096"
                />
                <path
                  d="M18.3333 19.2583C18.175 19.2583 18.0166 19.2 17.8916 19.075L16.225 17.4083C15.9833 17.1667 15.9833 16.7667 16.225 16.525C16.4666 16.2833 16.8666 16.2833 17.1083 16.525L18.775 18.1917C19.0166 18.4333 19.0166 18.8333 18.775 19.075C18.65 19.2 18.4916 19.2583 18.3333 19.2583Z"
                  fill="#718096"
                />
              </svg>

              <Input
                placeholder="Search for agent "
                type="text"
                onChange={handleFilter}
                className="w-full border-none focus-visible:ring-0"
              />
            </div>

            <div className="w-full border border-b-0 border-solid border-gray-200">
              <table className="w-full overflow-hidden text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                <thead className="animate border-b-[1px] border-gray-200 bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Hostname
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Domain\User
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Process
                    </th>
                    <th scope="col" className="px-6 py-3">
                      OS
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Version
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {filteredAgents.map((agent: any) => (
                    <tr
                      key={agent?.ID}
                      onClick={() => selectAgent(agent)}
                      className={`animate cursor-pointer border-b-[1px] border-gray-200 bg-white  duration-200 hover:bg-gray-100 ${
                        selectedAgent == agent
                          ? "border-primary bg-gradient-to-tl from-primary-70/20"
                          : null
                      }`}
                    >
                      <th
                        scope="row"
                        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                      >
                        {agent?.HostName}
                      </th>
                      <td className="px-6 py-4">
                        {agent?.UserName}\{agent?.Domain}
                      </td>
                      <td className="px-6 py-4">
                        {agent?.ProcessID} ({agent?.ProcessName})
                      </td>
                      <td className="px-6 py-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15"
                          height="18"
                          viewBox="0 0 15 18"
                          fill="none"
                        >
                          <g clipPath="url(#clip0_1214_4384)">
                            <path
                              d="M0 3.61113L6.09609 2.77109V8.66133H0V3.61113ZM0 14.3889L6.09609 15.2289V9.41172H0V14.3889ZM6.7668 15.3186L14.875 16.4375V9.41172H6.7668V15.3186ZM6.7668 2.68145V8.66133H14.875V1.5625L6.7668 2.68145Z"
                              fill="#743A8E"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_1214_4384">
                              <rect
                                width="14.875"
                                height="17"
                                fill="white"
                                transform="translate(0 0.5)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </td>
                      <td className="px-6 py-4">{agent?.AgentVersion}</td>
                      <td className="px-6 py-4">
                        {agent?.AgentStatus == "Connected" ? (
                          <span className="rounded-full bg-green-700/10 px-3 py-1 text-green-600">
                            {agent?.AgentStatus}
                          </span>
                        ) : (
                          <span className="rounded-full bg-red-700/10 px-1 py-1 text-red-600">
                            {agent?.AgentStatus}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex w-full">
              <div className="ms-auto flex gap-2">
                <button
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 bg-primary/10 px-4.5 py-2 font-medium text-primary duration-200 hover:bg-primary/20 hover:bg-opacity-80"
                >
                  Cancel
                </button>
                <button
                  onClick={() => onSelect(selectedAgent)}
                  className="flex items-center gap-2 bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80"
                >
                  Simulate
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
