import { useState } from "react";
import { Button } from "../../ui/button";

const TypeStep = ({ onNextStep, updateFormData }: any) => {
  const [selectedTypes, setSelectedTypes] = useState<any>([]);
  const [selectedOS, setSelectedOS] = useState<any>([]);

  const handleTypeClick = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t: any) => t !== type));
    } else {
      setSelectedTypes(type);
    }
  };

  const handleOSClick = (type: string) => {
    if (selectedOS.includes(type)) {
      setSelectedOS(selectedOS.filter((t: any) => t !== type));
    } else {
      setSelectedOS([...selectedOS, type]);
    }
  };

  const handleNext = () => {
    updateFormData({ Type: selectedTypes, Platform: selectedOS });
    onNextStep();
  };

  return (
    <div className="w-full">
      <div className="mx-auto w-fit space-y-2">
        <h2 className="mx-auto w-fit text-base font-medium text-gray-700">
          Choose an Attack Type
        </h2>
        <div className="flex w-fit flex-wrap gap-2">
          <TypeButton
            type="Endpoint Attacks"
            selected={selectedTypes.includes("Endpoint Attacks")}
            onClick={handleTypeClick}
            disabled={false}
          />
          <TypeButton
            type="Network Attacks"
            selected={selectedTypes.includes("Network Attacks")}
            onClick={handleTypeClick}
            disabled={true}
          />
          <TypeButton
            type="Web Application Attacks"
            selected={selectedTypes.includes("Web Application Attacks")}
            onClick={handleTypeClick}
            disabled={true}
          />
          <TypeButton
            type="Email Attacks"
            selected={selectedTypes.includes("Email Attacks")}
            onClick={handleTypeClick}
            disabled={true}
          />
        </div>
      </div>
      {selectedTypes.length && (
        <div className="mx-auto mt-6 w-fit space-y-2">
          <h2 className="animate mx-auto w-fit text-base font-medium text-gray-700">
            Choose Operating System{" "}
          </h2>
          <div className="flex w-fit flex-wrap gap-2">
            <TypeButton
              type="Windows"
              selected={selectedOS.includes("Windows")}
              onClick={handleOSClick}
              disabled={false}
            />
            <TypeButton
              type="Mac"
              selected={selectedOS.includes("Mac")}
              onClick={handleOSClick}
              disabled={true}
            />
            <TypeButton
              type="Linux"
              selected={selectedOS.includes("Linux")}
              onClick={handleOSClick}
              disabled={true}
            />
          </div>
        </div>
      )}

      <div className="absolute bottom-0 flex w-screen items-end justify-end gap-2 border-t border-solid border-gray-200 p-5">
        <Button
          type="button"
          onClick={handleNext}
          disabled={selectedTypes.length === 0 || selectedOS.length === 0}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

interface TypeButtonProps {
  type: string;
  selected: boolean;
  onClick: (type: string) => void;
  disabled: boolean;
}

const TypeButton: React.FC<TypeButtonProps> = ({
  type,
  selected,
  onClick,
  disabled,
}) => {
  return (
    <button
      type="button"
      className={` inline-flex items-center gap-2 border border-solid border-gray-200 duration-200 hover:opacity-70 disabled:opacity-50 disabled:hover:text-gray-600 disabled:hover:ring-0  ${
        selected ? "bg-primary text-white hover:text-white" : "bg-white"
      } px-4 py-2 font-medium hover:text-primary hover:outline-none hover:ring-2 hover:ring-primary`}
      onClick={() => onClick(type)}
      disabled={disabled}
    >
      {type == "Mac" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20px"
          height="20px"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M14.94 5.19A4.38 4.38 0 0 0 16 2a4.44 4.44 0 0 0-3 1.52a4.17 4.17 0 0 0-1 3.09a3.69 3.69 0 0 0 2.94-1.42m2.52 7.44a4.51 4.51 0 0 1 2.16-3.81a4.66 4.66 0 0 0-3.66-2c-1.56-.16-3 .91-3.83.91s-2-.89-3.3-.87a4.92 4.92 0 0 0-4.14 2.53C2.93 12.45 4.24 17 6 19.47c.8 1.21 1.8 2.58 3.12 2.53s1.75-.82 3.28-.82s2 .82 3.3.79s2.22-1.24 3.06-2.45a11 11 0 0 0 1.38-2.85a4.41 4.41 0 0 1-2.68-4.04"
          ></path>
        </svg>
      ) : type == "Windows" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M22 2L11.2 3.6v8l10.8-.1zM10.2 12.5L2 12.4v6.8l8.1 1.1zM2 4.8v6.8h8.1V3.7zm9.1 7.7v7.9L22 22v-9.4z"
          ></path>
        </svg>
      ) : type == "Linux" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M19.7 17.6c-.1-.2-.2-.4-.2-.6c0-.4-.2-.7-.5-1c-.1-.1-.3-.2-.4-.2c.6-1.8-.3-3.6-1.3-4.9c-.8-1.2-2-2.1-1.9-3.7c0-1.9.2-5.4-3.3-5.1c-3.6.2-2.6 3.9-2.7 5.2c0 1.1-.5 2.2-1.3 3.1c-.2.2-.4.5-.5.7c-1 1.2-1.5 2.8-1.5 4.3c-.2.2-.4.4-.5.6c-.1.1-.2.2-.2.3c-.1.1-.3.2-.5.3c-.4.1-.7.3-.9.7c-.1.3-.2.7-.1 1.1c.1.2.1.4 0 .7c-.2.4-.2.9 0 1.4c.3.4.8.5 1.5.6c.5 0 1.1.2 1.6.4c.5.3 1.1.5 1.7.5c.3 0 .7-.1 1-.2c.3-.2.5-.4.6-.7c.4 0 1-.2 1.7-.2c.6 0 1.2.2 2 .1c0 .1 0 .2.1.3c.2.5.7.9 1.3 1h.2c.8-.1 1.6-.5 2.1-1.1c.4-.4.9-.7 1.4-.9c.6-.3 1-.5 1.1-1c.1-.7-.1-1.1-.5-1.7M12.8 4.8c.6.1 1.1.6 1 1.2c0 .3-.1.6-.3.9h-.1c-.2-.1-.3-.1-.4-.2c.1-.1.1-.3.2-.5c0-.4-.2-.7-.4-.7c-.3 0-.5.3-.5.7v.1c-.1-.1-.3-.1-.4-.2V6c-.1-.5.3-1.1.9-1.2m-.3 2c.1.1.3.2.4.2c.1 0 .3.1.4.2c.2.1.4.2.4.5s-.3.6-.9.8c-.2.1-.3.1-.4.2c-.3.2-.6.3-1 .3c-.3 0-.6-.2-.8-.4c-.1-.1-.2-.2-.4-.3c-.1-.1-.3-.3-.4-.6c0-.1.1-.2.2-.3c.3-.2.4-.3.5-.4l.1-.1c.2-.3.6-.5 1-.5c.3.1.6.2.9.4M10.4 5c.4 0 .7.4.8 1.1v.2c-.1 0-.3.1-.4.2v-.2c0-.3-.2-.6-.4-.5c-.2 0-.3.3-.3.6c0 .2.1.3.2.4c0 0-.1.1-.2.1c-.2-.2-.4-.5-.4-.8c0-.6.3-1.1.7-1.1m-1 16.1c-.7.3-1.6.2-2.2-.2c-.6-.3-1.1-.4-1.8-.4c-.5-.1-1-.1-1.1-.3c-.1-.2-.1-.5.1-1c.1-.3.1-.6 0-.9c-.1-.3-.1-.5 0-.8c.1-.3.3-.4.6-.5c.3-.1.5-.2.7-.4c.1-.1.2-.2.3-.4c.3-.4.5-.6.8-.6c.6.1 1.1 1 1.5 1.9c.2.3.4.7.7 1c.4.5.9 1.2.9 1.6c0 .5-.2.8-.5 1m4.9-2.2c0 .1 0 .1-.1.2c-1.2.9-2.8 1-4.1.3l-.6-.9c.9-.1.7-1.3-1.2-2.5c-2-1.3-.6-3.7.1-4.8c.1-.1.1 0-.3.8c-.3.6-.9 2.1-.1 3.2c0-.8.2-1.6.5-2.4c.7-1.3 1.2-2.8 1.5-4.3c.1.1.1.1.2.1c.1.1.2.2.3.2c.2.3.6.4.9.4h.1c.4 0 .8-.1 1.1-.4c.1-.1.2-.2.4-.2c.3-.1.6-.3.9-.6c.4 1.3.8 2.5 1.4 3.6c.4.8.7 1.6.9 2.5c.3 0 .7.1 1 .3c.8.4 1.1.7 1 1.2H18c0-.3-.2-.6-.9-.9c-.7-.3-1.3-.3-1.5.4c-.1 0-.2.1-.3.1c-.8.4-.8 1.5-.9 2.6c.1.4 0 .7-.1 1.1m4.6.6c-.6.2-1.1.6-1.5 1.1c-.4.6-1.1 1-1.9.9c-.4 0-.8-.3-.9-.7c-.1-.6-.1-1.2.2-1.8c.1-.4.2-.7.3-1.1c.1-1.2.1-1.9.6-2.2c0 .5.3.8.7 1c.5 0 1-.1 1.4-.5h.2c.3 0 .5 0 .7.2c.2.2.3.5.3.7c0 .3.2.6.3.9c.5.5.5.8.5.9c-.1.2-.5.4-.9.6m-9-12c-.1 0-.1 0-.1.1c0 0 0 .1.1.1s.1.1.1.1c.3.4.8.6 1.4.7c.5-.1 1-.2 1.5-.6l.6-.3c.1 0 .1-.1.1-.1c0-.1 0-.1-.1-.1c-.2.1-.5.2-.7.3c-.4.3-.9.5-1.4.5c-.5 0-.9-.3-1.2-.6c-.1 0-.2-.1-.3-.1"
          ></path>
        </svg>
      ) : (
        ""
      )}{" "}
      {type}
    </button>
  );
};

export default TypeStep;
