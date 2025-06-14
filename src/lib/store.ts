
import { create } from 'zustand';
import { Patient } from './types';

interface AppState {
  patients: Patient[];
  apiUrl: string;
  addPatient: (patient: Omit<Patient, 'id' | 'visits'>) => void;
  setApiUrl: (url: string) => void;
}

export const useStore = create<AppState>((set) => ({
  patients: [
    {
      id: 'p1',
      name: 'John Doe',
      age: 65,
      history: 'Type 2 Diabetes for 15 years.',
      visits: [],
    },
    {
      id: 'p2',
      name: 'Jane Smith',
      age: 58,
      history: 'Hypertension, recently diagnosed with Type 2 Diabetes.',
      visits: [],
    },
  ],
  apiUrl: 'https://saudeep09-eye-sight-insight.hf.space/predict',
  addPatient: (patient) =>
    set((state) => ({
      patients: [
        ...state.patients,
        { ...patient, id: `p${state.patients.length + 1}`, visits: [] },
      ],
    })),
  setApiUrl: (url) => set({ apiUrl: url }),
}));
