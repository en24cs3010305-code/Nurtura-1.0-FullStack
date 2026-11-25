import { Milestone, MilestoneStatus } from '../types';
import { mockMilestones } from '../data/mockData';
import { apiClient } from '../api/client';

let localMilestones = [...mockMilestones];

export const milestoneService = {
  async getMilestones(babyId: string): Promise<Milestone[]> {
    try {
      const res = await apiClient.get<Milestone[]>('/milestones', { babyId });
      if (res.data && res.data.length > 0) {
        return res.data;
      }
    } catch {
      // offline fallback
    }
    return localMilestones.filter((m) => m.babyId === babyId);
  },

  async updateMilestoneStatus(id: string, status: MilestoneStatus, achievedDate?: string): Promise<Milestone> {
    const payload = {
      status,
      achievedDate: status === 'achieved' ? (achievedDate || new Date().toISOString().split('T')[0]) : undefined
    };

    try {
      const res = await apiClient.patch<Milestone>(`/milestones/${id}`, payload);
      if (res.data) return res.data;
    } catch {
      // offline fallback
    }

    const idx = localMilestones.findIndex((m) => m.id === id);
    if (idx === -1) throw new Error('Milestone not found');
    localMilestones[idx] = {
      ...localMilestones[idx],
      ...payload
    };
    return localMilestones[idx];
  }
};
