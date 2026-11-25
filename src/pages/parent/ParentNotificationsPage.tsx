import React, { useState, useEffect } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { PageHeader } from '../../components/common/PageHeader';
import { notificationService } from '../../services/notificationService';
import { NotificationItem } from '../../types';
import { Bell, CheckCheck, Clock, ExternalLink, ShieldAlert, Sparkles, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ParentNotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [filter, setFilter] = useState<string>('all');

  const loadNotifications = async () => {
    const list = await notificationService.getNotifications();
    setNotifications(list);
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleMarkAsRead = async (id: string) => {
    await notificationService.markAsRead(id);
    loadNotifications();
  };

  const handleMarkAllRead = async () => {
    await notificationService.markAllAsRead();
    loadNotifications();
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filtered = filter === 'all'
    ? notifications
    : filter === 'unread'
    ? notifications.filter((n) => !n.read)
    : notifications.filter((n) => n.type === filter);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Notifications Center"
        subtitle="Vaccination reminders, appointment confirmations, and routine baby health observations"
        actions={
          unreadCount > 0 && (
            <Button size="sm" variant="outline" onClick={handleMarkAllRead} leftIcon={<CheckCheck className="w-4 h-4" />}>
              Mark All Read
            </Button>
          )
        }
      />

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {['all', 'unread', 'vaccination', 'appointment', 'medication', 'health_alert'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-all ${
              filter === f
                ? 'bg-sage-600 text-white shadow-soft'
                : 'bg-white dark:bg-darkBg-card border border-stone-200 text-stone-600 hover:bg-stone-50'
            }`}
          >
            {f.replace('_', ' ')}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((item) => (
          <Card
            key={item.id}
            onClick={() => handleMarkAsRead(item.id)}
            className={`p-4 transition-all cursor-pointer flex items-start gap-4 ${
              !item.read ? 'border-sage-300 bg-sage-50/40 dark:bg-darkBg-surface' : ''
            }`}
          >
            <div className={`w-2.5 h-2.5 rounded-full mt-2 shrink-0 ${!item.read ? 'bg-sage-600' : 'bg-transparent'}`} />

            <div className="flex-1 space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                <span className={`font-bold ${!item.read ? 'text-nurturaText-primary dark:text-cream-100' : 'text-stone-600'}`}>
                  {item.title}
                </span>
                <span className="text-[11px] text-stone-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {item.timestamp}
                </span>
              </div>
              <p className="text-xs text-nurturaText-secondary leading-relaxed">
                {item.message}
              </p>
              {item.link && (
                <Link to={item.link} className="inline-flex items-center gap-1 text-[11px] text-sage-600 font-semibold hover:underline pt-1">
                  View Detail <ExternalLink className="w-3 h-3" />
                </Link>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
