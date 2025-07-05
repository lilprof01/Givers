
import { Package, Gift, Plus, Calendar, MapPin, User, Heart, Eye } from "lucide-react";
import { useState } from "react";
import { Link, Navigate } from "react-router";

const MyItems = () => {
  // Mock data for user's posted items
  const [postedItems] = useState([
    {
      id: 1,
      title: "Vintage Guitar",
      description: "Acoustic guitar in great condition",
      image: "🎸",
      location: "Downtown, City Center",
      condition: "Excellent",
      datePosted: "3 days ago",
      category: "Music",
      status: "Available",
      views: 24,
      requests: 3
    },
    {
      id: 2,
      title: "Study Desk",
      description: "Wooden desk perfect for students",
      image: "🪑",
      location: "Westside, Green Valley",
      condition: "Good",
      datePosted: "1 week ago",
      category: "Furniture",
      status: "Pending",
      views: 18,
      requests: 1
    }
  ]);

  // Mock data for user's received items
  const [receivedItems] = useState([
    {
      id: 1,
      title: "Coffee Machine",
      description: "Espresso maker with milk frother",
      image: "☕",
      location: "Central District",
      condition: "Very Good",
      giver: "Maria Santos",
      dateReceived: "2 weeks ago",
      category: "Appliances"
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "text-green-700";
      case "Pending":
        return "text-yellow-700";
      case "Given":
        return "text-blue-700";
      default:
        return "text-gray-700";
    }
  };

  return (
    <div className="p-6 space-y-6 mt-20 sm:mt-0 overflow-y-scroll">
      {/* Top Section */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900 dark:to-green-900 text-gray-900 dark:text-gray-200 rounded-2xl p-8 border border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">My Items 📦</h2>
            <p className="opacity-70 mb-4">Manage your posted items and view your received gifts.</p>
            <Link to={'/give'} className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white rounded-full flex items-center gap-2 px-4 py-2 cursor-pointer w-fit">
              <Plus className="w-4 h-4 mr-2" />
              Post New Item
            </Link>
          </div>
          <div className="hidden lg:block">
            <div className="w-32 h-32 bg-gradient-to-r from-blue-200 to-green-200 dark:from-blue-600 dark:to-green-600 rounded-full flex items-center justify-center">
              <Package className="w-16 h-16 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Items I've Posted */}
      <div className=" backdrop-blur-sm text-gray-900 dark:text-gray-200">
        <div>
          <div className="text-lg font-semibold flex items-center gap-2 mb-2">
            <Gift className="w-5 h-5" />
            Items I've Posted ({postedItems.length})
          </div>
        </div>
        <div>
          {postedItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {postedItems.map((item) => (
                <div key={item.id} className="bg-gray-50 dark:bg-black/20 text-gray-900 dark:text-gray-200 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
                  <div className="text-center mb-3">
                    <div className="text-4xl mb-2">{item.image}</div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm opacity-70 mb-2">{item.description}</p>
                  </div>
                  
                  <div className="space-y-2 text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{item.datePosted}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-3">
                    <div className={`${getStatusColor(item.status)} text-xs`}>
                      {item.status}
                    </div>
                    <span className="text-blue-700 rounded-full text-xs font-medium">
                      {item.category}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs text-gray-500 bg-white dark:bg-gray-800 rounded-lg p-2">
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>{item.views} views</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      <span>{item.requests} requests</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No items posted yet</h3>
              <p className="text-gray-600 mb-4">Start sharing items with your community!</p>
              <Link to={'/give'} className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white rounded-full">
                <Plus className="w-4 h-4 mr-2" />
                Post Your First Item
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Items I've Received */}
      <div className="backdrop-blur-sm text-gray-900 dark:text-gray-200">
        <div>
          <div className="text-lg font-semibold flex items-center gap-2 mb-2">
            <Heart className="w-5 h-5" />
            Items I've Received ({receivedItems.length})
          </div>
        </div>
        <div>
          {receivedItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {receivedItems.map((item) => (
                <div key={item.id} className="bg-gray-50 dark:bg-black/20 text-gray-900 dark:text-gray-200 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
                  <div className="text-center mb-3">
                    <div className="text-4xl mb-2">{item.image}</div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm opacity-70 mb-2">{item.description}</p>
                  </div>
                  
                  <div className="space-y-2 text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>From {item.giver}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>Received {item.dateReceived}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-green-700 rounded-full text-xs font-medium">
                      Condition: {item.condition}
                    </span>
                    <span className="text-purple-700 rounded-full text-xs font-medium">
                      {item.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No items received yet</h3>
              <p className="text-gray-600 mb-4">Start browsing available items in your community!</p>
              <button variant="outline" className="rounded-full">
                Browse Available Items
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Posted</p>
                <p className="text-2xl font-bold">{postedItems.length}</p>
              </div>
              <Package className="w-8 h-8 text-blue-200" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Total Received</p>
                <p className="text-2xl font-bold">{receivedItems.length}</p>
              </div>
              <Heart className="w-8 h-8 text-green-200" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Total Views</p>
                <p className="text-2xl font-bold">{postedItems.reduce((sum, item) => sum + item.views, 0)}</p>
              </div>
              <Eye className="w-8 h-8 text-purple-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyItems;