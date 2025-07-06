import { NotificationIcon } from "./NotificationIcon";
import NotificationAction from "./NotificationsAction";
import NotificationDetails from "./NotificationsDetails";


const NotificationsPopup = ({
  notification,
  isOpen,
  onClose,
  onMarkAsRead,
  onApprove,
  onDecline
}) => {
  if (!notification) return null;

  const handleClose = () => {
    if (!notification.isRead) {
      onMarkAsRead(notification.id);
    }
    onClose();
  };

  return (
    <div className={`${isOpen ? 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' : 'hidden'}`}>
      <div className="max-w-2xl bg-gray-200/35 dark:bg-black/30 backdrop-blur-sm p-5 rounded-lg">
        <div>
          <div className="flex items-center gap-3 text-xl">
            <NotificationIcon type={notification.type} />
            {notification.title}
            {!notification.isRead && (
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            )}
          </div>
          <div className="text-gray-500">
            {notification.time}
            {notification.actionRequired && (
              <span className="ml-3 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                Action Required
              </span>
            )}
          </div>
        </div>

        <div className="mt-4">
          <NotificationDetails notification={notification} />
        </div>

        <NotificationAction
          notification={notification}
          onClose={handleClose}
          onApprove={onApprove}
          onDecline={onDecline}
        />
      </div>
    </div>
  );
};

export default NotificationsPopup;