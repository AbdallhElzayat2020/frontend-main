import { Button } from "../../ui/button";
import { useForm } from "react-hook-form";
import { Input } from "../../ui/input";
import UploadFile from "./UploadFile";

const CleaningStep = ({
  data,
  onNextStep,
  onPrevStep,
  updateFormData,
  setOpenCleaningStep,
}: any) => {
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
    });
    onNextStep();
  };

  return (
    <>
      <div className="flex flex-col">
        <h2 className="mx-auto my-0 w-fit text-base font-medium text-gray-700">
          Cleaning (Optional)
        </h2>
        {Object.entries(data).map(([key, field]: any) => (
          <div className="space-y-2" key={key}>
            <label className="font-medium">{field.Label}</label>
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
      </div>
      <div className=" flex w-full items-end justify-end gap-2 border-t border-solid border-gray-200 p-5">
        <Button
          type="button"
          variant={"secondary"}
          onClick={() => setOpenCleaningStep(false)}
        >
          Back
        </Button>
        <Button type="button" onClick={handleSubmit(onSubmit)}>
          Next
        </Button>
      </div>
    </>
  );
};

export default CleaningStep;
