
import { AddPatientDialog } from "@/components/AddPatientDialog";
import { PatientList } from "@/components/PatientList";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <header className="flex items-center justify-between pb-6 border-b">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              EyeSight EMR
            </h1>
            <p className="text-muted-foreground">
              AI-Powered Diabetic Retinopathy Detection
            </p>
          </div>
          {/* TODO: Add API config button here */}
        </header>

        <main className="pt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Patient Records</CardTitle>
                <CardDescription>
                  Browse and manage your patient records.
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
