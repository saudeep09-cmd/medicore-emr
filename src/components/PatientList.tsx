
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useStore } from "@/lib/store";
import { Patient } from "@/lib/types";
import { ChevronRight } from "lucide-react";
import { toast } from "./ui/use-toast";

export function PatientList() {
  const patients = useStore((state) => state.patients);

  const handlePatientSelect = (patient: Patient) => {
    // TODO: Navigate to patient detail page
    toast({
      title: "Coming Soon!",
      description: `The details page for ${patient.name} is not yet implemented.`,
    });
    console.log("Selected patient:", patient.id);
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Age</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => (
            <TableRow
              key={patient.id}
              className="cursor-pointer"
              onClick={() => handlePatientSelect(patient)}
            >
              <TableCell className="font-medium">{patient.id.toUpperCase()}</TableCell>
              <TableCell>{patient.name}</TableCell>
              <TableCell>{patient.age}</TableCell>
              <TableCell className="text-right">
                <ChevronRight className="h-4 w-4 inline-block" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
