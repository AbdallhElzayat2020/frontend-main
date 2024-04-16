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

export default function Prevention(data: any) {
  const platforms = data?.data?.map((item: any) => item.Platform);
  const uniquePlatforms = [...new Set(platforms)];

  const [platform, setPlatform] = useState(uniquePlatforms[0]);
  const [rule, setRule] = useState("");

  const selectedData = data?.data?.filter(
    (item: any) => item.Name == rule && item.Platform == platform
  );

  return (
    <div className={`animate`}>
      <div className="animate space-y-2 px-6 py-4">
        <span className="text-start text-sm font-medium">
          Content Sources ({uniquePlatforms.length})
        </span>
        <Select onValueChange={(value: string) => setPlatform(value)}>
          <SelectTrigger className="w-full py-6 text-gray-950">
            <SelectValue placeholder="Select platform..." />
          </SelectTrigger>
          <SelectContent>
            {uniquePlatforms.map((pl: any) => (
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
            <div className="flex justify-between gap-1 border border-solid border-gray-200 bg-gray-50 py-[14px] pe-5 ps-4 text-gray-600">
              <span>{selectedData[0]?.Actions}</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.3333 10.7493V14.2494C13.3333 17.166 12.1666 18.3327 9.24996 18.3327H5.74996C2.83329 18.3327 1.66663 17.166 1.66663 14.2494V10.7493C1.66663 7.83268 2.83329 6.66602 5.74996 6.66602H9.24996C12.1666 6.66602 13.3333 7.83268 13.3333 10.7493Z"
                  stroke="#A0AEC0"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M18.3333 5.74935V9.24935C18.3333 12.166 17.1666 13.3327 14.25 13.3327H13.3333V10.7493C13.3333 7.83268 12.1666 6.66602 9.24996 6.66602H6.66663V5.74935C6.66663 2.83268 7.83329 1.66602 10.75 1.66602H14.25C17.1666 1.66602 18.3333 2.83268 18.3333 5.74935Z"
                  stroke="#A0AEC0"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
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
            <span className="text-start text-sm font-medium">Policy</span>
            <div className="flex items-center gap-2 text-gray-900">
              <p>
                This attack includes downloading an .PDF file of the Malicious
                Document used by Karakurt Threat Group. Karakurt actors have
                typically provided screenshots or copies of stolen file
                directories as proof of stolen data. Karakurt actors have
                contacted victims employees, business partners...
              </p>
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
    </div>
  );
}
