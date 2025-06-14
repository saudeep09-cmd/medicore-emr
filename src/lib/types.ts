
export interface Visit {
  id: string;
  date: string;
  notes: string;
  retinalImage?: File;
  prediction?: string;
  confidence?: number;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  history: string;
  visits: Visit[];
}
