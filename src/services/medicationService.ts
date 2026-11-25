import { MedicationReminder } from '../types';
import { mockMedicationReminders } from '../data/mockData';
import { apiClient } from '../api/client';

let localReminders = [...mockMedicationReminders];

export const medicationService = {
  async getReminders(babyId: string): Promise<MedicationReminder[]> {
    try {
      const res = await apiClient.get<MedicationReminder[]>('/medications', { babyId });
      if (res.data && res.data.length > 0) {
        return res.data;
      }
    } catch {
      // offline fallback
    }
    return localReminders.filter((m) => m.babyId === babyId);
  },

  async addReminder(data: Omit<MedicationReminder, 'id'>): Promise<MedicationReminder> {
    try {
      const res = await apiClient.post<MedicationReminder>('/medications', data);
      if (res.data) return res.data;
    } catch {
      // offline fallback
    }

    const newRem: MedicationReminder = {
      ...data,
      id: `med-${Date.now()}`
    };
    localReminders.push(newRem);
    return newRem;
  },

  async toggleStatus(id: string, status: 'active' | 'completed' | 'paused'): Promise<MedicationReminder> {
    try {
      const res = await apiClient.patch<MedicationReminder>(`/medications/${id}`, { status });
      if (res.data) return res.data;
    } catch {
      // offline fallback
    }

    const idx = localReminders.findIndex((m) => m.id === id);
    if (idx === -1) throw new Error('Medication reminder not found');
    localReminders[idx].status = status;
    return localReminders[idx];
  }
};
