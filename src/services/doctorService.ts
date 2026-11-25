import { ClinicalSoapNote, Prescription } from '../types';
import { mockDoctorPatients, mockClinicalNotes, mockPrescriptions } from '../data/mockData';
import { apiClient } from '../api/client';

let localSoapNotes = [...mockClinicalNotes];
let localPrescriptions = [...mockPrescriptions];

export const doctorService = {
  async getPatients() {
    return mockDoctorPatients;
  },

  async getSoapNotes(babyId?: string): Promise<ClinicalSoapNote[]> {
    try {
      const res = await apiClient.get<ClinicalSoapNote[]>('/clinical/soap-notes', babyId ? { babyId } : undefined);
      if (res.data && res.data.length > 0) return res.data;
    } catch {
      // offline fallback
    }

    if (babyId) {
      return localSoapNotes.filter((n) => n.babyId === babyId);
    }
    return [...localSoapNotes];
  },

  async saveSoapNote(note: Omit<ClinicalSoapNote, 'id' | 'signed'>): Promise<ClinicalSoapNote> {
    try {
      const res = await apiClient.post<ClinicalSoapNote>('/clinical/soap-notes', note);
      if (res.data) return res.data;
    } catch {
      // offline fallback
    }

    const newNote: ClinicalSoapNote = {
      ...note,
      id: `soap-${Date.now()}`,
      signed: true
    };
    localSoapNotes.unshift(newNote);
    return newNote;
  },

  async getPrescriptions(babyId?: string): Promise<Prescription[]> {
    try {
      const res = await apiClient.get<Prescription[]>('/clinical/prescriptions', babyId ? { babyId } : undefined);
      if (res.data && res.data.length > 0) return res.data;
    } catch {
      // offline fallback
    }

    if (babyId) {
      return localPrescriptions.filter((p) => p.babyId === babyId);
    }
    return [...localPrescriptions];
  },

  async createPrescription(rx: Omit<Prescription, 'id'>): Promise<Prescription> {
    try {
      const res = await apiClient.post<Prescription>('/clinical/prescriptions', rx);
      if (res.data) return res.data;
    } catch {
      // offline fallback
    }

    const newRx: Prescription = {
      ...rx,
      id: `rx-${Date.now()}`
    };
    localPrescriptions.unshift(newRx);
    return newRx;
  }
};
