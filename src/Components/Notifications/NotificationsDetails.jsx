const NotificationDetails = ({ notification }) => {
  switch (notification.type) {
    case "request":
      return (
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-l-blue-500">
            <h4 className="font-medium text-gray-900 mb-2">Item Request Details</h4>
            <p className="text-gray-700 mb-3">{notification.description}</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-600">Requested by:</span>
                <p className="text-gray-900">Sarah M.</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Item:</span>
                <p className="text-gray-900">Vintage Guitar</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Pickup time:</span>
                <p className="text-gray-900">Flexible</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Duration:</span>
                <p className="text-gray-900">2 weeks</p>
              </div>
            </div>
          </div>
        </div>
      );
    case "reminder":
      return (
        <div className="space-y-4">
          <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-l-orange-500">
            <h4 className="font-medium text-gray-900 mb-2">Pickup Details</h4>
            <p className="text-gray-700 mb-3">{notification.description}</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-600">From:</span>
                <p className="text-gray-900">Emma Thompson</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Address:</span>
                <p className="text-gray-900">123 Oak Street</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Items:</span>
                <p className="text-gray-900">Camping Tent, Sleeping Bag</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Contact:</span>
                <p className="text-gray-900">(555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>
      );
    default:
      return (
        <div className="p-4 rounded-lg">
          <p className="opacity-70">{notification.description}</p>
        </div>
      );
  }
};

export default NotificationDetails;
