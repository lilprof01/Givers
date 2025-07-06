import {
  Bell,
  Check,
  Clock,
  Gift,
  MessageSquare,
  User,
  Calendar,
  Star,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import NotificationsPopup from "../../../Components/Notifications/NotificationsPopup";
import { toast, ToastContainer } from "react-toastify";

const mockNotifications = [
  {
    id: "1",
    type: "request",
    title: "New Item Request",
    description:
      "Sarah M. requested your vintage guitar. Tap to view details and respond.",
    time: "2 minutes ago",
    isRead: false,
    actionRequired: true,
  },
  {
    id: "2",
    type: "approval",
    title: "Request Approved!",
    description:
      "Your request for the camping tent has been approved. You can now arrange pickup.",
    time: "1 hour ago",
    isRead: false,
  },
  {
    id: "4",
    type: "reminder",
    title: "Pickup Reminder",
    description:
      "Don't forget to pick up your requested items from Emma's place today.",
    time: "5 hours ago",
    isRead: false,
    actionRequired: true,
  },
  {
    id: "5",
    type: "achievement",
    title: "Achievement Unlocked!",
    description:
      "You've successfully shared 10 items! You're now a 'Generous Giver'.",
    time: "1 day ago",
    isRead: true,
  },
  {
    id: "6",
    type: "request",
    title: "Item Request Declined",
    description: "Unfortunately, your request for the bicycle was declined.",
    time: "2 days ago",
    isRead: true,
  },
  {
    id: "7",
    type: "approval",
    title: "New Item Listed",
    description:
      "Your vintage camera is now live on Givers! Members can start requesting it.",
    time: "3 days ago",
    isRead: true,
  },
];

export const Notifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleApproveRequest = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    toast.success(
      "Request approved, the requester will be notified."
    );
  };

  const handleDeclineRequest = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    toast.error(
      "Request declined, the requester will be notified."
    );
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "request":
        return <Gift className="w-5 h-5 text-blue-500" />;
      case "approval":
        return <Check className="w-5 h-5 text-green-500" />;
      case "message":
        return <MessageSquare className="w-5 h-5 text-purple-500" />;
      case "reminder":
        return <Clock className="w-5 h-5 text-orange-500" />;
      case "achievement":
        return <Star className="w-5 h-5 text-yellow-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const openNotificationDialog = (notification) => {
    setSelectedNotification(notification);
    setIsDialogOpen(true);
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, isRead: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="p-6 space-y-6 mt-20 sm:mt-0 overflow-y-scroll text-gray-900 dark:text-gray-200">
      <ToastContainer position="top-center" autoClose={3000} />
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="opacity-70 mt-1">
            {unreadCount > 0
              ? `You have ${unreadCount} unread notifications`
              : "You're all caught up!"}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            variant="outline"
            onClick={markAllAsRead}
            className="p-2 bg-gray-50 hover:scale-105 dark:bg-black/60 rounded-lg transition-all duration-300 cursor-pointer"
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="p-12 text-center bg-white/80 backdrop-blur-sm">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No notifications</h3>
            <p className="opacity-70">
              You'll see notifications here when something happens.
            </p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md dark:bg-black/30 border dark:border-gray-800 rounded-lg ${
                !notification.isRead
                  ? "border-l-4 border-l-blue-500 bg-blue-50/30"
                  : "border-gray-200 dark:border-gray-800 hover:border-gray-300"
              }`}
              onClick={() => openNotificationDialog(notification)}
            >
              <div className="p-0">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3
                          className={`font-medium ${
                            !notification.isRead ? "" : "opacity-80"
                          }`}
                        >
                          {notification.title}
                        </h3>
                        <p className="text-sm opacity-60 mt-1 line-clamp-2">
                          {notification.description}
                        </p>
                        <div className="flex items-center gap-4 mt-3">
                          <span className="text-xs text-gray-500">
                            {notification.time}
                          </span>
                          {notification.actionRequired && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                              Action Required
                            </span>
                          )}
                          {!notification.isRead && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notification.id);
                        }}
                        className="text-gray-400 hover:text-red-500 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Quick Actions */}
      {notifications.some((n) => n.actionRequired && !n.isRead) && (
        <div className="p-6 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200 dark:from-blue-900 dark:to-green-900 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold">Action Required</h3>
          </div>
          <p className="opacity-80 mb-4">
            You have{" "}
            {notifications.filter((n) => n.actionRequired && !n.isRead).length}{" "}
            notifications that need your attention.
          </p>
          <div className="flex gap-3">
            <button className="p-2 rounded-lg cursor-pointer bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white">
              Review Requests
            </button>
          </div>
        </div>
      )}

      <NotificationsPopup
        notification={selectedNotification}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onMarkAsRead={markAsRead}
        onApprove={handleApproveRequest}
        onDecline={handleDeclineRequest}
      />
    </div>
  );
};

export default Notifications;
