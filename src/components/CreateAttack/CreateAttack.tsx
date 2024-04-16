import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "../ui/button";
import axios from "axios";

// STEPS
import TypeStep from "./Steps/TypeStep";
import Action from "./Steps/Action";
import Metadata from "./Steps/Metadata";
import Summary from "./Steps/Summary";
import { useNavigate } from "react-router-dom";

const STEPS = [
  {
    stepID: 1,
    stepName: "Attack Type and OS",
  },
  {
    stepID: 2,
    stepName: "Modules & Actions",
  },
  {
    stepID: 3,
    stepName: "Action Cleaning",
  },
  {
    stepID: 4,
    stepName: "Metadata",
  },
];

const CreateAttackForm = () => {
  const navigate = useNavigate();

  const [data, setData] = useState();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [finalData, setFinalData] = useState({});
  const [metadata, setMetadata] = useState(false);
  const methods = useForm();

  useEffect(() => {
    setFinalData(formData);
  }, [formData]);
  useEffect(() => {
    try {
      axios.get("/create_attack/endpoint/windows/modules").then((res: any) => {
        setData(res.data);
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  // FORM
  const onNextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  const onPrevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  const handleFormSubmit = (data: any) => {
    const finalFormData = { ...formData, ...data };
  };
  const updateFormData = (data: any) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
  };
  //

  useEffect(() => {
    if (currentStep == 3) {
      setMetadata(true);
    } else {
      setMetadata(false);
    }
  }, [currentStep]);

  return (
    <div className="h-screen">
      <FormProvider {...methods}>
        <ol className="sticky top-0 mx-auto mb-10 flex w-full items-center justify-center gap-4 border-b border-solid border-gray-200 bg-[#F1F5F9] py-8">
          <Button
            className="absolute start-8"
            variant={"secondary"}
            onClick={() => navigate("/attacks-library")}
          >
            Back to Attacks Library
          </Button>
          {STEPS.map((step: any, index: number) => (
            <li
              key={index}
              className={`flex items-center gap-4 font-medium duration-300 ${
                step.stepID == currentStep
                  ? "text-gray-900"
                  : "text-gray-[#718096]"
              } ${step.stepID < currentStep ? "text-green-600" : ""} `}
            >
              <span className="">
                {step.stepID < currentStep ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M256 32C132.3 32 32 132.3 32 256s100.3 224 224 224 224-100.3 224-224S379.7 32 256 32zm114.9 149.1L231.8 359.6c-1.1 1.1-2.9 3.5-5.1 3.5-2.3 0-3.8-1.6-5.1-2.9-1.3-1.3-78.9-75.9-78.9-75.9l-1.5-1.5c-.6-.9-1.1-2-1.1-3.2 0-1.2.5-2.3 1.1-3.2.4-.4.7-.7 1.1-1.2 7.7-8.1 23.3-24.5 24.3-25.5 1.3-1.3 2.4-3 4.8-3 2.5 0 4.1 2.1 5.3 3.3 1.2 1.2 45 43.3 45 43.3l111.3-143c1-.8 2.2-1.4 3.5-1.4 1.3 0 2.5.5 3.5 1.3l30.6 24.1c.8 1 1.3 2.2 1.3 3.5.1 1.3-.4 2.4-1 3.3z"
                      fill="currentColor"
                    ></path>
                  </svg>
                ) : (
                  `Step ${step.stepID}`
                )}
              </span>
              <svg
                width="7"
                height="12"
                viewBox="0 0 7 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`${STEPS.length - 1 == index ? "hidden" : "block"}`}
              >
                <path
                  d="M1 1.5L5.5 6L1 10.5"
                  stroke="#171923"
                  stroke-width="1.5"
                />
              </svg>
            </li>
          ))}
        </ol>
        {/* <hr className="" /> */}
        <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
          {currentStep === 1 && (
            <TypeStep onNextStep={onNextStep} updateFormData={updateFormData} />
          )}
          {currentStep === 2 && (
            <Action
              data={data}
              onNextStep={onNextStep}
              onPrevStep={onPrevStep}
              updateFormData={updateFormData}
            />
          )}
          <Metadata
            show={metadata}
            onNextStep={onNextStep}
            onPrevStep={onPrevStep}
            updateFormData={updateFormData}
          />
          {currentStep === 4 && (
            <Summary
              onPrevStep={onPrevStep}
              data={finalData}
              onNextStep={onNextStep}
              modules={data}
            />
          )}

          {/* Add navigation buttons */}
          {/* {currentStep === 2 && (
            <div className="absolute bottom-0 flex w-full items-end justify-end gap-2 border-t border-solid border-gray-200 p-5">
              <Button type="button" variant={"secondary"} onClick={onPrevStep}>
                Previous
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          )} */}
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateAttackForm;
