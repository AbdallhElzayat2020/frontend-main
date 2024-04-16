import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog";
import { useForm } from "react-hook-form";
import { Input } from "../../ui/input";
import UploadFile from "./UploadFile";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";

const CleaningModal = ({
  onNextStep,
  onPrevStep,
  updateFormData,
  data,
  setOpenCleaningStep,
}: any) => {
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [selectedAction, setSelectedAction] = useState<any>(null);
  const [selectedParams, setSelectedParams] = useState<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const isFieldRequired = (field: any) => field.Required;
  const onSubmit = (formData: any, event: any) => {
    updateFormData({
      CleanScript: formData,
      CleanPluginID: selectedAction.CleanPluginID,
      CleanFunctionID: selectedAction.CleanFunctionID,
    });
    // onNextStep();
  };
  const handleCategorySelect = (category: any) => {
    setSelectedCategory(category);
  };

  const handleActionSelect = (action: any) => {
    setSelectedAction(action);
  };

  const handleParametersSelect = (Params: any) => {
    setSelectedParams(Params.Parameters);
  };

  const combinedSubmit = () => {
    handleSubmit(onSubmit)();
    onNextStep();
  };

  useEffect(() => {
    updateFormData({
      CleaningAction: selectedAction,
      CleaningCategory: selectedCategory,
    });
  }, [selectedAction, selectedCategory]);

  return (
    <>
      <div className="w-full pt-4">
        {/* SELECT ACTION */}
        <div className="mx-auto flex w-fit flex-col items-center duration-200">
          <span className="mb-2 rounded-full bg-primary/10 px-4 text-sm font-bold text-primary">
            CLEANING
          </span>
          <h2 className="mx-auto my-0 w-fit text-base font-medium text-gray-700">
            {selectedCategory
              ? "Choose a Cleaning Action"
              : "Choose a Cleaning Action Category"}
          </h2>
          {!selectedParams && (
            <div className="mt-4 flex w-fit flex-wrap items-center justify-center gap-2 px-10">
              {selectedCategory ? (
                <SelectAction
                  // @ts-ignore
                  data={selectedCategory}
                  onClick={handleActionSelect}
                  onClickCreate={handleParametersSelect}
                />
              ) : (
                <SelectCategory data={data} onClick={handleCategorySelect} />
              )}
            </div>
          )}
        </div>

        {/* FUNCTION FILL */}
        {selectedParams && (
          <form
            className="mx-auto mt-4 flex w-[900px] flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {Object.entries(selectedParams).map(([key, field]: any) => (
              <div className="space-y-2" key={key}>
                <label className="flex font-medium">
                  {field.Label}{" "}
                  {field.Required && (
                    <span className="ms-1 text-red-500">*</span>
                  )}
                  <TooltipProvider delayDuration={50}>
                    <Tooltip>
                      <TooltipTrigger
                        type="button"
                        className="ms-2 cursor-default opacity-70"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            fill-rule="evenodd"
                            d="M21 12a9 9 0 1 1-18 0a9 9 0 0 1 18 0m-7.75 4.25a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0M13 6.5h-2v7h2z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{field.Description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </label>
                {field.Type === "string" && key !== "toolfile" && (
                  <Input
                    className="w-full"
                    type="text"
                    placeholder={field.PlaceHolder}
                    defaultValue={field["Default Value"]}
                    {...register(key, { required: isFieldRequired(field) })}
                  />
                )}
                {field.Type === "integer" && (
                  <Input
                    className="w-full"
                    type="number"
                    placeholder={field.PlaceHolder}
                    defaultValue={parseInt(field["Default Value"])}
                    {...register(key, {
                      required: isFieldRequired(field),
                      valueAsNumber: true,
                    })}
                  />
                )}
                {field.Type === "boolean" && (
                  <div className="w-full">
                    <input
                      className="h-4 w-4"
                      type="checkbox"
                      defaultChecked={field["Default Value"] === "true"}
                      {...register(key)}
                    />
                  </div>
                )}
                {field.Type === "enum" && (
                  <select
                    className="w-ful flex h-10 w-full cursor-pointer border border-gray-200 bg-white px-3 py-2 pe-4 text-sm font-medium text-gray-900 ring-offset-white duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-800/70 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-70/20 disabled:cursor-not-allowed disabled:opacity-50  dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300"
                    defaultValue={field["Default Value"]}
                    {...register(key, { required: isFieldRequired(field) })}
                  >
                    {field.Values.map((option: any) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
                {key == "toolfile" && (
                  <UploadFile
                    setValue={setValue}
                    updateFormData={updateFormData}
                    register={register}
                  />
                )}
                {errors[key] && (
                  <span className="text-red-500">This field is required.</span>
                )}
              </div>
            ))}
          </form>
        )}

        {/* OPTIONAL CLEANING */}

        <div className="absolute bottom-0 flex w-full items-end justify-end gap-2 border-t border-solid border-gray-200 p-5">
          <Button
            type="button"
            variant={"secondary"}
            onClick={
              selectedParams
                ? () => setSelectedParams(null)
                : selectedCategory
                ? () => setSelectedCategory(null)
                : () => setOpenCleaningStep(false)
            }
          >
            {selectedParams
              ? "Back to Actions"
              : selectedCategory
              ? "Back to Categories"
              : "Back"}
          </Button>
          <Button type="button" onClick={combinedSubmit}>
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

// SELECT CATEGORY
const SelectCategory = ({ data, onClick }: any) => {
  return data.map((category: any, index: number) => (
    <CategoryCard category={category} onClick={() => onClick(category)} />
  ));
};

// SELECT ACTION
const SelectAction = ({ data, onClick, onClickCreate }: any) => {
  return data.Functions.map((action: any, index: number) => (
    <ActionCard
      data={data}
      action={action}
      onClick={() => onClick(action)}
      onClickCreate={onClickCreate}
    />
  ));
};

const CategoryCard = ({ category, selected, onClick }: any) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`flex flex-col items-start gap-2 border border-solid border-gray-200 duration-200 hover:opacity-70 ${
        selected ? "bg-primary text-white hover:text-white" : "bg-white"
      } px-4 py-2 font-medium hover:!text-primary hover:outline-none hover:ring-2 hover:ring-primary`}
    >
      <div className="flex flex-col items-start gap-1">
        <span className="text-gray-900">{category.PluginName}</span>
        <p>{category.Description}</p>
      </div>
      <div className="flex flex-col items-start gap-1">
        <span>
          Actions:{" "}
          <span className="text-gray-900">{category.Functions.length}</span>
        </span>
        <span>
          Last Updated:{" "}
          <span className="text-gray-900">{category.UpdatedAt}</span>
        </span>
      </div>
    </button>
  );
};

const ActionCard = ({
  action,
  selected,
  onClick,
  onClickCreate,
  data,
}: any) => {
  const [modal, setModal] = useState(false);

  return (
    <div onClick={() => onClickCreate(action)}>
      <button
        onClick={onClick}
        type="button"
        className={`flex flex-col items-start gap-2 border border-solid border-gray-200 duration-200 ${
          selected ? "bg-primary text-white hover:text-white" : "bg-white"
        } px-4 py-2 font-medium hover:outline-none hover:ring-2 hover:ring-primary`}
      >
        <div className="flex flex-col items-start gap-1">
          <span className="text-gray-900">{action.FunctionName}</span>
          <p>{action.Description}</p>
        </div>
        <div className="flex flex-col items-start gap-1">
          <span>
            Complexity:{" "}
            <span className="text-gray-900">{action.Complexity}</span>
          </span>
          <span>
            Last Updated:{" "}
            <span className="text-gray-900">{action.UpdatedAt}</span>
          </span>
        </div>
      </button>
    </div>
  );
};

export default CleaningModal;
