import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

export default function TaskHistory({ data }: { data: any }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Task ID</TableHead>
          <TableHead>Simulation name</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Start At</TableHead>
          <TableHead>End At</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((task: any, index: number) => (
          <TableRow key={index}>
            <TableCell>{task.TaskID}</TableCell>
            <TableCell>{task.SimulationName}</TableCell>
            <TableCell>{task.CreatedAt}</TableCell>
            <TableCell>{task.StartAt}</TableCell>
            <TableCell>{task.EndAt}</TableCell>
            <TableCell>{task.Status}</TableCell>
            <TableCell className="text-right">- - -</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
