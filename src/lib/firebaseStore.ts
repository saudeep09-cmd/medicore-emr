
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import { Patient, Visit } from './types';

export class FirebaseStore {
  private patientsCollection = collection(db, 'patients');
  private visitsCollection = collection(db, 'visits');

  async addPatient(patient: Omit<Patient, 'id' | 'visits' | 'createdDate' | 'lastUpdated' | 'mrn'>) {
    try {
      const now = new Date().toISOString();
      const mrn = 'MRN' + Date.now().toString().slice(-6);
      
      const patientData = {
        ...patient,
        name: `${patient.firstName} ${patient.lastName}`,
        mrn,
        visits: [],
        createdDate: now,
        lastUpdated: now
      };

      const docRef = await addDoc(this.patientsCollection, patientData);
      return { id: docRef.id, ...patientData };
    } catch (error) {
      console.error('Error adding patient:', error);
      throw error;
    }
  }

  async getPatients(): Promise<Patient[]> {
    try {
      const querySnapshot = await getDocs(this.patientsCollection);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Patient));
    } catch (error) {
      console.error('Error getting patients:', error);
      throw error;
    }
  }

  async updatePatient(id: string, updates: Partial<Patient>) {
    try {
      const patientRef = doc(db, 'patients', id);
      await updateDoc(patientRef, {
        ...updates,
        lastUpdated: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating patient:', error);
      throw error;
    }
  }

  async deletePatient(id: string) {
    try {
      await deleteDoc(doc(db, 'patients', id));
    } catch (error) {
      console.error('Error deleting patient:', error);
      throw error;
    }
  }

  async addVisit(patientId: string, visit: Omit<Visit, 'id'>) {
    try {
      const visitData = {
        ...visit,
        patientId
      };
      
      const docRef = await addDoc(this.visitsCollection, visitData);
      return { id: docRef.id, ...visitData };
    } catch (error) {
      console.error('Error adding visit:', error);
      throw error;
    }
  }
}

export const firebaseStore = new FirebaseStore();
