
import { Patient } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Pill } from 'lucide-react';

interface MedicationListProps {
  patient: Patient;
}

export function MedicationList({ patient }: MedicationListProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center">
            <Pill className="mr-2 h-5 w-5" />
            Medications
          </CardTitle>
          <CardDescription>
            Current and past medications
          </CardDescription>
        </div>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Medication
        </Button>
      </CardHeader>
      <CardContent>
        {patient.medications.length > 0 ? (
          <div className="space-y-4">
            {patient.medications.map((medication) => (
              <div key={medication.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{medication.name}</h4>
                  <Badge variant={medication.status === 'active' ? 'default' : 'secondary'}>
                    {medication.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                  <div>
                    <span className="font-medium">Dosage:</span> {medication.dosage}
                  </div>
                  <div>
                    <span className="font-medium">Frequency:</span> {medication.frequency}
                  </div>
                  <div>
                    <span className="font-medium">Start Date:</span> {new Date(medication.startDate).toLocaleDateString()}
                  </div>
                  <div>
                    <span className="font-medium">Prescribed By:</span> {medication.prescribedBy}
                  </div>
                  {medication.endDate && (
                    <div>
                      <span className="font-medium">End Date:</span> {new Date(medication.endDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
                {medication.notes && (
                  <div className="mt-2 text-sm">
                    <span className="font-medium">Notes:</span> {medication.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Pill className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <p>No medications recorded</p>
            <p className="text-sm">Click "Add Medication" to record the first medication</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
