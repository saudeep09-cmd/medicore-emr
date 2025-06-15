
import { Patient } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User, Phone, Mail, MapPin, Shield, Heart } from 'lucide-react';

interface PatientOverviewProps {
  patient: Patient;
}

export function PatientOverview({ patient }: PatientOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Demographics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="mr-2 h-5 w-5" />
            Demographics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-sm font-medium">Full Name</p>
            <p className="text-sm text-muted-foreground">{patient.name}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Date of Birth</p>
            <p className="text-sm text-muted-foreground">
              {new Date(patient.dateOfBirth).toLocaleDateString()} ({patient.age} years old)
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">Gender</p>
            <p className="text-sm text-muted-foreground capitalize">{patient.gender}</p>
          </div>
          <div>
            <p className="text-sm font-medium">MRN</p>
            <p className="text-sm text-muted-foreground font-mono">{patient.mrn}</p>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Phone className="mr-2 h-5 w-5" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{patient.phone}</span>
          </div>
          {patient.email && (
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{patient.email}</span>
            </div>
          )}
          <div className="flex items-start space-x-2">
            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div className="text-sm">
              <p>{patient.address.street}</p>
              <p>{patient.address.city}, {patient.address.state} {patient.address.zipCode}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insurance Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2 h-5 w-5" />
            Insurance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {patient.insurance.primary && (
            <div>
              <p className="text-sm font-medium">Primary Insurance</p>
              <p className="text-sm text-muted-foreground">{patient.insurance.primary.provider}</p>
              <p className="text-sm text-muted-foreground font-mono">
                {patient.insurance.primary.policyNumber}
              </p>
            </div>
          )}
          {patient.insurance.secondary && (
            <div>
              <p className="text-sm font-medium">Secondary Insurance</p>
              <p className="text-sm text-muted-foreground">{patient.insurance.secondary.provider}</p>
              <p className="text-sm text-muted-foreground font-mono">
                {patient.insurance.secondary.policyNumber}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Heart className="mr-2 h-5 w-5" />
            Emergency Contact
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-sm font-medium">{patient.emergencyContact.name}</p>
            <p className="text-sm text-muted-foreground">{patient.emergencyContact.relationship}</p>
            <p className="text-sm text-muted-foreground">{patient.emergencyContact.phone}</p>
          </div>
        </CardContent>
      </Card>

      {/* Active Problems */}
      <Card>
        <CardHeader>
          <CardTitle>Active Problems</CardTitle>
          <CardDescription>Current medical conditions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {patient.problems.filter(p => p.status === 'active' || p.status === 'chronic').map(problem => (
              <div key={problem.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{problem.condition}</p>
                  {problem.icd10Code && (
                    <p className="text-xs text-muted-foreground">{problem.icd10Code}</p>
                  )}
                </div>
                <Badge variant={problem.status === 'chronic' ? 'destructive' : 'default'}>
                  {problem.status}
                </Badge>
              </div>
            ))}
            {patient.problems.filter(p => p.status === 'active' || p.status === 'chronic').length === 0 && (
              <p className="text-sm text-muted-foreground">No active problems recorded</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Medical History */}
      <Card className="md:col-span-2 lg:col-span-1">
        <CardHeader>
          <CardTitle>Medical History</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-2">Past Medical History</p>
            <p className="text-sm text-muted-foreground">{patient.medicalHistory}</p>
          </div>
          
          {patient.familyHistory && (
            <>
              <Separator />
              <div>
                <p className="text-sm font-medium mb-2">Family History</p>
                <p className="text-sm text-muted-foreground">{patient.familyHistory}</p>
              </div>
            </>
          )}
          
          {patient.socialHistory && (
            <>
              <Separator />
              <div>
                <p className="text-sm font-medium mb-2">Social History</p>
                <p className="text-sm text-muted-foreground">{patient.socialHistory}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
