
import { Patient } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, FileText } from 'lucide-react';

interface ProblemListProps {
  patient: Patient;
}

export function ProblemList({ patient }: ProblemListProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            Problem List
          </CardTitle>
          <CardDescription>
            Active and resolved medical problems
          </CardDescription>
        </div>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Problem
        </Button>
      </CardHeader>
      <CardContent>
        {patient.problems.length > 0 ? (
          <div className="space-y-4">
            {patient.problems.map((problem) => (
              <div key={problem.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{problem.condition}</h4>
                  <Badge variant={
                    problem.status === 'active' ? 'destructive' :
                    problem.status === 'chronic' ? 'destructive' : 'secondary'
                  }>
                    {problem.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                  {problem.icd10Code && (
                    <div>
                      <span className="font-medium">ICD-10:</span> {problem.icd10Code}
                    </div>
                  )}
                  <div>
                    <span className="font-medium">Onset Date:</span> {new Date(problem.onsetDate).toLocaleDateString()}
                  </div>
                  {problem.resolvedDate && (
                    <div>
                      <span className="font-medium">Resolved Date:</span> {new Date(problem.resolvedDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
                {problem.notes && (
                  <div className="mt-2 text-sm">
                    <span className="font-medium">Notes:</span> {problem.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <p>No problems recorded</p>
            <p className="text-sm">Click "Add Problem" to record the first problem</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
