import { CheckCircle, XCircle, Calendar } from "lucide-react";
import { doc, updateDoc, serverTimestamp, collection, addDoc } from "firebase/firestore";
import { db } from "../../Authentication/Firebase";

const NotificationAction = ({
  notification,
  onClose,
  onApprove,
  onDecline
}) => {
  const handleClose = () => {
    onClose();
  };


  if (notification.actionRequired && notification.type === "request") {
    return (
      <div className="flex justify-end gap-3 mt-6">
        <button 
          variant="outline" 
          onClick={() => {
            onDecline?.(notification.id);
            handleClose();
          }}
          className="flex gap-1 p-2 items-center justify-center rounded-lg bg-gray-200 hover:bg-red-50 border-red-200 text-red-600 hover:text-red-700 cursor-pointer"
        >
          <XCircle className="w-4 h-4 mr-2" />
          Decline
        </button>
        <button 
          onClick={() => {
            onApprove?.(notification.id);
            handleClose();
          }}
          className="flex items-center justify-center gap-1 rounded-lg p-2 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white cursor-pointer"
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          Approve Request
        </button>
      </div>
    );
  }

  if (notification.actionRequired && notification.type === "reminder") {
    return (
      <div className="flex justify-end gap-3 mt-6">
        <button 
          onClick={handleClose}
          className="flex gap-2 items-center justify-center p-2 rounded-lg bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white cursor-pointer"
        >
          <Calendar className="w-4 h-4 mr-2" />
          Schedule Pickup
        </button>
      </div>
    );
  }

  const handleApprove = async (notificationId, meta) => {
  try {
    // 1. Update the request document
    await updateDoc(doc(db, "requests", meta.requestId), {
      status: "approved",
      updatedAt: serverTimestamp()
    });

    // 2. Mark notification as read and approved
    await updateDoc(doc(db, "notifications", notificationId), {
      isRead: true,
      status: "handled",
      updatedAt: serverTimestamp()
    });

    // 3. Create a new notification for the requester
    await addDoc(collection(db, "notifications"), {
      userId: meta.requesterId,
      type: "approval",
      title: "Your request was approved!",
      description: `Your request for the item has been approved. Contact the giver to arrange pickup.`,
      isRead: false,
      createdAt: serverTimestamp(),
      actionRequired: false,
      relatedRequestId: meta.requestId
    });

    toast.success("Request approved. Requester has been notified.");
  } catch (err) {
    console.error("Failed to approve request:", err);
    toast.error("Something went wrong. Try again.");
  }
};

const handleDecline = async (notificationId, meta) => {
  try {
    // 1. Update the request document
    await updateDoc(doc(db, "requests", meta.requestId), {
      status: "declined",
      updatedAt: serverTimestamp()
    });

    // 2. Mark notification as read and declined
    await updateDoc(doc(db, "notifications", notificationId), {
      isRead: true,
      status: "handled",
      updatedAt: serverTimestamp()
    });

    // 3. Create a new notification for the requester
    await addDoc(collection(db, "notifications"), {
      userId: meta.requesterId,
      type: "request",
      title: "Your request was declined",
      description: `Sorry, your request for the item was declined.`,
      isRead: false,
      createdAt: serverTimestamp(),
      actionRequired: false,
      relatedRequestId: meta.requestId
    });

    toast.info("Request declined. Requester has been notified.");
  } catch (err) {
    console.error("Failed to decline request:", err);
    toast.error("Something went wrong. Try again.");
  }
};


  return (
    <div className="flex justify-end gap-3 mt-6">
      <button 
        onClick={handleClose}
        className="bg-indigo-500 text-white rounded-lg p-2 cursor-pointer"
      >
        Close
      </button>
    </div>
  );
};

export default NotificationAction;