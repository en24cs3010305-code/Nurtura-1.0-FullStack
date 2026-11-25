import { Appointment } from '../types';
import { mockAppointments } from '../data/mockData';
import { apiClient } from '../api/client';

let localAppointments = [...mockAppointments];

export const appointmentService = {
  async getAppointments(): Promise<Appointment[]> {
    try {
      const res = await apiClient.get<Appointment[]>('/appointments');
      if (res.data && res.data.length > 0) return res.data;
    } catch {
      // offline fallback
    }
    return [...localAppointments];
  },

  async getAppointmentsForBaby(babyId: string): Promise<Appointment[]> {
    try {
      const res = await apiClient.get<Appointment[]>('/appointments', { babyId });
      if (res.data && res.data.length > 0) return res.data;
    } catch {
      // offline fallback
    }
    return localAppointments.filter((a) => a.babyId === babyId);
  },

  async getAppointmentsForDoctor(doctorId: string): Promise<Appointment[]> {
    try {
      const res = await apiClient.get<Appointment[]>('/appointments', { doctorId });
      if (res.data && res.data.length > 0) return res.data;
    } catch {
      // offline fallback
    }
    return localAppointments.filter((a) => a.doctorId === doctorId);
  },

  async bookAppointment(data: Omit<Appointment, 'id'>): Promise<Appointment> {
    try {
      const res = await apiClient.post<Appointment>('/appointments', data);
      if (res.data) return res.data;
    } catch {
      // offline fallback
    }

    const newApt: Appointment = {
      ...data,
      id: `apt-${Date.now()}`
    };
    localAppointments.push(newApt);
    return newApt;
  },

  async updateAppointmentStatus(id: string, status: Appointment['status']): Promise<Appointment> {
    try {
      const res = await apiClient.patch<Appointment>(`/appointments/${id}`, { status });
      if (res.data) return res.data;
    } catch {
      // offline fallback
    }

    const idx = localAppointments.findIndex((a) => a.id === id);
    if (idx === -1) throw new Error('Appointment not found');
    localAppointments[idx].status = status;
    return localAppointments[idx];
  }
};
