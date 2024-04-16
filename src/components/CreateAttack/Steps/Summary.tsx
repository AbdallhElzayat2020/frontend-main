import { Button } from "../../ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { useToast } from "../../ui/use-toast";
import { CanvasRevealEffect } from "../../ui/canvas-reveal-effect";
import { useNavigate } from "react-router-dom";

const Summary = ({ onPrevStep, data, onNextStep, modules }: any) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [attackCreated, setAttackCreated] = useState(null);
  const [cleanData, setCleanData] = useState<any>(null);

  useEffect(() => {
    if (!data?.CleaningAction) {
      function findPluginAndFunctionName(
        cleanPluginID: any,
        cleanFunctionID: any,
        data: any
      ) {
        const plugin = data?.find((item: any) => item.ID === cleanPluginID);

        if (!plugin) {
          return null;
        }

        const func = plugin.Functions.find(
          (item: any) => item.ID === cleanFunctionID
        );

        if (!func) {
          return null;
        }

        return {
          PluginName: plugin.PluginName,
          FunctionName: func.FunctionName,
        };
      }
      const cleaning = findPluginAndFunctionName(
        data?.CleanPluginID,
        data?.CleanFunctionID,
        modules
      );
      setCleanData(cleaning);
    }
  }, []);

  const submitData = () => {
    setLoading(true);

    axios
      .post("/create_attack/endpoint/create", {
        ...data,
        Timeout: parseInt(data.Timeout),
        Author: "Alex Smith1",
      })
      .then(function (response) {
        setAttackCreated(response.data.Message);
        // onNextStep();
      })
      .catch(function (error) {
        toast({
          title: "Error",
          description: error.response.data,
          variant: "destructive",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {attackCreated ? (
        <div className="absolute top-0 h-full w-full overflow-hidden">
          {" "}
          <style>{`
        body {
          background-color: rgb(116 58 142);
          transition: background-color 0.5s ease;
        }
      `}</style>
          <div className="z-0 h-screen w-full overflow-clip opacity-60">
            <CanvasRevealEffect
              animationSpeed={3}
              containerClassName="bg-black"
              colors={[
                [236, 72, 153],
                [232, 121, 249],
              ]}
              dotSize={2}
            />
          </div>
          <div
            className="absolute left-1/2 top-1/2 z-10 mx-auto mt-24
 flex w-fit -translate-x-1/2 -translate-y-1/2 transform flex-col items-center gap-6 duration-200"
          >
            <h1 className="animate text-[20px] font-medium text-white">
              {attackCreated}
            </h1>
            <Button
              onClick={() => navigate("/attacks-library")}
              className="animate bg-white text-primary hover:bg-white/80"
            >
              Back to Attacks Library
            </Button>
          </div>
        </div>
      ) : (
        <div className="">
          <div className="mx-auto flex w-fit flex-col items-center duration-200">
            <h2 className="mx-auto my-0 w-fit text-base font-medium text-gray-700">
              Summary
            </h2>
          </div>

          <div className="mx-auto my-4 max-w-[500px] overflow-auto border border-solid border-gray-200 bg-white pt-2">
            {/* METADATA */}
            <div className="bg-gray-100 px-4 py-1 text-[12px] font-semibold uppercase text-gray-600">
              METADATA
            </div>
            <div className="flex flex-wrap gap-2 px-4 py-4">
              <div className="flex w-full justify-between">
                <Item lable={"Name"} content={data.Name} />
                <Item lable={"Operating System"} content={data.Platform} />
              </div>
              <div className="flex w-full justify-between">
                <Item lable={"Severity"} content={data.Complexity} />
                <Item lable={"Timeout"} content={data.Timeout} />
              </div>
              <Item
                lable={"Techniques"}
                content={data?.Techniques?.join(", ")}
              />
              <Item lable={"Attack Type"} content={data.Type} />
              <Item lable={"Description"} content={data.Description} />
            </div>
            {/* ACTION */}
            <div className="bg-gray-100 px-4 py-1 text-[12px] font-semibold uppercase text-gray-600">
              ACTION
            </div>
            <div className="flex flex-wrap gap-2 px-4 py-4">
              <div className="flex w-full justify-between">
                <Item lable={"Category"} content={data.Category.PluginName} />
                <Item lable={"Action"} content={data.Action.FunctionName} />
              </div>
            </div>
            {/* ATTACK */}
            <div className="bg-gray-100 px-4 py-1 text-[12px] font-semibold uppercase text-gray-600">
              Attack
            </div>
            <div className="flex flex-wrap gap-2 px-4 py-4">
              {/* @ts-ignore */}
              {Object.entries(data.Script).map(
                ([key, value], index: number) => (
                  <Item
                    lable={key}
                    content={
                      value === true
                        ? "True"
                        : value === false
                        ? "False"
                        : value
                    }
                  />
                )
              )}
            </div>
            {/* CLEAN ACTION */}
            <div className="bg-gray-100 px-4 py-1 text-[12px] font-semibold uppercase text-gray-600">
              CLEAN ACTION
            </div>
            <div className="flex flex-wrap gap-2 px-4 py-4">
              <div className="flex w-full justify-between">
                <Item
                  lable={"Category"}
                  content={
                    !cleanData
                      ? data.CleaningCategory?.PluginName
                      : cleanData.PluginName
                  }
                />
                <Item
                  lable={"Action"}
                  content={
                    !cleanData
                      ? data.CleaningAction?.FunctionName
                      : cleanData.FunctionName
                  }
                />
              </div>
            </div>
            {/* CLEAN ATTACK */}
            {data?.CleanScript && (
              <>
                {" "}
                <div className="bg-gray-100 px-4 py-1 text-[12px] font-semibold uppercase text-gray-600">
                  Clean ATTACK
                </div>
                <div className="flex flex-wrap gap-2 px-4 py-4">
                  {Object.entries(data.CleanScript).map(
                    ([key, value], index: number) => (
                      <Item
                        lable={key}
                        content={
                          value === true
                            ? "True"
                            : value === false
                            ? "False"
                            : value
                        }
                      />
                    )
                  )}
                </div>
              </>
            )}
          </div>
          <div className="fixed bottom-0 end-0 flex w-fit items-end justify-end gap-2 border-gray-200 bg-[#F1F5F9] p-5">
            <Button type="button" variant={"secondary"} onClick={onPrevStep}>
              Back
            </Button>
            <Button
              disabled={loading}
              type="button"
              onClick={() => {
                //   handleSubmit(onSubmit)();
                submitData();
              }}
            >
              {loading ? "Loading..." : "Create"}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

const Item = ({ lable, content }: any) => {
  return (
    <div className="flex w-full max-w-[500px] flex-col gap-1">
      <span className="text-sm font-medium">{lable}</span>{" "}
      <span className="text-sm font-medium text-gray-900">{content}</span>
    </div>
  );
};
export default Summary;
