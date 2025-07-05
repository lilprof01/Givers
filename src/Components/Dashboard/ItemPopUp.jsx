import { Calendar, Check, Heart, MapPin, Package } from "lucide-react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const ItemPopUp = ({ item, isOpen, onClose }) => {
  if (!item) return null;
  const [request, setRequest] = useState(false);

  return (
    <div
      className={`${
        isOpen
          ? "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000000]"
          : "hidden"
      } bg-gray-200 shadow-2xl dark:bg-black p-5 rounded-xl text-gray-900 dark:text-gray-200`}
    >
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="sm:max-w-md w-[85vw]">
        <div>
          <div className="text-center mb-4">
            <div className="text-6xl mb-4">
              {item.image.startsWith("http") ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-28 h-28 object-cover rounded mx-auto mb-3"
                />
              ) : (
                <div className="text-7xl mb-3">{item.image}</div>
              )}
            </div>
            <div className="text-xl font-bold">{item.title}</div>
          </div>
        </div>

        {request ? (
          <div>
            <p>Reason for requesting:</p>
            <textarea
              placeholder="let the giver know your reason for requesting"
              rows={3}
              className="resize-none border p-2 rounded-lg w-full"
            />
          </div>
        ) : (
          <div className="space-y-4">
            {/* Full Description */}
            <div className="rounded-lg p-4">
              <h4 className="font-semibold mb-2">Description</h4>
              <p className="text-sm">{item.fullDescription}</p>
            </div>

            {/* Item Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3 flex flex-col">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{item.location}</span>
                </div>
                <span className="text-green-700 text-sm font-medium flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  Condition: {item.condition}
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{item.datePosted}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Package className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{item.category}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3 mt-5">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-600 dark:border-gray-300 dark:hover:bg-gray-300 hover:bg-gray-600 hover:text-white dark:hover:text-red-600 rounded-lg cursor-pointer transition-all duration-150"
          >
            Close
          </button>
          {request ? (
            <button
              onClick={() => {
                toast.success('Request sent succesfully')
                setRequest(false)}}
              className="flex-1 flex items-center justify-center p-3 rounded-lg bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white cursor-pointer transition-all duration-300"
            >
              Send Request
            </button>
          ) : (
            <button
              onClick={() => setRequest(true)}
              className="flex-1 flex items-center justify-center p-3 rounded-lg bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white cursor-pointer transition-all duration-300"
            >
              <Heart className="w-4 h-4 mr-2" />
              Request Item
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemPopUp;
