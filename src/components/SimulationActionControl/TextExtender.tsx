import { useState } from "react";

const TextExtender = ({ text }: { text: string }) => {
  const [extend, setExtend] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyClick = (textToCopy: string) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 500);
      })
      .catch((error) => {
        console.error("Failed to copy:", error);
      });
  };
  return (
    <div className="flex h-fit w-full flex-col justify-between gap-2 border border-solid border-gray-200 bg-gray-100 px-4 py-[10px] text-gray-600 duration-200">
      <code
        style={{ overflowWrap: "anywhere" }}
        className={` ${extend ? "text-ellipsis text-balance" : "truncate"}`}
      >
        {text}
      </code>
      <div className="flex space-x-2">
        <button
          onClick={() => setExtend(!extend)}
          className={`text-sm font-semibold uppercase ${
            copied ? "text-green-600" : "text-primary"
          }`}
        >
          {!copied ? (extend ? "Show Less" : "Show More") : "Copied!"}
        </button>
        <button onClick={() => handleCopyClick(text)}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
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
        </button>
      </div>
    </div>
  );
};

export default TextExtender;
