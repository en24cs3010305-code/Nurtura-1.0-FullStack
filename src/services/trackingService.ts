import {
  FeedingLog,
  SleepLog,
  DiaperLog,
  GrowthRecord
} from '../types';
import { apiClient } from '../api/client';
import {
  mockFeedingLogs,
  mockSleepLogs,
  mockDiaperLogs,
  mockGrowthRecords,
  whoGrowthStandardsBoys
} from '../data/mockData';

let localFeedings = [...mockFeedingLogs];
let localSleeps = [...mockSleepLogs];
let localDiapers = [...mockDiaperLogs];
let localGrowth = [...mockGrowthRecords];

export const trackingService = {
  // Feeding
  async getFeedingLogs(babyId: string): Promise<FeedingLog[]> {
    try {
      const res = await apiClient.get<FeedingLog[]>('/tracking/feeding', { babyId });
      if (res.data) return res.data;
      return localFeedings.filter((f) => f.babyId === babyId);
    } catch {
      return localFeedings.filter((f) => f.babyId === babyId);
    }
  },

  async addFeedingLog(log: Omit<FeedingLog, 'id'>): Promise<FeedingLog> {
    try {
      const res = await apiClient.post<FeedingLog>('/tracking/feeding', log);
      return res.data;
    } catch {
      const newLog: FeedingLog = { ...log, id: `feed-${Date.now()}` };
      localFeedings.unshift(newLog);
      return newLog;
    }
  },

  // Sleep
  async getSleepLogs(babyId: string): Promise<SleepLog[]> {
    try {
      const res = await apiClient.get<SleepLog[]>('/tracking/sleep', { babyId });
      if (res.data) return res.data;
      return localSleeps.filter((s) => s.babyId === babyId);
    } catch {
      return localSleeps.filter((s) => s.babyId === babyId);
    }
  },

  async addSleepLog(log: Omit<SleepLog, 'id'>): Promise<SleepLog> {
    try {
      const res = await apiClient.post<SleepLog>('/tracking/sleep', log);
      return res.data;
    } catch {
      const newLog: SleepLog = { ...log, id: `sleep-${Date.now()}` };
      localSleeps.unshift(newLog);
      return newLog;
    }
  },

  // Diaper
  async getDiaperLogs(babyId: string): Promise<DiaperLog[]> {
    try {
      const res = await apiClient.get<DiaperLog[]>('/tracking/diaper', { babyId });
      if (res.data) return res.data;
      return localDiapers.filter((d) => d.babyId === babyId);
    } catch {
      return localDiapers.filter((d) => d.babyId === babyId);
    }
  },

  async addDiaperLog(log: Omit<DiaperLog, 'id'>): Promise<DiaperLog> {
    try {
      const res = await apiClient.post<DiaperLog>('/tracking/diaper', log);
      return res.data;
    } catch {
      const newLog: DiaperLog = { ...log, id: `diaper-${Date.now()}` };
      localDiapers.unshift(newLog);
      return newLog;
    }
  },

  // Growth
  async getGrowthRecords(babyId: string): Promise<GrowthRecord[]> {
    try {
      const res = await apiClient.get<GrowthRecord[]>('/tracking/growth', { babyId });
      if (res.data) return res.data.sort((a, b) => a.ageInMonths - b.ageInMonths);
      return localGrowth
        .filter((g) => g.babyId === babyId)
        .sort((a, b) => a.ageInMonths - b.ageInMonths);
    } catch {
      return localGrowth
        .filter((g) => g.babyId === babyId)
        .sort((a, b) => a.ageInMonths - b.ageInMonths);
    }
  },

  async addGrowthRecord(record: Omit<GrowthRecord, 'id'>): Promise<GrowthRecord> {
    try {
      const res = await apiClient.post<GrowthRecord>('/tracking/growth', record);
      return res.data;
    } catch {
      const newRec: GrowthRecord = { ...record, id: `growth-${Date.now()}` };
      localGrowth.push(newRec);
      return newRec;
    }
  },

  // WHO reference curves
  async getWhoReferenceStandards(): Promise<any[]> {
    try {
      const res = await apiClient.get<any[]>('/tracking/who-standards');
      if (res.data && Array.isArray(res.data)) return res.data;
      return whoGrowthStandardsBoys;
    } catch {
      return whoGrowthStandardsBoys;
    }
  }
};
