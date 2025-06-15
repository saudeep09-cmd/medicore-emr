
export interface Visit {
  id: string;
  date: string;
  type: 'routine' | 'follow-up' | 'urgent' | 'consultation' | 'procedure';
  chiefComplaint: string;
  vitalSigns: {
    temperature?: number;
    bloodPressure?: string;
    heartRate?: number;
    respiratoryRate?: number;
    oxygenSaturation?: number;
    height?: number;
    weight?: number;
    bmi?: number;
  };
  assessment: string;
  plan: string;
  notes: string;
  providerId: string;
  providerName: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  retinalImage?: File;
  prediction?: string;
  confidence?: number;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  prescribedBy: string;
  status: 'active' | 'discontinued' | 'completed';
  notes?: string;
}

export interface Allergy {
  id: string;
  allergen: string;
  reaction: string;
  severity: 'mild' | 'moderate' | 'severe';
  onsetDate?: string;
  notes?: string;
}

export interface Problem {
  id: string;
  condition: string;
  icd10Code?: string;
  status: 'active' | 'resolved' | 'chronic';
  onsetDate: string;
  resolvedDate?: string;
  notes?: string;
}

export interface Patient {
  id: string;
  // Demographics
  name: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  ssn?: string;
  mrn: string; // Medical Record Number
  
  // Contact Information
  phone: string;
  email?: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  
  // Insurance Information
  insurance: {
    primary?: {
      provider: string;
      policyNumber: string;
      groupNumber?: string;
    };
    secondary?: {
      provider: string;
      policyNumber: string;
      groupNumber?: string;
    };
  };
  
  // Emergency Contact
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  
  // Medical Information
  medicalHistory: string;
  familyHistory?: string;
  socialHistory?: string;
  allergies: Allergy[];
  medications: Medication[];
  problems: Problem[];
  visits: Visit[];
  
  // System Information
  createdDate: string;
  lastUpdated: string;
  status: 'active' | 'inactive';
}

export interface Provider {
  id: string;
  name: string;
  specialty: string;
  npi: string;
  license: string;
}
