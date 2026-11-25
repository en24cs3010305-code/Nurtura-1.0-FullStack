import React, { useState, useEffect } from 'react';
import { Bell, CheckCheck, Clock, ExternalLink } from 'lucide-react';
import { NotificationItem } from '../../types';
import { notificationService } from '../../services/notificationService';
import { Link } from 'react-router-dom';

export const NotificationBell: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const loadNotifications = async () => {
    const list = await notificationService.getNotifications();
    setNotifications(list);
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = async (id: string) => {
    await notificationService.markAsRead(id);
    await loadNotifications();
  };

  const handleMarkAllRead = async () => {
    await notificationService.markAllAsRead();
    await loadNotifications();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open notifications"
        className="relative p-2 rounded-xl text-nurturaText-secondary hover:text-nurturaText-primary hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
      >
        <Bell className="w-5 h-5 text-nurturaText-primary dark:text-cream-100" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-white dark:ring-darkBg-card animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-darkBg-card shadow-lifted border border-sage-100 dark:border-darkBg-border py-3 z-50 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-4 pb-2 border-b border-stone-100 dark:border-darkBg-border">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-heading font-bold text-nurturaText-primary dark:text-cream-100">
                  Notifications
                </h4>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-sage-100 dark:bg-sage-900/60 text-sage-700 dark:text-sage-300 text-[10px] font-semibold">
                    {unreadCount} new
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  className="text-[11px] text-sage-600 dark:text-sage-400 hover:underline flex items-center gap-1 font-medium"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  Mark all read
                </button>
              )}
            </div>

            <div className="max-h-80 overflow-y-auto divide-y divide-stone-100 dark:divide-darkBg-border">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-xs text-stone-400">
                  No notifications yet
                </div>
              ) : (
                notifications.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleMarkAsRead(item.id)}
                    className={`p-3.5 hover:bg-sage-50/50 dark:hover:bg-darkBg-surface transition-colors cursor-pointer flex gap-3 ${
                      !item.read ? 'bg-sage-50/30 dark:bg-sage-950/20' : ''
                    }`}
                  >
                    <div className="w-2 h-2 rounded-full mt-1.5 shrink-0 bg-sage-500" style={{ opacity: item.read ? 0 : 1 }} />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className={`text-xs ${!item.read ? 'font-semibold text-nurturaText-primary dark:text-cream-100' : 'font-medium text-stone-600 dark:text-stone-300'}`}>
                          {item.title}
                        </p>
                        <span className="text-[10px] text-stone-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {item.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-nurturaText-secondary dark:text-stone-300 leading-relaxed">
                        {item.message}
                      </p>
                      {item.link && (
                        <Link
                          to={item.link}
                          onClick={() => setIsOpen(false)}
                          className="inline-flex items-center gap-1 text-[11px] font-medium text-sage-600 dark:text-sage-400 hover:underline pt-0.5"
                        >
                          View detail <ExternalLink className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="px-4 pt-2.5 border-t border-stone-100 dark:border-darkBg-border text-center">
              <Link
                to="/parent/notifications"
                onClick={() => setIsOpen(false)}
                className="text-xs font-semibold text-sage-600 dark:text-sage-400 hover:underline"
              >
                View all notification preferences
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
