import { create } from 'zustand';
import { Patient, Visit, Provider } from './types';
import { firebaseStore } from './firebaseStore';

interface AppState {
  patients: Patient[];
  providers: Provider[];
  currentPatient: Patient | null;
  apiUrl: string;
  useFirebase: boolean;
  addPatient: (patient: Omit<Patient, 'id' | 'visits' | 'createdDate' | 'lastUpdated' | 'mrn'>) => Promise<void>;
  updatePatient: (id: string, updates: Partial<Patient>) => Promise<void>;
  setCurrentPatient: (patient: Patient | null) => void;
  addVisit: (patientId: string, visit: Omit<Visit, 'id'>) => Promise<void>;
  setApiUrl: (url: string) => void;
  loadPatients: () => Promise<void>;
  toggleFirebase: (enabled: boolean) => void;
}

const generateMRN = () => {
  return 'MRN' + Date.now().toString().slice(-6);
};

export const useStore = create<AppState>((set, get) => ({
  patients: [
    {
      id: 'p1',
      name: 'John Doe',
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '1958-03-15',
      age: 65,
      gender: 'male',
      mrn: 'MRN001234',
      phone: '(555) 123-4567',
      email: 'john.doe@email.com',
      address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zipCode: '12345'
      },
      insurance: {
        primary: {
          provider: 'Blue Cross Blue Shield',
          policyNumber: 'BC123456789',
          groupNumber: 'GRP001'
        }
      },
      emergencyContact: {
        name: 'Jane Doe',
        relationship: 'Spouse',
        phone: '(555) 123-4568'
      },
      medicalHistory: 'Type 2 Diabetes Mellitus diagnosed 2008, Hypertension diagnosed 2010',
      familyHistory: 'Father: Type 2 DM, CAD. Mother: Hypertension.',
      socialHistory: 'Non-smoker, occasional alcohol use, sedentary lifestyle',
      allergies: [
        {
          id: 'a1',
          allergen: 'Penicillin',
          reaction: 'Rash',
          severity: 'moderate'
        }
      ],
      medications: [
        {
          id: 'm1',
          name: 'Metformin',
          dosage: '500mg',
          frequency: 'Twice daily',
          startDate: '2023-01-01',
          prescribedBy: 'Dr. Smith',
          status: 'active'
        }
      ],
      problems: [
        {
          id: 'pr1',
          condition: 'Type 2 Diabetes Mellitus',
          icd10Code: 'E11.9',
          status: 'chronic',
          onsetDate: '2008-06-15'
        }
      ],
      visits: [],
      createdDate: '2023-01-01',
      lastUpdated: '2024-01-01',
      status: 'active'
    },
    {
      id: 'p2',
      name: 'Jane Smith',
      firstName: 'Jane',
      lastName: 'Smith',
      dateOfBirth: '1965-08-22',
      age: 58,
      gender: 'female',
      mrn: 'MRN001235',
      phone: '(555) 987-6543',
      email: 'jane.smith@email.com',
      address: {
        street: '456 Oak Ave',
        city: 'Springfield',
        state: 'CA',
        zipCode: '54321'
      },
      insurance: {
        primary: {
          provider: 'Aetna',
          policyNumber: 'AET987654321'
        }
      },
      emergencyContact: {
        name: 'Bob Smith',
        relationship: 'Husband',
        phone: '(555) 987-6544'
      },
      medicalHistory: 'Hypertension diagnosed 2020, recently diagnosed with Type 2 Diabetes',
      familyHistory: 'Mother: Type 2 DM. Father: Hypertension, stroke.',
      socialHistory: 'Non-smoker, minimal alcohol use, walks regularly',
      allergies: [],
      medications: [
        {
          id: 'm2',
          name: 'Lisinopril',
          dosage: '10mg',
          frequency: 'Once daily',
          startDate: '2020-03-01',
          prescribedBy: 'Dr. Johnson',
          status: 'active'
        }
      ],
      problems: [
        {
          id: 'pr2',
          condition: 'Essential Hypertension',
          icd10Code: 'I10',
          status: 'chronic',
          onsetDate: '2020-03-01'
        }
      ],
      visits: [],
      createdDate: '2020-03-01',
      lastUpdated: '2024-01-01',
      status: 'active'
    }
  ],
  providers: [
    {
      id: 'prov1',
      name: 'Dr. Sarah Smith',
      specialty: 'Ophthalmology',
      npi: '1234567890',
      license: 'CA12345'
    },
    {
      id: 'prov2',
      name: 'Dr. Michael Johnson',
      specialty: 'Internal Medicine',
      npi: '0987654321',
      license: 'CA67890'
    }
  ],
  currentPatient: null,
  apiUrl: 'https://saudeep09-eye-sight-insight.hf.space/predict',
  useFirebase: false,
  
  addPatient: async (patient) => {
    const state = get();
    if (state.useFirebase) {
      try {
        const newPatient = await firebaseStore.addPatient(patient);
        set((state) => ({
          patients: [...state.patients, newPatient],
        }));
      } catch (error) {
        console.error('Failed to add patient to Firebase:', error);
        // Fallback to local storage
        set((state) => ({
          patients: [
            ...state.patients,
            { 
              ...patient, 
              id: `p${state.patients.length + 1}`,
              name: `${patient.firstName} ${patient.lastName}`,
              mrn: generateMRN(),
              visits: [],
              createdDate: new Date().toISOString(),
              lastUpdated: new Date().toISOString()
            },
          ],
        }));
      }
    } else {
      set((state) => ({
        patients: [
          ...state.patients,
          { 
            ...patient, 
            id: `p${state.patients.length + 1}`,
            name: `${patient.firstName} ${patient.lastName}`,
            mrn: generateMRN(),
            visits: [],
            createdDate: new Date().toISOString(),
            lastUpdated: new Date().toISOString()
          },
        ],
      }));
    }
  },
    
  updatePatient: async (id, updates) => {
    const state = get();
    if (state.useFirebase) {
      try {
        await firebaseStore.updatePatient(id, updates);
      } catch (error) {
        console.error('Failed to update patient in Firebase:', error);
      }
    }
    
    set((state) => ({
      patients: state.patients.map((patient) =>
        patient.id === id 
          ? { ...patient, ...updates, lastUpdated: new Date().toISOString() }
          : patient
      ),
    }));
  },
    
  setCurrentPatient: (patient) => set({ currentPatient: patient }),
  
  addVisit: async (patientId, visit) => {
    const state = get();
    if (state.useFirebase) {
      try {
        await firebaseStore.addVisit(patientId, visit);
      } catch (error) {
        console.error('Failed to add visit to Firebase:', error);
      }
    }
    
    set((state) => ({
      patients: state.patients.map((patient) =>
        patient.id === patientId
          ? {
              ...patient,
              visits: [
                ...patient.visits,
                { ...visit, id: `v${Date.now()}` }
              ],
              lastUpdated: new Date().toISOString()
            }
          : patient
      ),
    }));
  },
    
  setApiUrl: (url) => set({ apiUrl: url }),
  
  loadPatients: async () => {
    const state = get();
    if (state.useFirebase) {
      try {
        const patients = await firebaseStore.getPatients();
        set({ patients });
      } catch (error) {
        console.error('Failed to load patients from Firebase:', error);
      }
    }
  },
  
  toggleFirebase: (enabled) => set({ useFirebase: enabled }),
}));
