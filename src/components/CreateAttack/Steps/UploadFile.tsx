import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogFooter,
} from "../../ui/dialog";
import { useForm } from "react-hook-form";
import { Input } from "../../ui/input";
import axios from "axios";
import { toast, useToast } from "../../ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";

const UploadFile = ({ updateFormData, register, setValue }: any) => {
  const [selectedTool, setSelectedTool] = useState("");
  const [tools, setTools] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<any>([]);
  const [modal, setModal] = useState(false);
  const [addFileModal, setAddFileModal] = useState(false);

  const getData = () => {
    axios
      .get("/tools")
      .then(function (response) {
        console.table(response.data);
        setTools(response.data);
        // onNextStep();
      })
      .catch(function (error) {
        console.log(error.response);

        toast({
          title: "Error",
          description: error.response.data,
          variant: "destructive",
        });
      })
      .finally(() => {});
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSearch = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const handleTypeFilter = (type: any) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(
        selectedTypes.filter((selectedType: any) => selectedType !== type)
      );
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const clearFilters = () => {
    setSelectedTypes([]);
  };

  // Filter tools based on search term and selected types
  const filteredTools = tools.filter((tool: any) => {
    return (
      tool.ToolName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedTypes.length === 0 || selectedTypes.includes(tool.Type))
    );
  });

  // ADD FILE
  const addTool = (toolName: string) => {
    updateFormData((prev: any) => ({
      ...prev,
      Script: {
        ...prev.Script,
        toolfile: toolName,
      },
    }));
    setModal(false);
  };

  return (
    <>
      <AddFile
        setValue={setValue}
        addFileModal={addFileModal}
        setAddFileModal={setAddFileModal}
        updateFormData={updateFormData}
        setSelectedTool={setSelectedTool}
      />
      <Dialog open={modal} onOpenChange={setModal}>
        <DialogTrigger asChild>
          <div className="flex w-full items-center justify-center">
            <div className="flex w-full cursor-pointer items-center justify-start gap-4 rounded bg-primary/10 text-primary duration-200 hover:opacity-80">
              <div className="flex w-fit items-center justify-start gap-1 rounded bg-primary p-3 text-white">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 32 32"
                >
                  <path
                    fill="currentColor"
                    d="m6 18l1.41 1.41L15 11.83V30h2V11.83l7.59 7.58L26 18L16 8L6 18zM6 8V4h20v4h2V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4z"
                  />
                </svg>
                <p className="text-sm font-medium">Choose Tool</p>
              </div>
              {selectedTool ? (
                <>
                  <div className="flex w-fit items-center justify-start gap-1">
                    {" "}
                    <p className="text-sm font-medium">{selectedTool}</p>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-sm font-medium">No Tool choosen</p>
                </>
              )}
            </div>
            <input
              {...register("toolfile", {
                required: false,
              })}
              className="hidden"
            />
          </div>

          {/* <input
            placeholder="File"
            className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
            {...register("toolfile", {
              required: false,
            })}
          /> */}
        </DialogTrigger>
        <DialogContent className="!max-h-[800px] max-w-[800px] overflow-auto pb-0">
          <Input
            type="text"
            placeholder="Search by tool name"
            value={searchTerm}
            onChange={handleSearch}
          />
          <div className="flex h-fit gap-2">
            <Button size={"sm"} variant={"secondary"} onClick={clearFilters}>
              Show All
            </Button>
            {["bat", "ps1", "dll", "cab", "vbs"].map((type) => (
              <Button
                key={type}
                onClick={() => handleTypeFilter(type)}
                size={"sm"}
                variant={selectedTypes.includes(type) ? "default" : "secondary"}
              >
                {type}
              </Button>
            ))}
          </div>
          <Table className="overflow-auto">
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Tool Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>OS</TableHead>
                <TableHead>Arch</TableHead>
                <TableHead>Release Date</TableHead>
                <TableHead>Update Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTools.map((item: any, index: number) => (
                <TableRow
                  className={`cursor-pointer ${
                    selectedTool == item.ToolName &&
                    "sticky bg-primary/10 text-primary"
                  }`}
                  key={index}
                  onClick={() => {
                    setValue("toolfile", item.ToolName),
                      setSelectedTool(item.ToolName);
                  }}
                >
                  <TableCell>{index}</TableCell>
                  <TableCell>{item.ToolName}</TableCell>
                  <TableCell>{item.Type}</TableCell>
                  <TableCell>{item.OS.join(", ")}</TableCell>
                  <TableCell>{item.Arch}</TableCell>
                  <TableCell>{item.CreatedAt}</TableCell>
                  <TableCell>{item.UpdatedAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <DialogFooter className="sticky bottom-0 w-full bg-white py-5">
            <Button
              onClick={() => {
                setAddFileModal(true), setModal(false);
              }}
              variant={"secondary"}
            >
              Upload Tool
            </Button>
            <Button
              disabled={selectedTool.length < 0}
              onClick={() => {
                setModal(false);
              }}
            >
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

const AddFile = ({
  setAddFileModal,
  addFileModal,
  updateFormData,
  setSelectedTool,
  setValue,
}: any) => {
  const { toast } = useToast();
  const [selectedOptions, setSelectedOptions] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [File, setFile] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue: setValues,
  } = useForm();

  const handleOptionToggle = (option: any) => {
    const currentIndex = selectedOptions.indexOf(option);
    const newSelectedOptions = [...selectedOptions];

    if (currentIndex === -1) {
      newSelectedOptions.push(option);
    } else {
      newSelectedOptions.splice(currentIndex, 1);
    }

    setSelectedOptions(newSelectedOptions);
    setValues("os", newSelectedOptions);
  };
  const onSubmit = async (data: any) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", data.file[0]);

    const fileName = data.file[0].name;

    const metadata = {
      type: fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2),
      arch: data.arch,
      os: data.os,
      description: data.description,
      name: fileName,
    };

    formData.append("metadata", JSON.stringify(metadata));

    await axios
      .post("/endpoint/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setSelectedTool(fileName);
        setValue("toolfile", fileName),
          setLoading(false),
          setAddFileModal(false);
      })
      .catch((e) => {
        toast({
          title: "Error",
          description: e.response.data,
          variant: "destructive",
        }),
          setLoading(false);
      });
  };

  return (
    <Dialog open={addFileModal} onOpenChange={setAddFileModal}>
      <DialogContent className="!max-h-[800px] max-w-[800px] overflow-auto pb-0">
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Arch:</label>
            <select
              className="w-ful flex h-10 w-full cursor-pointer border border-gray-200 bg-white px-3 py-2 pe-4 text-sm font-medium text-gray-900 ring-offset-white duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-800/70 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-70/20 disabled:cursor-not-allowed disabled:opacity-50  dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300"
              {...register("arch")}
            >
              <option value="all">All</option>
              <option value="x64">x64</option>
              <option value="x86">x86</option>
            </select>
          </div>
          <div>
            <label>OS:</label>
            <div className="flex flex-wrap gap-2">
              <div
                className={`cursor-pointer border border-gray-200 p-2 duration-200 ${
                  selectedOptions.includes("Windows")
                    ? "border-primary bg-primary/10 text-primary"
                    : "bg-white"
                }`}
                onClick={() => handleOptionToggle("Windows")}
              >
                Windows
              </div>
              <div
                className={`cursor-pointer border border-gray-200 p-2 duration-200 ${
                  selectedOptions.includes("Linux")
                    ? "border-primary bg-primary/10 text-primary"
                    : "bg-white"
                }`}
                onClick={() => handleOptionToggle("Linux")}
              >
                Linux
              </div>
            </div>
          </div>
          <div>
            <label>Description:</label>
            <Input className="w-full" {...register("description")} />
          </div>
          <div>
            <label>File:</label>
            <div className="flex w-full items-center justify-center">
              <input
                className="block w-full cursor-pointer bg-primary/10 text-sm font-medium text-primary
    file:mr-4 file:rounded file:border-0
   file:bg-primary file:px-4 file:py-3
   file:text-sm file:font-medium
   file:text-white hover:file:opacity-80"
                type="file"
                {...register("file", {
                  required: true,
                  validate: {
                    maxSize: (value) => value[0].size < 10485760, // 1MB
                    //   fileType: (value) =>
                    //     ["image/jpeg", "image/png", "application/pdf"].includes(
                    //       value[0].type
                    //     ),
                  },
                })}
              />
            </div>

            {errors.file && errors.file.type === "required" && (
              <p>File is required</p>
            )}
            {errors.file && errors.file.type === "maxSize" && (
              <p>File size should be less than 10MB</p>
            )}
            {/* {errors.file && errors.file.type === "fileType" && (
              <p>File type should be JPG, PNG, or PDF</p>
            )} */}
          </div>
          <DialogFooter className="sticky bottom-0 w-full bg-white py-5">
            <Button type="button" variant={"secondary"}>
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={loading}
            >
              {loading ? "Loading..." : "Upload"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadFile;
