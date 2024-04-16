import { useState } from "react";

export default function Overview(data: any) {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = (textToCopy: string) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch((error) => {
        console.error("Failed to copy:", error);
      });
  };

  return (
    <div className="animate font-medium">
      {/* Attack Status */}
      <div className="animate flex flex-col gap-2 px-6 py-4">
        <span className="text-start text-sm font-medium">Attack Status</span>
        {data?.data?.ret_code == 0 ? (
          <div className="flex items-center gap-2 text-red-500">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1579_10788)">
                <path
                  d="M12.5 7.49935L7.50002 12.4993M7.50002 7.49935L12.5 12.4993M18.3334 9.99935C18.3334 14.6017 14.6024 18.3327 10 18.3327C5.39765 18.3327 1.66669 14.6017 1.66669 9.99935C1.66669 5.39698 5.39765 1.66602 10 1.66602C14.6024 1.66602 18.3334 5.39698 18.3334 9.99935Z"
                  stroke="#E53E3E"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1579_10788">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <span>Fail</span>
          </div>
        ) : data?.data?.ret_code == 1 ? (
          <div className="flex items-center gap-2 text-green-600">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1579_10825)">
                <path
                  d="M6.25002 9.99935L8.75002 12.4993L13.75 7.49935M18.3334 9.99935C18.3334 14.6017 14.6024 18.3327 10 18.3327C5.39765 18.3327 1.66669 14.6017 1.66669 9.99935C1.66669 5.39698 5.39765 1.66602 10 1.66602C14.6024 1.66602 18.3334 5.39698 18.3334 9.99935Z"
                  stroke="#38A169"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1579_10825">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <span>Success</span>
          </div>
        ) : data?.data?.ret_code == 2 ? (
          <div className="flex items-center gap-2 text-gray-600">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1579_10786)">
                <path
                  d="M10 13.3327V9.99935M10 6.66602H10.0084M18.3334 9.99935C18.3334 14.6017 14.6024 18.3327 10 18.3327C5.39765 18.3327 1.66669 14.6017 1.66669 9.99935C1.66669 5.39698 5.39765 1.66602 10 1.66602C14.6024 1.66602 18.3334 5.39698 18.3334 9.99935Z"
                  stroke="#718096"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1579_10786">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <span>Unknown</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-primary">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.99998 10.8327C10.4602 10.8327 10.8333 10.4596 10.8333 9.99935C10.8333 9.53911 10.4602 9.16602 9.99998 9.16602C9.53974 9.16602 9.16665 9.53911 9.16665 9.99935C9.16665 10.4596 9.53974 10.8327 9.99998 10.8327Z"
                stroke="#A166BB"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15.8333 10.8327C16.2935 10.8327 16.6666 10.4596 16.6666 9.99935C16.6666 9.53911 16.2935 9.16602 15.8333 9.16602C15.3731 9.16602 15 9.53911 15 9.99935C15 10.4596 15.3731 10.8327 15.8333 10.8327Z"
                stroke="#A166BB"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4.16665 10.8327C4.62688 10.8327 4.99998 10.4596 4.99998 9.99935C4.99998 9.53911 4.62688 9.16602 4.16665 9.16602C3.70641 9.16602 3.33331 9.53911 3.33331 9.99935C3.33331 10.4596 3.70641 10.8327 4.16665 10.8327Z"
                stroke="#A166BB"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span>In Progress</span>
          </div>
        )}
      </div>
      <hr />
      {/* Detection Status */}
      <div className="animate flex flex-col  gap-2 px-6 py-4">
        <span className="text-start text-sm font-medium">Detection Status</span>
        {data?.data?.detection == 3 ? (
          <div className="flex items-center gap-2 text-green-600">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1579_10825)">
                <path
                  d="M6.25002 9.99935L8.75002 12.4993L13.75 7.49935M18.3334 9.99935C18.3334 14.6017 14.6024 18.3327 10 18.3327C5.39765 18.3327 1.66669 14.6017 1.66669 9.99935C1.66669 5.39698 5.39765 1.66602 10 1.66602C14.6024 1.66602 18.3334 5.39698 18.3334 9.99935Z"
                  stroke="#38A169"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1579_10825">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <span>Detected</span>
          </div>
        ) : data?.data?.detection == 4 ? (
          <div className="flex items-center gap-2 text-green-600">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1579_10825)">
                <path
                  d="M6.25002 9.99935L8.75002 12.4993L13.75 7.49935M18.3334 9.99935C18.3334 14.6017 14.6024 18.3327 10 18.3327C5.39765 18.3327 1.66669 14.6017 1.66669 9.99935C1.66669 5.39698 5.39765 1.66602 10 1.66602C14.6024 1.66602 18.3334 5.39698 18.3334 9.99935Z"
                  stroke="#38A169"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1579_10825">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <span>Prevented</span>
          </div>
        ) : data?.data?.detection == 0 ? (
          <div className="flex items-center gap-2 text-red-500">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1579_10788)">
                <path
                  d="M12.5 7.49935L7.50002 12.4993M7.50002 7.49935L12.5 12.4993M18.3334 9.99935C18.3334 14.6017 14.6024 18.3327 10 18.3327C5.39765 18.3327 1.66669 14.6017 1.66669 9.99935C1.66669 5.39698 5.39765 1.66602 10 1.66602C14.6024 1.66602 18.3334 5.39698 18.3334 9.99935Z"
                  stroke="#E53E3E"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1579_10788">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <span>Undetected</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-primary">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.99998 10.8327C10.4602 10.8327 10.8333 10.4596 10.8333 9.99935C10.8333 9.53911 10.4602 9.16602 9.99998 9.16602C9.53974 9.16602 9.16665 9.53911 9.16665 9.99935C9.16665 10.4596 9.53974 10.8327 9.99998 10.8327Z"
                stroke="#A166BB"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15.8333 10.8327C16.2935 10.8327 16.6666 10.4596 16.6666 9.99935C16.6666 9.53911 16.2935 9.16602 15.8333 9.16602C15.3731 9.16602 15 9.53911 15 9.99935C15 10.4596 15.3731 10.8327 15.8333 10.8327Z"
                stroke="#A166BB"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4.16665 10.8327C4.62688 10.8327 4.99998 10.4596 4.99998 9.99935C4.99998 9.53911 4.62688 9.16602 4.16665 9.16602C3.70641 9.16602 3.33331 9.53911 3.33331 9.99935C3.33331 10.4596 3.70641 10.8327 4.16665 10.8327Z"
                stroke="#A166BB"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span>Waiting</span>
          </div>
        )}
      </div>
      <hr />
      {/* Detection Status */}
      <div className="animate flex flex-col gap-2 px-6 py-4">
        <span className="text-start text-sm font-medium">Output</span>
        <div className="flex justify-between gap-1 border border-solid border-gray-200 bg-gray-50 py-[14px] pe-5 ps-4 text-gray-600">
          {copied ? (
            <span style={{ marginLeft: "0.5rem", color: "green" }}>
              Copied!
            </span>
          ) : (
            <span>{data?.data?.output}</span>
          )}

          <svg
            onClick={() => handleCopyClick("hi")}
            className="cursor-pointer"
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
      {/* Tactics Status */}
      <div className="animate flex flex-col gap-2 px-6 py-4">
        <span className="text-start text-sm font-medium">Tactics</span>
        <div className="flex w-full flex-wrap gap-1">
          {data?.data?.tactic.map((tactic: string) => (
            <div className="flex w-fit justify-between gap-1 rounded-lg border border-solid border-gray-200 bg-gray-50 px-3 py-2 text-gray-600">
              {tactic}
            </div>
          ))}
        </div>
      </div>
      <hr />
      {/* Techniques Status */}
      <div className="animate flex flex-col gap-2 px-6 py-4">
        <span className="text-start text-sm font-medium">Techniques</span>
        <div className="flex w-full flex-wrap gap-1">
          {data?.data?.technique.map((tactic: string) => (
            <div className="flex w-fit justify-between gap-1 rounded-lg border border-solid border-gray-200 bg-gray-50 px-3 py-2 text-gray-600">
              {tactic}
            </div>
          ))}
        </div>
      </div>
      <hr />
    </div>
  );
}
