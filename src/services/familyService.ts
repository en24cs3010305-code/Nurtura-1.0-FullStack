import { FamilyAccessMember } from '../types';
import { mockFamilyMembers } from '../data/mockData';
import { apiClient } from '../api/client';

let localMembers = [...mockFamilyMembers];

export const familyService = {
  async getMembers(): Promise<FamilyAccessMember[]> {
    try {
      const res = await apiClient.get<FamilyAccessMember[]>('/family');
      if (res.data && res.data.length > 0) return res.data;
    } catch {
      // offline fallback
    }
    return [...localMembers];
  },

  async inviteMember(data: Omit<FamilyAccessMember, 'id' | 'status' | 'invitedAt'>): Promise<FamilyAccessMember> {
    try {
      const res = await apiClient.post<FamilyAccessMember>('/family', data);
      if (res.data) return res.data;
    } catch {
      // offline fallback
    }

    const newMember: FamilyAccessMember = {
      ...data,
      id: `fam-${Date.now()}`,
      status: 'invited',
      invitedAt: new Date().toISOString().split('T')[0]
    };
    localMembers.push(newMember);
    return newMember;
  },

  async revokeAccess(id: string): Promise<void> {
    try {
      await apiClient.delete(`/family/${id}`);
    } catch {
      // offline fallback
    }
    localMembers = localMembers.filter((m) => m.id !== id);
  }
};
