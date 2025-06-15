
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
import { Settings, Activity, Users, Calendar, FileText, TrendingUp, Heart } from "lucide-react";
import { useStore } from "@/lib/store";

const Index = () => {
  const patients = useStore((state) => state.patients);
  const todaysVisits = patients.flatMap(p => p.visits).filter(v => {
    const today = new Date().toDateString();
    return new Date(v.date).toDateString() === today;
  }).length;

  const totalScreenings = patients.flatMap(p => p.visits).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <header className="flex items-center justify-between pb-8 border-b border-gray-200 dark:border-gray-700">
          <div className="animate-fade-in">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Activity className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                MediCore EMR
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              AI-Powered Electronic Medical Records System for Modern Healthcare
            </p>
          </div>
          <Button variant="outline" size="lg" className="hover-scale shadow-lg">
            <Settings className="mr-2 h-5 w-5" />
            Settings
          </Button>
        </header>

        <main className="pt-8 space-y-8">
          <div className="animate-fade-in">
            <FirebaseSettings />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
            <Card className="hover-scale transition-all duration-300 hover:shadow-xl border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl text-white">Total Patients</CardTitle>
                    <CardDescription className="text-blue-100">Active patient records</CardDescription>
                  </div>
                  <Users className="h-8 w-8 text-blue-200" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold mb-2">{patients.length}</div>
                <div className="flex items-center text-blue-100">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-sm">+12% from last month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover-scale transition-all duration-300 hover:shadow-xl border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl text-white">Today's Visits</CardTitle>
                    <CardDescription className="text-green-100">Scheduled appointments</CardDescription>
                  </div>
                  <Calendar className="h-8 w-8 text-green-200" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold mb-2">{todaysVisits}</div>
                <div className="flex items-center text-green-100">
                  <Heart className="h-4 w-4 mr-1" />
                  <span className="text-sm">Active monitoring</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover-scale transition-all duration-300 hover:shadow-xl border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl text-white">Medical Records</CardTitle>
                    <CardDescription className="text-purple-100">Total clinical entries</CardDescription>
                  </div>
                  <FileText className="h-8 w-8 text-purple-200" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold mb-2">{totalScreenings}</div>
                <div className="flex items-center text-purple-100">
                  <Activity className="h-4 w-4 mr-1" />
                  <span className="text-sm">AI-enhanced insights</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="animate-fade-in border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-6">
              <div>
                <CardTitle className="text-2xl flex items-center">
                  <Users className="mr-3 h-6 w-6 text-blue-600" />
                  Patient Records
                </CardTitle>
                <CardDescription className="text-lg mt-2">
                  Comprehensive patient management with AI-powered insights and secure cloud storage
                </CardDescription>
              </div>
              <AddPatientDialog />
            </CardHeader>
            <CardContent>
              <PatientList />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
            <Card className="border-0 shadow-lg hover-scale transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="mr-2 h-5 w-5 text-blue-600" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Firebase Connection</span>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-green-600 font-medium">Connected</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>AI Analytics</span>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-green-600 font-medium">Active</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Data Sync</span>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-green-600 font-medium">Real-time</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover-scale transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-green-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full justify-start" variant="ghost">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Appointment
                  </Button>
                  <Button className="w-full justify-start" variant="ghost">
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Report
                  </Button>
                  <Button className="w-full justify-start" variant="ghost">
                    <Activity className="mr-2 h-4 w-4" />
                    View Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
