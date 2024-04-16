import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "../../ui/button";
import { useForm } from "react-hook-form";
import { Input } from "../../ui/input";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogFooter,
} from "../../ui/dialog";

const Metadata = ({ onNextStep, onPrevStep, updateFormData, show }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [selectedTechniques, setSelectedTechniques] = useState<any>([]);

  const onSubmit = (formData: any) => {
    updateFormData({ ...formData, Techniques: selectedTechniques });
    onNextStep();
  };

  return (
    <div className={`${!show && "hidden"} w-full`}>
      {/* SELECT ACTION */}
      <div className="mx-auto flex w-fit flex-col items-center duration-200">
        <h2 className="mx-auto my-0 w-fit text-base font-medium text-gray-700">
          Metadata
        </h2>
      </div>

      {/* FUNCTION FILL */}
      <form
        className="mx-auto mt-4 flex w-[900px] flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="space-y-1">
          <label className="text-sm font-medium">Attack Name</label>
          <Input
            className="w-full"
            type="text"
            placeholder={"Attack Name"}
            {...register("Name", { required: true })}
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Timeout</label>
          <Input
            className="w-full"
            type="number"
            placeholder={"Timeout"}
            defaultValue={30}
            {...register("Timeout", { required: true })}
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Complexity</label>
          <select
            className="w-ful flex h-10 w-full cursor-pointer border border-gray-200 bg-white px-3 py-2 pe-4 text-sm font-medium text-gray-900 ring-offset-white duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-800/70 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-70/20 disabled:cursor-not-allowed disabled:opacity-50  dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300"
            defaultValue={"Medium"}
            {...register("Complexity", { required: true })}
          >
            <option key={"High"} value={"High"}>
              {"High"}
            </option>
            <option key={"Medium"} value={"Medium"}>
              {"Medium"}
            </option>
            <option key={"Low"} value={"Low"}>
              {"Low"}
            </option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Description</label>
          <Input
            className="w-full"
            type="text"
            placeholder={"Description"}
            {...register("Description", { required: true })}
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Techniques</label>
          <TacticsModal
            setSelectedTechniques={setSelectedTechniques}
            selectedTechniques={selectedTechniques}
          />
        </div>
      </form>

      <div className="absolute bottom-0 flex w-full items-end justify-end gap-2 border-t border-solid border-gray-200 p-5">
        <Button type="button" variant={"secondary"} onClick={onPrevStep}>
          Back
        </Button>
        <Button type="button" onClick={handleSubmit(onSubmit)}>
          Next
        </Button>
      </div>
    </div>
  );
};

const TacticsModal = ({ selectedTechniques, setSelectedTechniques }: any) => {
  const [data, setData] = useState<any>([]);
  const [selectedTactic, setSelectedTactic] = useState<any>(data[0]);
  const [showModal, setShowModal] = useState(false);

  const tactics = data.map((item: any) => item.ID);

  const techniques = selectedTactic
    ? data.find((item: any) => item.ID === selectedTactic).Techniques
    : [];

  const handleAddTechnique = (techniqueId: string) => {
    setSelectedTechniques((prevTechniques: any) => {
      if (prevTechniques.includes(techniqueId)) {
        // If the technique is already selected, remove it
        return prevTechniques.filter((id: any) => id !== techniqueId);
      } else {
        // Otherwise, add it to the selected techniques
        return [...prevTechniques, techniqueId];
      }
    });
  };

  const handleRemoveTechnique = (techniqueId: string) => {
    setSelectedTechniques((prevTechniques: any) =>
      prevTechniques.filter((id: any) => id !== techniqueId)
    );
  };

  useEffect(() => {
    try {
      axios.get("/create_attack/tactics").then((res) => setData(res.data));
    } catch (e) {
      console.log(e);
    }
  }, []);
  return (
    <>
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogTrigger className="w-full">
          {/* <Input
            type="text"
            placeholder="Select Tactic"
            onClick={() => setShowModal(true)}
            value={selectedTechniques}
            readOnly
          /> */}
          <ul className="flex h-10 w-full gap-2 border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 ring-offset-white duration-200 ">
            {selectedTechniques.length > 0 &&
              selectedTechniques?.map((techniqueId: any) => (
                <li className="bg-gray-200 px-2 py-1" key={techniqueId}>
                  {techniques?.find((tech: any) => tech.ID === techniqueId).ID}{" "}
                  <span onClick={() => handleRemoveTechnique(techniqueId)}>
                    X
                  </span>
                </li>
              ))}
          </ul>
        </DialogTrigger>
        <DialogContent className="max-h-[800px] max-w-[800px] overflow-auto px-0 pb-0">
          <div className="flex gap-6 overflow-auto px-6">
            {/* Tactic list */}
            <ul className="w-[40%] space-y-1">
              <div className="py-1 text-[12px] font-semibold uppercase text-gray-600">
                Tactics
              </div>{" "}
              {tactics.map((tactic: any) => (
                <li
                  key={tactic}
                  onClick={() => {
                    setSelectedTactic(tactic), setSelectedTechniques([]);
                  }}
                  className={`${
                    selectedTactic === tactic
                      ? "bg-primary text-white hover:text-white"
                      : ""
                  } sticky cursor-pointer rounded bg-gray-100 p-2 font-medium duration-200 hover:text-primary`}
                >
                  {tactic}
                </li>
              ))}
            </ul>
            {/* Technique list */}
            <ul className="w-full space-y-1 overflow-auto">
              <div className="sticky py-1 text-[12px] font-semibold uppercase text-gray-600">
                Techniques {selectedTechniques.length}
              </div>{" "}
              {techniques.map((technique: any) => (
                <li
                  key={technique.ID}
                  onClick={() => handleAddTechnique(technique.ID)}
                  className={`${
                    selectedTechniques.includes(technique.ID)
                      ? "bg-primary text-white hover:text-white"
                      : ""
                  } cursor-pointer rounded bg-gray-100 p-2 font-medium duration-200 hover:text-primary`}
                >
                  {technique.Name}
                  <div className="sticky text-sm font-semibold uppercase opacity-80">
                    {technique.ID}
                  </div>{" "}
                </li>
              ))}
            </ul>
          </div>

          <DialogFooter className="sticky bottom-0 start-0 flex w-full items-end justify-end border-t border-gray-200 bg-white px-6 py-4">
            <Button
              onClick={() => setShowModal(false)}
              disabled={!selectedTechniques.length}
              className=""
            >
              Add {selectedTechniques.length} Techniques
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Metadata;
