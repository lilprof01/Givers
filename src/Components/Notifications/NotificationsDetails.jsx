const NotificationDetails = ({ notification }) => {

  const { type, description, meta = {} } = notification;

  if (type === "request") {
    return (
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-l-blue-500">
          <h4 className="font-medium mb-2 text-black">Item Request Details</h4>
          <p className="text-gray-700 mb-3">{description}</p>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <Detail label="Requested by" value={meta.requesterName} />
            <Detail label="Item"         value={meta.itemName} />
            <Detail label="Pickup time"  value={meta.pickupTime} />
            <Detail label="Duration"     value={meta.duration} />
          </div>
        </div>
      </div>
    );
  }

  if (type === "reminder") {
    return (
      <div className="space-y-4">
        <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-l-orange-500">
          <h4 className="font-medium mb-2">Pickup Details</h4>
          <p className="text-gray-700 mb-3">{description}</p>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <Detail label="From"     value={meta.from} />
            <Detail label="Address"  value={meta.address} />
            <Detail label="Items"    value={meta.items} />
            <Detail label="Contact"  value={meta.contact} />
          </div>
        </div>
      </div>
    );
  }

  /* fallback */
  return (
    <div className="p-4">
      <p className="opacity-70">{description}</p>
    </div>
  );
};

/* tiny helper so we don’t repeat label/value markup */
const Detail = ({ label, value }) => (
  <div>
    <span className="font-medium text-gray-600">{label}:</span>
    <p className="text-gray-900">{value || "—"}</p>
  </div>
);

export default NotificationDetails;
