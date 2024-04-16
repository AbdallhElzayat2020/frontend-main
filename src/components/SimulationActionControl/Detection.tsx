import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
// @ts-ignore
import moment from "moment";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import TextExtender from "./TextExtender";

export default function Detection(data: any) {
  const platforms = data?.data?.map((item: any) => item.Platform);
  const uniquePlatforms = [...new Set(platforms)];

  const [platform, setPlatform] = useState(uniquePlatforms[0]);
  const [rule, setRule] = useState("");

  const selectedData = data?.data?.filter(
    (item: any) => item.Name == rule && item.Platform == platform
  );

  return (
    <div className={`animate h-full overflow-y-auto pb-17`}>
      <div className="animate space-y-2 px-6 py-4">
        <span className="text-start text-sm font-medium">
          Content Sources ({uniquePlatforms?.length})
        </span>
        <Select onValueChange={(value: string) => setPlatform(value)}>
          <SelectTrigger className="w-full py-6 text-gray-950">
            <SelectValue placeholder="Select platform..." />
          </SelectTrigger>
          <SelectContent>
            {uniquePlatforms?.map((pl: any) => (
              <SelectItem className="py-3 text-gray-950" value={pl}>
                {pl}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="animate space-y-2 px-6 pb-4 pt-2">
        <span className="text-start text-sm font-medium">Rules (1)</span>
        <Select onValueChange={(value: string) => setRule(value)}>
          <SelectTrigger className="w-full py-6 text-gray-950">
            <SelectValue placeholder="Select rule..." />
          </SelectTrigger>
          <SelectContent>
            {data?.data?.map((item: any) =>
              item.Platform == platform ? (
                <SelectItem className="py-3 text-gray-950" value={item.Name}>
                  {item.Name}
                </SelectItem>
              ) : (
                ""
              )
            )}
          </SelectContent>
        </Select>
      </div>
      <hr />
      {selectedData?.length ? (
        <>
          {" "}
          {/* Attack Status */}
          <div className={`animate`}>
            <div className="flex">
              <div className="flex w-54 flex-col gap-1 px-6 pb-2 pt-4">
                <span className="text-start text-sm font-medium">Platform</span>
                <span className="text-gray-900">
                  {selectedData[0]?.Platform}
                </span>
              </div>
              <div className="flex w-54 flex-col gap-1 px-6 pb-2 pt-4">
                <span className="text-start text-sm font-medium">Author</span>
                <span className="text-gray-900">{selectedData[0]?.Author}</span>
              </div>
            </div>
            <div className="flex">
              <div className="flex w-54 flex-col gap-1 px-6 pb-4 pt-2">
                <span className="text-start text-sm font-medium">
                  Update Date
                </span>
                <span className="text-gray-900">
                  {selectedData[0]?.UpdatedAt}
                </span>
              </div>
              <div className="flex w-54 flex-col gap-1 px-6 pb-4 pt-2">
                <span className="text-start text-sm font-medium">
                  Release Date
                </span>

                <span className="text-gray-900">
                  {selectedData[0]?.CreatedAt}
                </span>
              </div>
            </div>
            <div className="flex">
              <div className="flex w-54 flex-col gap-1 px-6 pb-4 pt-2">
                <span className="text-start text-sm font-medium">
                  Complexity
                </span>
                <span className="text-red-500">
                  {selectedData[0]?.Severity}
                </span>
              </div>
              <div className="inline-flex w-54 items-center gap-2 px-6 pb-4 pt-2">
                <button className="inline-flex items-center gap-2 bg-green-300 bg-primary-70/20 px-3 py-2 text-primary">
                  <svg
                    width="11"
                    height="14"
                    viewBox="0 0 11 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_1560_11978)">
                      <path
                        d="M9.84375 11.7879H0.65625C0.293945 11.7879 0 12.0821 0 12.4447C0 12.8297 0.293945 13.125 0.65625 13.125H9.84375C10.2061 13.125 10.5 12.8308 10.5 12.4682C10.5 12.1051 10.2074 11.7879 9.84375 11.7879ZM8.27148 5.6793L5.90625 8.19492V1.53398C5.90625 1.16922 5.61367 0.875 5.25 0.875C4.88633 0.875 4.59375 1.16922 4.59375 1.5318V8.19273L2.2277 5.6793C2.09863 5.53984 1.92445 5.47148 1.75 5.47148C1.58851 5.47148 1.42707 5.53049 1.30047 5.6502C1.03644 5.89818 1.02375 6.31384 1.27228 6.57798L4.77228 10.2995C5.02007 10.5645 5.47993 10.5645 5.72767 10.2995L9.22767 6.57798C9.47633 6.31375 9.46351 5.89821 9.19948 5.6502C8.93594 5.40039 8.52031 5.38945 8.27148 5.6793Z"
                        fill="#743A8E"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1560_11978">
                        <rect width="10.5" height="14" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  Download
                </button>
              </div>
            </div>
          </div>
          <hr />
          {/* Detection Status */}
          <div className={`animate flex flex-col gap-3 px-6 py-4`}>
            <span className="text-start text-sm font-medium">Action</span>
            <TextExtender text={selectedData[0]?.Actions} />
          </div>
          <hr />
          {/* Detection Status */}
          <div className="flex">
            <div className="flex w-54 flex-col gap-1 px-6 pb-2 pt-4">
              <span className="text-start text-sm font-medium">Product</span>
              <span className="inline-flex items-center gap-2 text-gray-900">
                {selectedData[0]?.Product}
              </span>
            </div>
            <div className="flex w-54 flex-col gap-1 px-6 pb-2 pt-4">
              <span className="text-start text-sm font-medium">Service</span>
              <span className="text-gray-900"> {selectedData[0]?.Service}</span>
            </div>
          </div>
          <div className="animate flex flex-col gap-2 px-6 pt-2">
            <span className="text-start text-sm font-medium">Description</span>
            <div className="flex items-center gap-2 text-gray-900">
              <p>{selectedData[0]?.Description}</p>
            </div>
          </div>
        </>
      ) : (
        <div className="mt-12 flex w-full">
          <span className="mx-auto text-sm">
            Please select the platform and the role
          </span>
        </div>
      )}
      <hr className="mt-4" />
      <div className="animate mt-2 space-y-2 pb-4 pt-2">
        <span className="mb-2 px-6 text-start text-sm font-medium">
          Audit Policy
        </span>
        <div className="flex flex-col gap-2">
          {console.log(selectedData)}
          {selectedData
            ? selectedData[0]?.AuditPolicy.map((item: any) => (
                <Accordion.Root className="w-full" collapsible>
                  <Accordion.Item
                    className="mt-px w-full overflow-hidden focus-within:relative "
                    value="item-1"
                  >
                    <Accordion.Trigger className="group flex w-full flex-1 cursor-pointer items-center justify-between border border-solid border-gray-200 bg-gray-100 px-4 px-6 py-3 leading-none text-gray-900 outline-none">
                      {item.Name}
                      <ChevronDownIcon
                        className="text-violet10 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
                        aria-hidden
                      />
                    </Accordion.Trigger>

                    <Accordion.Content className="data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown space-y-2 overflow-hidden bg-gray-50 px-6 pb-3">
                      <div className="flex">
                        <div className="flex w-54 flex-col gap-1 pb-2 pt-4">
                          <span className="text-start text-sm font-medium">
                            Product
                          </span>
                          <span className="inline-flex items-center gap-2 text-gray-900">
                            {item.Product}
                          </span>
                        </div>
                        <div className="flex w-54 flex-col gap-1 px-6 pb-2 pt-4">
                          <span className="text-start text-sm font-medium">
                            Service
                          </span>
                          <span className="text-gray-900">{item.Type}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 pt-2">
                        <span className="text-start text-sm font-medium">
                          Policy
                        </span>
                        <div className="flex items-center gap-2 text-gray-900">
                          <p>{item?.Description}</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 pt-2">
                        <span className="text-start text-sm font-medium">
                          Command
                        </span>
                        <div className="flex items-center gap-2 text-gray-900">
                          <TextExtender text={item?.Command} />
                        </div>
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                </Accordion.Root>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
