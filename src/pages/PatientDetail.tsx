
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, Calendar, User, Heart, Pill, AlertTriangle, FileText } from 'lucide-react';
import { PatientOverview } from '@/components/PatientOverview';
import { VisitHistory } from '@/components/VisitHistory';
import { MedicationList } from '@/components/MedicationList';
import { ProblemList } from '@/components/ProblemList';
import { AllergyList } from '@/components/AllergyList';
import { AddVisitDialog } from '@/components/AddVisitDialog';
import { useState } from 'react';

const PatientDetail = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const patients = useStore((state) => state.patients);
  const [showAddVisit, setShowAddVisit] = useState(false);
  
  const patient = patients.find(p => p.id === patientId);
  
  if (!patient) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-background flex items-center justify-center">
        <Card>
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Patient Not Found</h2>
            <p className="text-muted-foreground mb-4">The requested patient record could not be found.</p>
            <Button onClick={() => navigate('/')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{patient.name}</h1>
              <p className="text-muted-foreground">MRN: {patient.mrn}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={patient.status === 'active' ? 'default' : 'secondary'}>
              {patient.status}
            </Badge>
            <Button onClick={() => setShowAddVisit(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Visit
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid grid-cols-6 w-full">
            <TabsTrigger value="overview" className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="visits" className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              Visits
            </TabsTrigger>
            <TabsTrigger value="problems" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              Problems
            </TabsTrigger>
            <TabsTrigger value="medications" className="flex items-center">
              <Pill className="mr-2 h-4 w-4" />
              Medications
            </TabsTrigger>
            <TabsTrigger value="allergies" className="flex items-center">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Allergies
            </TabsTrigger>
            <TabsTrigger value="vitals" className="flex items-center">
              <Heart className="mr-2 h-4 w-4" />
              Vitals
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <PatientOverview patient={patient} />
          </TabsContent>

          <TabsContent value="visits">
            <VisitHistory patient={patient} />
          </TabsContent>

          <TabsContent value="problems">
            <ProblemList patient={patient} />
          </TabsContent>

          <TabsContent value="medications">
            <MedicationList patient={patient} />
          </TabsContent>

          <TabsContent value="allergies">
            <AllergyList patient={patient} />
          </TabsContent>

          <TabsContent value="vitals">
            <Card>
              <CardHeader>
                <CardTitle>Vital Signs Trends</CardTitle>
                <CardDescription>
                  Track vital signs over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Vital signs tracking will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <AddVisitDialog 
          patient={patient} 
          open={showAddVisit} 
          onOpenChange={setShowAddVisit}
        />
      </div>
    </div>
  );
};

export default PatientDetail;
