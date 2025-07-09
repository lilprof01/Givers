// src/pages/Notifications/Notifications.jsx
import {
  Bell, Check, Clock, Gift, MessageSquare, Star, Trash2
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { auth, db } from "../../../Authentication/Firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  deleteDoc,
  addDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import NotificationsPopup from "../../../Components/Notifications/NotificationsPopup";

const getIcon = (type) => {
  const map = {
    request:   <Gift className="w-5 h-5 text-blue-500" />,
    approval:  <Check className="w-5 h-5 text-green-500" />,
    message:   <MessageSquare className="w-5 h-5 text-purple-500" />,
    reminder:  <Clock className="w-5 h-5 text-orange-500" />,
    achievement: <Star className="w-5 h-5 text-yellow-500" />,
  };
  return map[type] || <Bell className="w-5 h-5 text-gray-500" />;
};

export const Notifications = () => {
  const [notifications, setNotifications]   = useState([]);
  const [selected, setSelected]             = useState(null);
  const [selectedNotification, setSelectedNotification]             = useState(null);
  const [openDialog, setOpenDialog]         = useState(false);
  

  /* ──────────────────────────────────────────────────────────
     1.  Real‑time listener
     ────────────────────────────────────────────────────────── */
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, "notifications"),
      where("userId", "==", user.uid)
    );

    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setNotifications(list);
    });

    return () => unsub();
  }, []);

  /* ──────────────────────────────────────────────────────────
     2.  Helpers that write back to Firestore
     ────────────────────────────────────────────────────────── */
  const markAsRead = async (id) => {
    await updateDoc(doc(db, "notifications", id), { isRead: true });
  };

  const markAllAsRead = async () => {
    const unread = notifications.filter((n) => !n.isRead);
    await Promise.all(
      unread.map((n) => updateDoc(doc(db, "notifications", n.id), { isRead: true }))
    );
  };

  const deleteNotification = async (id) => {
    await deleteDoc(doc(db, "notifications", id));
  };

  const handleApproveRequest = async (notif) => {
    // remove this notification
    await deleteNotification(notif.id);

    // send reply notification to requester
    await addDoc(collection(db, "notifications"), {
      userId: notif.requesterId,             // must be stored on the original notif
      type: "approval",
      title: "Request Approved",
      description: `Your request for ${notif.itemTitle} was approved!`,
      time: serverTimestamp(),
      isRead: false,
      actionRequired: false,
    });
    toast.success("Request approved, the requester has been notified.");
  };

  const handleDeclineRequest = async (notif) => {
    await deleteNotification(notif.id);

    await addDoc(collection(db, "notifications"), {
      userId: notif.requesterId,
      type: "decline",
      title: "Request Declined",
      description: `Unfortunately, your request for ${notif.itemTitle} was declined.`,
      time: serverTimestamp(),
      isRead: false,
      actionRequired: false,
    });
    toast.error("Request declined, the requester has been notified.");
  };

  /* ────────────────────────────────────────────────────────── */
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const openNotificationDialog = (n) => {
    setSelected(n);
    setOpenDialog(true);
  };

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
            onClick={markAllAsRead}
            className="p-2 bg-gray-50 hover:scale-105 dark:bg-black/60 rounded-lg transition-all duration-300 cursor-pointer"
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* List */}
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
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => openNotificationDialog(n)}
              className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md dark:bg-black/30 border rounded-lg ${
                !n.isRead
                  ? "border-l-4 border-l-blue-500 bg-blue-50/30"
                  : "border-gray-200 dark:border-gray-800 hover:border-gray-300"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">{getIcon(n.type)}</div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className={`font-medium ${n.isRead ? "opacity-80" : ""}`}>
                        {n.title}
                      </h3>
                      <p className="text-sm opacity-60 mt-1 line-clamp-2">
                        {n.description}
                      </p>
                      <div className="flex items-center gap-4 mt-3">
                        <span className="text-xs text-gray-500">
                          {/* format your timestamp however you like */}
                          {new Date(n.time?.seconds * 1000).toLocaleString()}
                        </span>
                        {n.actionRequired && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                            Action Required
                          </span>
                        )}
                        {!n.isRead && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full" />
                        )}
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(n.id);
                      }}
                      className="text-gray-400 hover:text-red-500 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Quick Action banner */}
      {notifications.some((n) => n.actionRequired && !n.isRead) && (
        <div className="p-6 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900 dark:to-green-900 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold">Action Required</h3>
          </div>
          <p className="opacity-80 mb-4">
            You have{" "}
            {notifications.filter((n) => n.actionRequired && !n.isRead).length}{" "}
            notifications that need your attention.
          </p>
          <button className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-green-500 text-white">
            Review Requests
          </button>
        </div>
      )}

      {/* Dialog */}
      <NotificationsPopup
        notification={selected}
        isOpen={openDialog}
        onClose={() => setOpenDialog(false)}
        onMarkAsRead={markAsRead}
        onApprove={() =>
    handleApproveRequest(selectedNotification.id, selectedNotification.meta)
  }
  onDecline={() =>
    handleDeclineRequest(selectedNotification.id, selectedNotification.meta)
  }
      />
    </div>
  );
};

export default Notifications;
