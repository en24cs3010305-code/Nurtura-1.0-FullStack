import { Vaccination, VaccineStatus } from '../types';
import { mockVaccinations } from '../data/mockData';
import { apiClient } from '../api/client';

let localVaccinations = [...mockVaccinations];

export const vaccinationService = {
  async getVaccinations(babyId: string): Promise<Vaccination[]> {
    try {
      const res = await apiClient.get<Vaccination[]>('/vaccinations', { babyId });
      if (res.data && res.data.length > 0) {
        return res.data;
      }
    } catch {
      // offline fallback
    }
    return localVaccinations.filter((v) => v.babyId === babyId);
  },

  async updateVaccinationStatus(
    id: string,
    status: VaccineStatus,
    administeredDate?: string,
    batchNumber?: string
  ): Promise<Vaccination> {
    const payload = {
      status,
      administeredDate: administeredDate || new Date().toISOString().split('T')[0],
      ...(batchNumber ? { batchNumber } : {})
    };

    try {
      const res = await apiClient.patch<Vaccination>(`/vaccinations/${id}`, payload);
      if (res.data) return res.data;
    } catch {
      // offline fallback
    }

    const idx = localVaccinations.findIndex((v) => v.id === id);
    if (idx === -1) throw new Error('Vaccination not found');
    localVaccinations[idx] = {
      ...localVaccinations[idx],
      ...payload
    };
    return localVaccinations[idx];
  },

  async addCustomVaccination(data: Omit<Vaccination, 'id'>): Promise<Vaccination> {
    try {
      const res = await apiClient.post<Vaccination>('/vaccinations', data);
      if (res.data) return res.data;
    } catch {
      // offline fallback
    }

    const newVac: Vaccination = {
      ...data,
      id: `vac-${Date.now()}`
    };
    localVaccinations.push(newVac);
    return newVac;
  }
};
