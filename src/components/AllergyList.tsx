
import { Patient } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, AlertTriangle } from 'lucide-react';

interface AllergyListProps {
  patient: Patient;
}

export function AllergyList({ patient }: AllergyListProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5" />
            Allergies
          </CardTitle>
          <CardDescription>
            Known allergies and adverse reactions
          </CardDescription>
        </div>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Allergy
        </Button>
      </CardHeader>
      <CardContent>
        {patient.allergies.length > 0 ? (
          <div className="space-y-4">
            {patient.allergies.map((allergy) => (
              <div key={allergy.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{allergy.allergen}</h4>
                  <Badge variant={
                    allergy.severity === 'severe' ? 'destructive' :
                    allergy.severity === 'moderate' ? 'default' : 'secondary'
                  }>
                    {allergy.severity}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div>
                    <span className="font-medium">Reaction:</span> {allergy.reaction}
                  </div>
                  {allergy.onsetDate && (
                    <div>
                      <span className="font-medium">Onset Date:</span> {new Date(allergy.onsetDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
                {allergy.notes && (
                  <div className="mt-2 text-sm">
                    <span className="font-medium">Notes:</span> {allergy.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <AlertTriangle className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <p>No allergies recorded</p>
            <p className="text-sm">Click "Add Allergy" to record the first allergy</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
