import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

interface Props {
  children: React.ReactNode;
  lable: string;
}

function Item({ children, lable }: Props) {
  return (
    <div className="flex flex-col gap-[2px]">
      <span className="text-sm font-medium uppercase">{lable}</span>
      <span className="text-base font-medium text-gray-900">{children}</span>
    </div>
  );
}

export default function Information({ data }: { data: any }) {
  return (
    <section className="animate w-full caption-bottom space-y-8 border border-solid border-gray-200 bg-white px-6 py-5 text-sm">
      <div className="flex gap-10">
        <div className="w-full space-y-4">
          <div className="space-y-4">
            <span className="text-lg font-medium text-gray-900">Endpoint</span>
            <hr />
          </div>
          <div className="space-y-4">
            <Item lable={"Host Name"}>
              <span>{data?.HostName}</span>
            </Item>
            <Item lable={"IP Address"}>
              <span>{data?.IPAddress}</span>
            </Item>
            <Item lable={"Mac Address"}>
              <span>{data?.MacAddress}</span>
            </Item>
            <Item lable={"OS / Architecture"}>
              <span>{data?.OSArchitecture}</span>
            </Item>
            <Item lable={"OS Detail"}>
              <span>{data?.OSDetail}</span>
            </Item>
            <Item lable={"Processor"}>
              <span>{data?.Processor}</span>
            </Item>
            <Item lable={"RAM"}>
              <span>{data?.RAM}</span>
            </Item>
            <Item lable={"Manufacturer / MODEL"}>
              <span>{data?.ManufacturerModel}</span>
            </Item>
            <Item lable={"Motherboard Serial"}>
              <span>{data?.MotherboardSerial}</span>
            </Item>
            <Item lable={"Read Roles"}>
              <span className="text-primary">
                {data?.ReadRoles.map((role: any, index: number) => (
                  <span key={index}>{role.roleName}, </span>
                ))}
              </span>
            </Item>
            <Item lable={"Execute Roles"}>
              <span className="text-primary">
                {data?.ExecuteRoles.map((role: any, index: number) => (
                  <span key={index}>{role.roleName}, </span>
                ))}
              </span>{" "}
            </Item>
          </div>
        </div>
        <div className="w-full space-y-4">
          <div className="space-y-3">
            <span className="text-lg font-medium text-gray-900">
              Thawd Agent
            </span>
            <hr />
          </div>
          <div className="space-y-2">
            <Item lable={"Agent ID"}>
              <span>{data?.AgentID}</span>
            </Item>
            <Item lable={"Agent Connected"}>
              <span>{data?.AgentStatus}</span>
            </Item>
            <Item lable={"Agent Version"}>
              <span>{data?.AgentVersion}</span>
            </Item>
            <Item lable={"Last Seen"}>
              <span>{data?.LastContact}</span>
            </Item>
            <Item lable={"Created At"}>
              <span>{data?.CreatedDate}</span>
            </Item>
            <Item lable={"Mitigation"}>
              <div className="space-x-2">
                {" "}
                {data?.Mitigation.map((role: any, index: number) => (
                  <span className="bg-gray-100 px-2 py-1" key={index}>
                    {role}
                  </span>
                ))}
              </div>
            </Item>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <span className="text-lg font-medium text-gray-900">Task queue</span>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task ID</TableHead>
              <TableHead>Simulation name</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.TaskQueue.map((task: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{task.TaskID}</TableCell>
                <TableCell>{task.SimulationName}</TableCell>
                <TableCell>{task.CreatedAt}</TableCell>
                <TableCell>{task.Status}</TableCell>
                <TableCell className="text-right">- - -</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
