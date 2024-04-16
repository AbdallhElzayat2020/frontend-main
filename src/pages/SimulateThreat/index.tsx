import { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import Input from "../../components/Input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// @ts-ignore
import moment from "moment";
export default function SimulateThreat() {
  let navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [records, setRecords] = useState<any>([]);

  const fetchData = async () => {
    try {
      const res = await axios.get("/templates");
      setRecords(res.data);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchData();
    console.log("rec", records);
  }, []);

  return (
    <div>
      <Breadcrumb
        pageName="Simulate Threat"
        buttons={
          <div>
            {/* <button className="flex items-center gap-2 rounded bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80">
              Simulate
            </button> */}
          </div>
        }
      />
      <div className="flex gap-2">
        <Input
          className="w-full"
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.58333 18.1253C4.875 18.1253 1.04166 14.292 1.04166 9.58366C1.04166 4.87533 4.875 1.04199 9.58333 1.04199C14.2917 1.04199 18.125 4.87533 18.125 9.58366C18.125 14.292 14.2917 18.1253 9.58333 18.1253ZM9.58333 2.29199C5.55833 2.29199 2.29166 5.56699 2.29166 9.58366C2.29166 13.6003 5.55833 16.8753 9.58333 16.8753C13.6083 16.8753 16.875 13.6003 16.875 9.58366C16.875 5.56699 13.6083 2.29199 9.58333 2.29199Z"
                fill="#718096"
              />
              <path
                d="M18.3333 18.9585C18.175 18.9585 18.0167 18.9002 17.8917 18.7752L16.225 17.1085C15.9833 16.8669 15.9833 16.4669 16.225 16.2252C16.4667 15.9835 16.8667 15.9835 17.1083 16.2252L18.775 17.8919C19.0167 18.1335 19.0167 18.5335 18.775 18.7752C18.65 18.9002 18.4917 18.9585 18.3333 18.9585Z"
                fill="#718096"
              />
            </svg>
          }
          value={search}
          setValue={(text: string) => setSearch(text)}
          placeholder="Search"
          type="text"
        />

        <button className="flex items-center gap-2 border border-stroke bg-white px-4.5 py-2 font-medium text-[#718096] hover:bg-opacity-80">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.10815 18.9586C8.70815 18.9586 8.30819 18.8586 7.94152 18.6586C7.19985 18.2419 6.75815 17.5003 6.75815 16.6586V12.2003C6.75815 11.7753 6.48314 11.1503 6.2248 10.8253L3.05815 7.50027C2.53315 6.97527 2.12482 6.0586 2.12482 5.3836V3.45028C2.12482 2.10862 3.1415 1.05859 4.43317 1.05859H15.5498C16.8248 1.05859 17.8582 2.09194 17.8582 3.36694V5.21694C17.8582 6.09194 17.3332 7.10026 16.8332 7.59192C16.5915 7.83359 16.1915 7.83359 15.9498 7.59192C15.7082 7.35026 15.7082 6.95026 15.9498 6.70859C16.2582 6.40026 16.6082 5.70861 16.6082 5.21694V3.36694C16.6082 2.78361 16.1331 2.30859 15.5498 2.30859H4.43317C3.8415 2.30859 3.37482 2.80862 3.37482 3.45028V5.3836C3.37482 5.69193 3.62482 6.30028 3.94982 6.62528L7.15818 10.0003C7.58318 10.5253 7.99981 11.4086 7.99981 12.2003V16.6586C7.99981 17.2086 8.37483 17.4753 8.54149 17.5669C8.89983 17.7669 9.32485 17.7586 9.65818 17.5586L10.8248 16.8086C11.0665 16.6669 11.2998 16.2086 11.2998 15.9003C11.2998 15.5586 11.5832 15.2753 11.9248 15.2753C12.2665 15.2753 12.5498 15.5586 12.5498 15.9003C12.5498 16.6503 12.0831 17.5086 11.4915 17.8669L10.3332 18.6169C9.95818 18.8419 9.53315 18.9586 9.10815 18.9586Z"
              fill="#718096"
            />
            <path
              d="M13.3918 14.3919C11.5751 14.3919 10.1001 12.9169 10.1001 11.1003C10.1001 9.2836 11.5751 7.80859 13.3918 7.80859C15.2084 7.80859 16.6835 9.2836 16.6835 11.1003C16.6835 12.9169 15.2084 14.3919 13.3918 14.3919ZM13.3918 9.05859C12.2668 9.05859 11.3501 9.97527 11.3501 11.1003C11.3501 12.2253 12.2668 13.1419 13.3918 13.1419C14.5168 13.1419 15.4335 12.2253 15.4335 11.1003C15.4335 9.97527 14.5168 9.05859 13.3918 9.05859Z"
              fill="#718096"
            />
            <path
              d="M16.5583 14.8918C16.4 14.8918 16.2417 14.8335 16.1167 14.7085L15.2834 13.8751C15.0417 13.6335 15.0417 13.2335 15.2834 12.9918C15.525 12.7501 15.925 12.7501 16.1667 12.9918L17 13.8251C17.2417 14.0668 17.2417 14.4668 17 14.7085C16.8834 14.8251 16.7167 14.8918 16.5583 14.8918Z"
              fill="#718096"
            />
          </svg>

          <span>Filter</span>
        </button>
      </div>

      <div className="mt-5 rounded-sm border border-stroke bg-white px-2 pb-2.5 pt-2.5 shadow-default sm:px-1.5 xl:pb-1 dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm border-b border-stroke sm:grid-cols-8">
            <div className="hidden self-center p-2.5 sm:block xl:p-5">
              <h5 className="text-sm font-medium xsm:text-sm">Threat ID</h5>
            </div>
            <div className="self-center p-2.5 xl:p-5">
              <h5 className="text-sm font-medium xsm:text-sm">Threat Name</h5>
            </div>
            <div className="self-center p-2.5 xl:p-5">
              <h5 className="text-sm font-medium xsm:text-sm">Severity</h5>
            </div>
            <div className="hidden self-center p-2.5 sm:block xl:p-5">
              <h5 className="text-sm font-medium xsm:text-sm">
                Attack Category
              </h5>
            </div>
            <div className="hidden self-center p-2.5 sm:block xl:p-5">
              <h5 className="text-sm font-medium xsm:text-sm">Attack Module</h5>
            </div>
            <div className="hidden self-center p-2.5 sm:block xl:p-5">
              <h5 className="text-sm font-medium xsm:text-sm">Affected OS</h5>
            </div>
            <div className="hidden self-center p-2.5 sm:block xl:p-5">
              <h5 className="text-sm font-medium xsm:text-sm">Release Date</h5>
            </div>
            <div className="hidden self-center p-2.5 sm:block xl:p-5">
              <h5 className="text-sm font-medium xsm:text-sm">Last Update</h5>
            </div>
          </div>
          {records.map((item: any, index: number) => (
            <div
              key={index}
              className={`grid grid-cols-3 ${
                records.length - 1 === index ? "" : "border-b border-stroke"
              } cursor-pointer sm:grid-cols-8 dark:border-strokedark`}
              onClick={() => navigate(`/simulate-threat/${item.ID}`)}
            >
              {/* <div className="flex items-center justify-center gap-5">
                <CheckboxTwo />
                <svg
                  width="12"
                  height="11"
                  viewBox="0 0 12 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 5L6 10L11 5"
                    stroke="#A0AEC0"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div> */}

              <div className="flex items-center p-2.5 xl:p-5">
                <p className="font-medium text-[#1A202C]">{item.ID}</p>
              </div>

              <div className="hidden flex-col items-start p-2.5 sm:flex xl:p-5">
                <p className="font-medium text-[#1A202C]">
                  {item.ThreatDisplayName}
                </p>
                <p className="font-medium text-[#718096]">
                  {item.actions_count} Actions
                </p>
              </div>

              <div className="hidden items-center p-2.5 sm:flex xl:p-5">
                <p className="capitalize text-[#ED8936]">
                  {item.Complexity || "normal"}{" "}
                </p>
              </div>
              <div className="flex items-center p-2.5 xl:p-5">
                <p className="font-medium text-black dark:text-white">
                  {item.ThreatCategory}
                </p>
              </div>

              <div className="flex items-center p-2.5 xl:p-5">
                <p className="font-medium text-black dark:text-white">x64</p>
              </div>

              <div className="hidden items-center p-2.5 sm:flex xl:p-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="18"
                  viewBox="0 0 15 18"
                  fill="none"
                >
                  <g clipPath="url(#clip0_1214_4384)">
                    <path
                      d="M0 3.61113L6.09609 2.77109V8.66133H0V3.61113ZM0 14.3889L6.09609 15.2289V9.41172H0V14.3889ZM6.7668 15.3186L14.875 16.4375V9.41172H6.7668V15.3186ZM6.7668 2.68145V8.66133H14.875V1.5625L6.7668 2.68145Z"
                      fill="#743A8E"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1214_4384">
                      <rect
                        width="14.875"
                        height="17"
                        fill="white"
                        transform="translate(0 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>

              <div className="hidden items-center p-2.5 sm:flex xl:p-5">
                <p className="font-medium text-black dark:text-white">
                  {item.CreatedAt}
                  {/* {moment(item.CreatedAt, "MMM DD, YYYY").toString()} */}
                </p>
              </div>

              <div className="hidden items-center p-2.5 sm:flex xl:p-5">
                <p className="font-medium text-black dark:text-white">
                  {item.UpdatedAt}
                  {/* {moment(item.UpdatedAt, "MMM DD, YYYY").toString()} */}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
