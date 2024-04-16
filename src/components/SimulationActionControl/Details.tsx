import { useState } from "react";

export default function Details(data: any) {
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
    <div className={`animate`}>
      {/* Attack Status */}
      <div className={`animate`}>
        <div className="flex">
          <div className="flex w-54 flex-col gap-2 px-6 pb-2 pt-4">
            <span className="text-start text-sm font-medium">Platform</span>
            <span className="text-gray-900">{data?.data?.Platforms[0]}</span>
          </div>
          <div className="flex w-54 flex-col gap-2 px-6 pb-2 pt-4">
            <span className="text-start text-sm font-medium">Complexity</span>
            <span className="text-red-500">{data?.data?.Complexity}</span>
          </div>
        </div>
        <div className="flex">
          <div className="flex w-54 flex-col gap-2 px-6 pb-4 pt-2">
            <span className="text-start text-sm font-medium">Update Date</span>
            <span className="text-gray-900">{data?.data?.UpdatedAt}</span>
          </div>
          <div className="flex w-54 flex-col gap-2 px-6 pb-4 pt-2">
            <span className="text-start text-sm font-medium">Release Date</span>
            <span className="text-gray-900">{data?.data?.CreatedAt}</span>
          </div>
        </div>
      </div>
      <hr />
      {/* Detection Status */}
      <div className={`animate flex flex-col gap-3 px-6 py-4`}>
        <span className="text-start text-sm font-medium">Attack Argument</span>
        <div className="flex justify-between gap-1 overflow-x-auto border border-solid border-gray-200 bg-gray-50 py-[14px] pe-5 ps-4 text-gray-600">
          <span>
            {" "}
            <pre>
              <code className="text-sm">
                {JSON.stringify(data?.data?.Script, null, 2)}
              </code>
            </pre>
          </span>
          {copied && (
            <span style={{ marginLeft: "0.5rem", color: "green" }}>
              Copied!
            </span>
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
      {/* Detection Status */}
      <div className="animate flex flex-col gap-3 px-6 py-4">
        <span className="text-start text-sm font-medium">Description</span>
        <div className="flex items-center gap-2 text-gray-900">
          <p>{data?.data?.Description}</p>
        </div>
      </div>
    </div>
  );
}
