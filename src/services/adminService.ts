import { AdminStats, AuditLog, SupportRequest, User, DoctorVerificationStatus } from '../types';
import { mockAdminStats, mockAuditLogs, mockSupportRequests, mockUsers } from '../data/mockData';
import { apiClient } from '../api/client';

let localStats: AdminStats = { ...mockAdminStats };
let localLogs: AuditLog[] = [...mockAuditLogs];
let localUsers: User[] = [...mockUsers];
let localSupport: SupportRequest[] = [...mockSupportRequests];

export const adminService = {
  async getDashboardMetrics(): Promise<AdminStats> {
    try {
      const res = await apiClient.get<AdminStats>('/admin/stats');
      if (res.data) return res.data;
    } catch {
      // offline fallback
    }
    return { ...localStats };
  },

  async getAllUsers(): Promise<User[]> {
    try {
      const res = await apiClient.get<User[]>('/admin/users');
      if (res.data && res.data.length > 0) return res.data;
    } catch {
      // offline fallback
    }
    return [...localUsers];
  },

  async updateDoctorStatus(userId: string, status: DoctorVerificationStatus): Promise<User> {
    try {
      const res = await apiClient.patch<User>(`/admin/verifications/${userId}`, { status });
      if (res.data) {
        const uIdx = localUsers.findIndex(u => u.id === userId);
        if (uIdx !== -1) localUsers[uIdx] = res.data;
        return res.data;
      }
    } catch {
      // offline fallback
    }

    const user = localUsers.find((u) => u.id === userId);
    if (!user || !user.doctorDetails) {
      throw new Error('Doctor not found');
    }
    user.doctorDetails.verificationStatus = status;

    if (status === 'approved') {
      localStats.verifiedDoctors += 1;
      localStats.pendingDoctors = Math.max(0, localStats.pendingDoctors - 1);
    } else if (status === 'rejected') {
      localStats.pendingDoctors = Math.max(0, localStats.pendingDoctors - 1);
    }

    localLogs.unshift({
      id: `log-${Date.now()}`,
      userId: 'user-admin-1',
      userName: 'Admin Coordinator',
      role: 'admin',
      action: `DOCTOR_VERIFICATION_${status.toUpperCase()}`,
      target: `${user.name} (${user.doctorDetails.registrationNumber})`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      ipAddress: '192.168.1.45'
    });

    return { ...user };
  },

  async getAuditLogs(): Promise<AuditLog[]> {
    try {
      const res = await apiClient.get<AuditLog[]>('/admin/audit-logs');
      if (res.data && res.data.length > 0) return res.data;
    } catch {
      // offline fallback
    }
    return [...localLogs];
  },

  async getSupportRequests(): Promise<SupportRequest[]> {
    return [...localSupport];
  }
};
