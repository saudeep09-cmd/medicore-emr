import { AddPatientDialog } from "@/components/AddPatientDialog";
import { PatientList } from "@/components/PatientList";
import { FirebaseSettings } from "@/components/FirebaseSettings";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <header className="flex items-center justify-between pb-6 border-b">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              MediCore EMR
            </h1>
            <p className="text-muted-foreground">
              Comprehensive Electronic Medical Records System for Healthcare Providers
            </p>
          </div>
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </header>

        <main className="pt-6">
          <FirebaseSettings />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Total Patients</CardTitle>
                <CardDescription>Active patient records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Today's Visits</CardTitle>
                <CardDescription>Scheduled appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Medical Screenings</CardTitle>
                <CardDescription>Diagnostic tests completed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Patient Records</CardTitle>
                <CardDescription>
                  Manage patient demographics, medical history, and clinical records
                </CardDescription>
              </div>
              <AddPatientDialog />
            </CardHeader>
            <CardContent>
              <PatientList />
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Index;
