import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

export default function ScheduledSimulations({ data }: { data: any }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Simulation name</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Frequency</TableHead>
          <TableHead>Next run</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((task: any, index: number) => (
          <TableRow key={index}>
            <TableCell>{task.SimulationName}</TableCell>
            <TableCell>{task.CreatedAt}</TableCell>
            <TableCell>{task.Frequency}</TableCell>
            <TableCell>{task.NextRun}</TableCell>
            <TableCell className="text-right">- - -</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
