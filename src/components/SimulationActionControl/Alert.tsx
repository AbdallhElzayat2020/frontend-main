import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
// @ts-ignore
import moment from "moment";

export default function Alert(data: any) {
  const splunk = data?.data?.filter((alert: any) => alert.Product == "Splunk");
  const fireeye = data?.data?.filter(
    (alert: any) => alert.Product == "FireEye HX"
  );

  return (
    <div className="animate py-4">
      <div className="flex flex-col gap-2 px-6 pb-4">
        <span className="text-start text-sm font-medium">Platform</span>
        <Accordion.Root className="w-full" collapsible>
          <Accordion.Item
            className="mt-px w-full overflow-hidden focus-within:relative"
            value="item-1"
          >
            <Accordion.Trigger className="group flex w-full flex-1 cursor-pointer items-center justify-between border border-solid border-gray-200 bg-white px-4 py-3 leading-none text-gray-900 outline-none">
              Splunk
              <ChevronDownIcon
                className="text-violet10 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
                aria-hidden
              />
            </Accordion.Trigger>

            <Accordion.Content className="data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown mt-4 space-y-2 overflow-hidden">
              <span className="text-start text-sm font-medium">
                Alerts ({splunk?.length})
              </span>
              <table className="w-full border border-solid border-gray-200 px-2 py-4">
                <tr className="border border-solid border-gray-200 bg-gray-50">
                  <th className="py-2 ps-4 text-start text-sm font-medium ">
                    Time
                  </th>
                  <th className="py-2 ps-4 text-start text-sm font-medium ">
                    Name
                  </th>
                  <th className="py-2 ps-4 text-start text-sm font-medium ">
                    Logs
                  </th>
                </tr>
                {splunk?.map((alert: any, index: any) => {
                  return (
                    <tr
                      key={index}
                      className="border-b border-solid border-gray-200"
                    >
                      <td className="py-2 ps-4 text-start text-sm font-medium">
                        {moment(alert.CreatedAt).format("hh:mm:ss")}
                      </td>
                      <td className="py-2 ps-4 text-start text-sm font-medium">
                        {alert.Name}{" "}
                      </td>
                      <td className="inline-flex items-center gap-1 py-2 ps-4 text-start text-sm font-medium">
                        Information{" "}
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="16" height="16" fill="white" />
                          <path
                            d="M8 11.0008L3 6.00078L3.7 5.30078L8 9.60078L12.3 5.30078L13 6.00078L8 11.0008Z"
                            fill="#718096"
                          />
                        </svg>
                      </td>
                    </tr>
                  );
                })}
              </table>{" "}
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </div>
      <hr />
      <div className="flex flex-col gap-2 px-6 py-4">
        <Accordion.Root className="w-full" collapsible>
          <Accordion.Item
            className="mt-px w-full overflow-hidden focus-within:relative"
            value="item-1"
          >
            <Accordion.Trigger className="group flex w-full flex-1 cursor-pointer  items-center justify-between border border-solid border-gray-200 bg-white px-4 py-3 leading-none text-gray-900 outline-none">
              FireEye HX
              <ChevronDownIcon
                className="text-violet10 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
                aria-hidden
              />
            </Accordion.Trigger>

            <Accordion.Content className="data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown mt-4 space-y-2 overflow-hidden">
              <div className="inline-flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-start text-sm font-medium">
                  Alerts ({fireeye?.length})
                </span>{" "}
              </div>
              <table className="w-full border border-solid border-gray-200 px-2 py-4">
                <tr className="border border-solid border-gray-200 bg-gray-50">
                  <th className="py-2 ps-4 text-start text-sm font-medium ">
                    Time
                  </th>
                  <th className="py-2 ps-4 text-start text-sm font-medium ">
                    Name
                  </th>
                  <th className="py-2 ps-4 text-start text-sm font-medium ">
                    Logs
                  </th>
                </tr>
                {fireeye?.map((alert: any, index: any) => {
                  return (
                    <tr
                      key={index}
                      className="border-b border-solid border-gray-200"
                    >
                      <td className="py-2 ps-4 text-start text-sm font-medium">
                        {moment(alert.CreatedAt).format("hh:mm:ss")}
                      </td>
                      <td className="py-2 ps-4 text-start text-sm font-medium">
                        {alert.Name}{" "}
                      </td>
                      <td className="inline-flex items-center gap-1 py-2 ps-4 text-start text-sm font-medium">
                        Information{" "}
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="16" height="16" fill="white" />
                          <path
                            d="M8 11.0008L3 6.00078L3.7 5.30078L8 9.60078L12.3 5.30078L13 6.00078L8 11.0008Z"
                            fill="#718096"
                          />
                        </svg>
                      </td>
                    </tr>
                  );
                })}
              </table>{" "}
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </div>
    </div>
  );
}
