
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
import { ChevronRight, Calendar, Phone, User, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export function PatientList() {
  const patients = useStore((state) => state.patients);
  const navigate = useNavigate();

  const handlePatientSelect = (patient: Patient) => {
    navigate(`/patient/${patient.id}`);
  };

  if (patients.length === 0) {
    return (
      <div className="text-center py-12">
        <User className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No patients yet</h3>
        <p className="text-gray-500 mb-6">Get started by adding your first patient record</p>
      </div>
    );
  }

  return (
    <div className="border rounded-xl overflow-hidden shadow-sm">
      <Table>
        <TableHeader className="bg-gray-50/50">
          <TableRow className="border-b">
            <TableHead className="font-semibold">Patient ID</TableHead>
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead className="font-semibold">Age/Gender</TableHead>
            <TableHead className="font-semibold">Phone</TableHead>
            <TableHead className="font-semibold">Last Visit</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="text-right font-semibold">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient, index) => {
            const lastVisit = patient.visits.length > 0 
              ? patient.visits.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
              : null;
              
            return (
              <TableRow
                key={patient.id}
                className="cursor-pointer hover:bg-blue-50/50 transition-all duration-200 group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => handlePatientSelect(patient)}
              >
                <TableCell className="font-medium font-mono text-blue-600">
                  {patient.mrn}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{patient.name}</p>
                      <p className="text-sm text-gray-500">DOB: {new Date(patient.dateOfBirth).toLocaleDateString()}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p className="font-medium">{patient.age} years</p>
                    <p className="text-gray-500 capitalize">{patient.gender}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="mr-2 h-4 w-4 text-gray-400" />
                    {patient.phone}
                  </div>
                </TableCell>
                <TableCell>
                  {lastVisit ? (
                    <div className="text-sm">
                      <div className="flex items-center text-gray-900">
                        <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                        {new Date(lastVisit.date).toLocaleDateString()}
                      </div>
                      <p className="text-gray-500 capitalize mt-1">{lastVisit.type}</p>
                    </div>
                  ) : (
                    <span className="text-gray-400 text-sm">No visits</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={patient.status === 'active' ? 'default' : 'secondary'}
                    className={patient.status === 'active' ? 'bg-green-100 text-green-800 border-green-200' : ''}
                  >
                    <Activity className="w-3 h-3 mr-1" />
                    {patient.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
