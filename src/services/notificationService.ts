import { NotificationItem } from '../types';
import { mockNotifications } from '../data/mockData';
import { apiClient } from '../api/client';

let localNotifs = [...mockNotifications];

export const notificationService = {
  async getNotifications(): Promise<NotificationItem[]> {
    try {
      const res = await apiClient.get<NotificationItem[]>('/notifications');
      if (res.data && res.data.length > 0) return res.data;
    } catch {
      // offline fallback
    }
    return [...localNotifs];
  },

  async markAsRead(id: string): Promise<void> {
    try {
      await apiClient.patch(`/notifications/${id}/read`);
    } catch {
      // offline fallback
    }
    const item = localNotifs.find((n) => n.id === id);
    if (item) {
      item.read = true;
    }
  },

  async markAllAsRead(): Promise<void> {
    try {
      await apiClient.post('/notifications/mark-all-read');
    } catch {
      // offline fallback
    }
    localNotifs.forEach((n) => {
      n.read = true;
    });
  }
};
