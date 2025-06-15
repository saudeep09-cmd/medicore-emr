
import { Patient } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, FileText, Eye } from 'lucide-react';
import { useState } from 'react';

interface VisitHistoryProps {
  patient: Patient;
}

export function VisitHistory({ patient }: VisitHistoryProps) {
  const [selectedVisit, setSelectedVisit] = useState<string | null>(null);
  
  const sortedVisits = [...patient.visits].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            Visit History
          </CardTitle>
          <CardDescription>
            {sortedVisits.length} total visits recorded
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sortedVisits.length > 0 ? (
            <div className="space-y-4">
              {sortedVisits.map((visit) => (
                <div key={visit.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div>
                        <p className="font-medium">
                          {new Date(visit.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                        <p className="text-sm text-muted-foreground capitalize">
                          {visit.type} visit
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={
                        visit.status === 'completed' ? 'default' :
                        visit.status === 'in-progress' ? 'secondary' :
                        visit.status === 'scheduled' ? 'outline' : 'destructive'
                      }>
                        {visit.status}
                      </Badge>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setSelectedVisit(selectedVisit === visit.id ? null : visit.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Provider</p>
                      <p className="text-muted-foreground">{visit.providerName}</p>
                    </div>
                    <div>
                      <p className="font-medium">Chief Complaint</p>
                      <p className="text-muted-foreground">{visit.chiefComplaint}</p>
                    </div>
                  </div>

                  {selectedVisit === visit.id && (
                    <div className="mt-4 pt-4 border-t space-y-4">
                      {/* Vital Signs */}
                      {Object.keys(visit.vitalSigns).length > 0 && (
                        <div>
                          <p className="font-medium mb-2">Vital Signs</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                            {visit.vitalSigns.temperature && (
                              <div>
                                <span className="text-muted-foreground">Temp:</span> {visit.vitalSigns.temperature}°F
                              </div>
                            )}
                            {visit.vitalSigns.bloodPressure && (
                              <div>
                                <span className="text-muted-foreground">BP:</span> {visit.vitalSigns.bloodPressure}
                              </div>
                            )}
                            {visit.vitalSigns.heartRate && (
                              <div>
                                <span className="text-muted-foreground">HR:</span> {visit.vitalSigns.heartRate} bpm
                              </div>
                            )}
                            {visit.vitalSigns.oxygenSaturation && (
                              <div>
                                <span className="text-muted-foreground">O2 Sat:</span> {visit.vitalSigns.oxygenSaturation}%
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Assessment & Plan */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="font-medium mb-2">Assessment</p>
                          <p className="text-sm text-muted-foreground bg-gray-50 p-3 rounded">
                            {visit.assessment}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium mb-2">Plan</p>
                          <p className="text-sm text-muted-foreground bg-gray-50 p-3 rounded">
                            {visit.plan}
                          </p>
                        </div>
                      </div>

                      {/* Clinical Notes */}
                      {visit.notes && (
                        <div>
                          <p className="font-medium mb-2">Clinical Notes</p>
                          <p className="text-sm text-muted-foreground bg-gray-50 p-3 rounded">
                            {visit.notes}
                          </p>
                        </div>
                      )}

                      {/* AI Predictions */}
                      {visit.prediction && (
                        <div>
                          <p className="font-medium mb-2">AI Analysis</p>
                          <div className="bg-blue-50 p-3 rounded">
                            <p className="text-sm font-medium text-blue-900">
                              Prediction: {visit.prediction}
                            </p>
                            {visit.confidence && (
                              <p className="text-sm text-blue-700">
                                Confidence: {(visit.confidence * 100).toFixed(1)}%
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="mx-auto h-12 w-12 mb-4 opacity-50" />
              <p>No visits recorded yet</p>
              <p className="text-sm">Click "New Visit" to add the first visit record</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
