'use client';

import { useState, useEffect } from 'react';
import { Bell, Check, CheckCheck, Clock, Filter, ArrowLeft } from 'lucide-react';
import styles from './NotificationsPage.module.css';
import { useRouter } from 'next/navigation';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
  projectTitle: string;
  projectCode: string;
  triggeredByName: string | null;
}

export default function NotificationsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  useEffect(() => {
    fetchNotifications();
  }, [filter]);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const url = filter === 'unread' 
        ? '/api/notifications?unreadOnly=true&limit=100'
        : '/api/notifications?limit=100';
      
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setNotifications(data);
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationIds: string[]) => {
    try {
      const res = await fetch('/api/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notificationIds })
      });
      
      if (res.ok) {
        setNotifications(prev => 
          prev.map(notif => 
            notificationIds.includes(notif.id) 
              ? { ...notif, isRead: true }
              : notif
          )
        );
      }
    } catch (error) {
      console.error('Failed to mark notifications as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const res = await fetch('/api/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markAllAsRead: true })
      });
      
      if (res.ok) {
        setNotifications(prev => 
          prev.map(notif => ({ ...notif, isRead: true }))
        );
      }
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.isRead) {
      markAsRead([notification.id]);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'FINANCIAL_CHANGE':
        return '💰';
      case 'MILESTONE_UPDATE':
        return '🎯';
      case 'MEMBER_ADDED':
      case 'MEMBER_REMOVED':
        return '👥';
      case 'CHANGE_LOG_CREATED':
        return '📋';
      default:
        return '📝';
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <button 
            className={styles.backButton}
            onClick={() => router.back()}
          >
            <ArrowLeft size={20} />
            Back
          </button>
          
          <div className={styles.headerActions}>
            {unreadCount > 0 && (
              <button 
                className={styles.markAllButton}
                onClick={markAllAsRead}
              >
                <CheckCheck size={16} />
                Mark all as read
              </button>
            )}
          </div>
        </div>

        <div className={styles.headerContent}>
          <h1>
            <Bell size={24} />
            Notifications
            {unreadCount > 0 && (
              <span className={styles.unreadBadge}>
                {unreadCount}
              </span>
            )}
          </h1>
          
          <div className={styles.filters}>
            <button
              className={`${styles.filterButton} ${filter === 'all' ? styles.active : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={`${styles.filterButton} ${filter === 'unread' ? styles.active : ''}`}
              onClick={() => setFilter('unread')}
            >
              Unread
            </button>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        {loading ? (
          <div className={styles.loading}>
            <div className={styles.loadingSpinner}></div>
            <p>Loading notifications...</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className={styles.empty}>
            <Bell size={48} />
            <h3>No notifications</h3>
            <p>
              {filter === 'unread' 
                ? "You're all caught up! No unread notifications."
                : "You don't have any notifications yet."
              }
            </p>
          </div>
        ) : (
          <div className={styles.notificationList}>
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`${styles.notificationCard} ${
                  !notification.isRead ? styles.unread : ''
                }`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className={styles.notificationHeader}>
                  <div className={styles.notificationTitle}>
                    <span className={styles.typeIcon}>
                      {getTypeIcon(notification.type)}
                    </span>
                    <h3>{notification.title}</h3>
                    {!notification.isRead && (
                      <span className={styles.unreadDot}></span>
                    )}
                  </div>
                  <span className={styles.timestamp}>
                    {formatDateTime(notification.createdAt)}
                  </span>
                </div>

                <p className={styles.message}>{notification.message}</p>

                <div className={styles.notificationFooter}>
                  <div className={styles.projectInfo}>
                    <strong>{notification.projectCode}</strong> - {notification.projectTitle}
                  </div>
                  {notification.triggeredByName && (
                    <div className={styles.triggeredBy}>
                      Changed by {notification.triggeredByName}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
