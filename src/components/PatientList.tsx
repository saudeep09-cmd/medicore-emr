
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
import { ChevronRight, Calendar, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export function PatientList() {
  const patients = useStore((state) => state.patients);
  const navigate = useNavigate();

  const handlePatientSelect = (patient: Patient) => {
    navigate(`/patient/${patient.id}`);
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Age/Gender</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Last Visit</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => {
            const lastVisit = patient.visits.length > 0 
              ? patient.visits.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
              : null;
              
            return (
              <TableRow
                key={patient.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handlePatientSelect(patient)}
              >
                <TableCell className="font-medium font-mono">
                  {patient.mrn}
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{patient.name}</p>
                    <p className="text-sm text-muted-foreground">DOB: {new Date(patient.dateOfBirth).toLocaleDateString()}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p>{patient.age} years</p>
                    <p className="text-muted-foreground capitalize">{patient.gender}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Phone className="mr-1 h-3 w-3" />
                    {patient.phone}
                  </div>
                </TableCell>
                <TableCell>
                  {lastVisit ? (
                    <div className="text-sm">
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        {new Date(lastVisit.date).toLocaleDateString()}
                      </div>
                      <p className="text-muted-foreground capitalize">{lastVisit.type}</p>
                    </div>
                  ) : (
                    <span className="text-muted-foreground text-sm">No visits</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant={patient.status === 'active' ? 'default' : 'secondary'}>
                    {patient.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <ChevronRight className="h-4 w-4 inline-block" />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
