import { Baby } from '../types';
import { apiClient } from '../api/client';
import { mockBabies } from '../data/mockData';

let localBabies: Baby[] = [...mockBabies];

export const babyService = {
  async getBabies(): Promise<Baby[]> {
    try {
      const res = await apiClient.get<Baby[]>('/babies');
      if (res.data && res.data.length > 0) {
        return res.data;
      }
      return [...localBabies];
    } catch {
      return [...localBabies];
    }
  },

  async getBabyById(id: string): Promise<Baby | undefined> {
    try {
      const res = await apiClient.get<Baby>(`/babies/${id}`);
      return res.data;
    } catch {
      return localBabies.find((b) => b.id === id);
    }
  },

  async createBaby(newBabyData: Omit<Baby, 'id'>): Promise<Baby> {
    try {
      const res = await apiClient.post<Baby>('/babies', newBabyData);
      return res.data;
    } catch {
      const created: Baby = {
        ...newBabyData,
        id: `baby-${Date.now()}`
      };
      localBabies.push(created);
      return created;
    }
  },

  async updateBaby(id: string, updates: Partial<Baby>): Promise<Baby> {
    try {
      const res = await apiClient.put<Baby>(`/babies/${id}`, updates);
      return res.data;
    } catch {
      const index = localBabies.findIndex((b) => b.id === id);
      if (index === -1) throw new Error('Baby record not found');
      localBabies[index] = { ...localBabies[index], ...updates };
      return localBabies[index];
    }
  },

  async deleteBaby(id: string): Promise<void> {
    try {
      await apiClient.delete(`/babies/${id}`);
    } catch {
      // offline fallback
    }
    localBabies = localBabies.filter((b) => b.id !== id);
  }
};
