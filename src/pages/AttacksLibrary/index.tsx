import axios from "axios";
import Breadcrumb from "../../components/Breadcrumb";
import { useEffect, useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectTrigger,
} from "../../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
type Person = {
  id: string;
  name: string;
  tactic: string;
  severity: string;
  technique: string;
  type: string;
  os: string[];
  date: string;
};
export default function AttackLibrary() {
  const navigate = useNavigate();

  const [attacks, setAttcks] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [maxPage, setMaxPage] = useState(1);
  const [selectPageNumber, setSelectPageNumber] = useState(false);

  useEffect(() => {
    setMaxPage(Math.ceil(totalItems / itemsPerPage));
  }, [totalItems, itemsPerPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= maxPage) {
      setPage(newPage);
    }
  };

  // State for filters
  const [attackTypes, setAttackTypes] = useState<string[]>([]);
  const [affectedSystems, setAffectedSystems] = useState<string[]>([]);
  const [tactics, setTactics] = useState<string[]>([]);
  const [url, setUrl] = useState<string>("");
  const [search, setSearch] = useState("");

  // Function to toggle filters
  const toggleFilter = (filter: string, filterType: string) => {
    switch (filterType) {
      case "attackType":
        setAttackTypes((prevState) =>
          prevState.includes(filter)
            ? prevState.filter((item) => item !== filter)
            : [...prevState, filter]
        );
        break;
      case "affectedSystem":
        setAffectedSystems((prevState) =>
          prevState.includes(filter)
            ? prevState.filter((item) => item !== filter)
            : [...prevState, filter]
        );
        break;
      case "tactics":
        setTactics((prevState) =>
          prevState.includes(filter)
            ? prevState.filter((item) => item !== filter)
            : [...prevState, filter]
        );
        break;
      default:
        break;
    }
  };

  // Function to update URL and fetch data based on filters
  const applyFilters = () => {
    const queryParams = [];

    // Build query parameters
    if (attackTypes.length > 0)
      queryParams.push(`type=${attackTypes.join(",")}`);
    if (affectedSystems.length > 0)
      queryParams.push(`system=${affectedSystems.join(",")}`);
    if (tactics.length > 0) queryParams.push(`tactic=${tactics.join(",")}`);
    // Update URL
    const url = `${queryParams.length ? "?" + queryParams.join("&") : ""}`;
    // Fetch data based on updated URL
    fetchData(url);
  };

  // Function to fetch data from the server based on URL
  const fetchData = (url: string) => {
    setUrl(url);
    axios
      .get(
        `/attacks_library${url ? url : `?`}${
          search.length ? `&search=${search}&` : `&`
        }limit=${itemsPerPage}&offset=${(page - 1) * itemsPerPage}`
      )
      .then((res) => {
        setAttcks(
          res.data.Attacks.map(
            (attack: any, index: number) => (
              console.log(
                attack.Techniques.flatMap((technique: any) =>
                  technique.Tactics.map((tactic: any) => tactic.ID)
                ).join(", ")
              ),
              {
                id: (page - 1) * itemsPerPage + (index + 1),
                name: attack.Name,
                tactic: attack.Techniques.flatMap((technique: any) =>
                  technique.Tactics.map((tactic: any) => tactic.ID)
                ).join(", "),
                severity: attack.Complexity,
                technique: attack.Techniques.map(
                  (technique: any) => technique.Name
                ).join(", "),
                type: attack.Type,
                os: attack.Platforms,
                date: attack.CreatedAt,
              }
            )
          )
        );
        setTotalItems(res.data.TotalFilteredAttacks);
      });
  };

  useEffect(() => {
    applyFilters();
  }, [page, itemsPerPage, affectedSystems, tactics, attackTypes]);
  return (
    <div>
      <Breadcrumb
        pageName="Attacks Library"
        buttons={
          <div>
            <Button onClick={() => navigate("/create-attack")}>
              Create Attack
            </Button>
          </div>
        }
      />

      <div className="space-y-4 bg-white p-6">
        {/* FILTERS */}

        <div className="space-y-3">
          <div className="space-y-1">
            <span className="text-sm font-medium uppercase text-[#718096]">
              {/* @ts-ignore */}
              ATTACK TYPE
            </span>
            <div className="flex flex-wrap items-center gap-1">
              <FilterItem
                value={`All Attacks (${totalItems})`}
                onClick={() => setAttackTypes([])}
                isActive={attackTypes.length === 0}
              />
              <div className="mx-1 h-5 w-[2px] bg-[#4A5568]/20"></div>
              <FilterItem
                value="Endpoint Attacks"
                onClick={() => toggleFilter("Endpoint Attacks", "attackType")}
                isActive={attackTypes.includes("Endpoint Attacks")}
              />
              <FilterItem
                value="Web Attacks"
                onClick={() => toggleFilter("Web Attacks", "attackType")}
                isActive={attackTypes.includes("Web Attacks")}
              />
              <FilterItem
                value="Email Attacks"
                onClick={() => toggleFilter("Email Attacks", "attackType")}
                isActive={attackTypes.includes("Email Attacks")}
              />
              <FilterItem
                value="Network Attacks"
                onClick={() => toggleFilter("Network Attacks", "attackType")}
                isActive={attackTypes.includes("Network Attacks")}
              />
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-sm font-medium uppercase text-[#718096]">
              Affected System
            </span>
            <div className="flex flex-wrap items-center gap-1">
              <FilterItem
                value="All OS"
                onClick={() => setAffectedSystems([])}
                isActive={affectedSystems.length === 0}
              />
              <div className="mx-1 h-5 w-[2px] bg-[#4A5568]/20"></div>
              <FilterItem
                value="Windows"
                onClick={() => toggleFilter("windows", "affectedSystem")}
                isActive={affectedSystems.includes("windows")}
              />
              <FilterItem
                value="Mac"
                onClick={() => toggleFilter("mac", "affectedSystem")}
                isActive={affectedSystems.includes("mac")}
              />
              <FilterItem
                value="Linux"
                onClick={() => toggleFilter("linux", "affectedSystem")}
                isActive={affectedSystems.includes("linux")}
              />
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-sm font-medium uppercase text-[#718096]">
              Tactics{" "}
            </span>
            <div className="flex flex-wrap items-center gap-1">
              <FilterItem
                value="All Tactics"
                onClick={() => setTactics([])}
                isActive={tactics.length === 0}
              />
              <div className="mx-1 h-5 w-[2px] bg-[#4A5568]/20"></div>
              <FilterItem
                value="Reconnaissance"
                onClick={() => toggleFilter("Reconnaissance", "tactics")}
                isActive={tactics.includes("Reconnaissance")}
              />
              <FilterItem
                value="Resource Development"
                onClick={() => toggleFilter("Resource Development", "tactics")}
                isActive={tactics.includes("Resource Development")}
              />
              <FilterItem
                value="Initial Access"
                onClick={() => toggleFilter("Initial Access", "tactics")}
                isActive={tactics.includes("Initial Access")}
              />
              <FilterItem
                value="Execution"
                onClick={() => toggleFilter("Execution", "tactics")}
                isActive={tactics.includes("Execution")}
              />
              <FilterItem
                value="Persistence"
                onClick={() => toggleFilter("Persistence", "tactics")}
                isActive={tactics.includes("Persistence")}
              />{" "}
              <FilterItem
                value="Privilege Escalation"
                onClick={() => toggleFilter("Privilege Escalation", "tactics")}
                isActive={tactics.includes("Privilege Escalation")}
              />{" "}
              <FilterItem
                value="Defense Evasion"
                onClick={() => toggleFilter("Defense Evasion", "tactics")}
                isActive={tactics.includes("Defense Evasion")}
              />{" "}
              <FilterItem
                value="Credential Access"
                onClick={() => toggleFilter("Credential Access", "tactics")}
                isActive={tactics.includes("Credential Access")}
              />{" "}
              <FilterItem
                value="Discovery"
                onClick={() => toggleFilter("Discovery", "tactics")}
                isActive={tactics.includes("Discovery")}
              />{" "}
              <FilterItem
                value="Lateral Movement"
                onClick={() => toggleFilter("Lateral Movement", "tactics")}
                isActive={tactics.includes("Lateral Movement")}
              />{" "}
              <FilterItem
                value="Collection"
                onClick={() => toggleFilter("Collection", "tactics")}
                isActive={tactics.includes("Collection")}
              />{" "}
              <FilterItem
                value="Command and Control"
                onClick={() => toggleFilter("Command and Control", "tactics")}
                isActive={tactics.includes("Command and Control")}
              />
              <FilterItem
                value="Exfiltration"
                onClick={() => toggleFilter("Exfiltration", "tactics")}
                isActive={tactics.includes("Exfiltration")}
              />
              <FilterItem
                value="Impact"
                onClick={() => toggleFilter("Impact", "tactics")}
                isActive={tactics.includes("Impact")}
              />
            </div>
          </div>
        </div>
        <div className="flex w-full gap-2">
          <Input
            type="search"
            value={search}
            placeholder="Search by name"
            className="w-full placeholder:font-medium placeholder:text-[#718096]"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button onClick={applyFilters} size={"sm"} className={"my-auto"}>
            Search
          </Button>
        </div>
        {/* TABLE */}
        <hr />
        <div className="relative overflow-x-auto">
          <MyTable data={attacks} />{" "}
        </div>
        {/* PAGINATION */}
        <div className="flex w-full justify-between">
          <select
            className="cursor-pointer rounded border-[1.5px] border-solid p-1  px-2 text-sm  font-medium text-gray-700 duration-200 hover:border-gray-300 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-70"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option
                onClick={() => setSelectPageNumber(false)}
                key={pageSize}
                value={pageSize}
              >
                Show {pageSize}
              </option>
            ))}
          </select>
          <div className="flex space-x-2">
            <button
              className="cursor-pointer rounded  border-solid p-1  px-2 text-sm  font-medium text-gray-700 duration-200 hover:border-gray-300 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-70"
              onClick={() => (
                handlePageChange(page - 1), setSelectPageNumber(false)
              )}
              disabled={page === 1}
            >
              {"< Previous"}
            </button>
            <div className="space-x-1">
              {(maxPage == 1 ? [1] : maxPage == 2 ? [1, 2] : [1, 2, 3]).map(
                (pageNumber) => (
                  <button
                    className="cursor-pointer rounded border-[1.5px] border-solid p-1  px-2 text-sm  font-medium text-gray-700 duration-200 hover:border-gray-300 hover:bg-gray-200 disabled:cursor-not-allowed disabled:!bg-gray-900 disabled:!text-white"
                    key={pageNumber}
                    onClick={() => (
                      handlePageChange(pageNumber), setSelectPageNumber(false)
                    )}
                    disabled={page === pageNumber}
                  >
                    {pageNumber}
                  </button>
                )
              )}
              {maxPage > 3 && (
                <>
                  {selectPageNumber ? (
                    <>
                      {" "}
                      <input
                        placeholder="..."
                        className="cursor-pointer rounded border-[1.5px] border-solid bg-gray-100 p-1 px-2 text-sm font-medium  text-gray-700 duration-200 placeholder:text-gray-800 hover:border-gray-300 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-70"
                        type="number"
                        value={page}
                        onChange={(e) => setPage(parseInt(e.target.value))}
                        min={4}
                        max={maxPage}
                        style={{ width: "28px" }}
                      />
                    </>
                  ) : (
                    <>
                      {" "}
                      <span
                        onClick={() => setSelectPageNumber(true)}
                        className="cursor-pointer rounded border-[1.5px] border-solid p-1 px-2  text-sm font-medium  text-gray-700 duration-200 placeholder:text-gray-800 hover:border-gray-300 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        ...
                      </span>{" "}
                    </>
                  )}
                  <button
                    className="cursor-pointer rounded border-[1.5px] border-solid p-1  px-2 text-sm  font-medium text-gray-700 duration-200 hover:border-gray-300 hover:bg-gray-200 disabled:cursor-not-allowed disabled:!bg-gray-900 disabled:!text-white"
                    key={maxPage}
                    onClick={() => handlePageChange(maxPage)}
                    disabled={page === maxPage}
                  >
                    {maxPage}
                  </button>
                </>
              )}
            </div>
            <button
              className="cursor-pointer rounded  border-solid p-1  px-2 text-sm  font-medium text-gray-700 duration-200 hover:border-gray-300 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-70"
              onClick={() => (
                handlePageChange(page + 1), setSelectPageNumber(false)
              )}
              disabled={page * itemsPerPage >= totalItems}
            >
              {"Next >"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterItem({
  value,
  isActive,
  onClick,
}: {
  value: string;
  onClick: () => void;
  isActive: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className={`w-fit cursor-pointer  px-4 py-2 text-base font-medium text-[#4A5568] duration-200 hover:bg-[#dce2e8] ${
        isActive
          ? "bg-primary/10 text-primary hover:!bg-primary/20"
          : "bg-[#EEF2F6]"
      }`}
    >
      {value}
    </div>
  );
}

function MyTable({ data }: { data: Person[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Attack Name</TableHead>
          <TableHead>Severity</TableHead>
          <TableHead>Tactic</TableHead>
          <TableHead>Technique</TableHead>
          <TableHead>Attack Type</TableHead>
          <TableHead>Affected OS</TableHead>
          <TableHead>Release Date</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item: Person, index: number) => (
          <TableRow key={index}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.severity}</TableCell>
            <TableCell>{item.tactic}</TableCell>
            <TableCell>{item.technique}</TableCell>
            <TableCell>{item.type}</TableCell>
            <TableCell>{item.os}</TableCell>
            <TableCell>{item.date}</TableCell>
            <TableCell>- - -</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
