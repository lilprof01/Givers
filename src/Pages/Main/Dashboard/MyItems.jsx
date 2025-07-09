import {
  Package,
  Gift,
  Plus,
  Calendar,
  MapPin,
  Heart,
  Eye,
  User,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { formatDistanceToNow } from "date-fns";
import { auth, db } from "../../../Authentication/Firebase";

const MyItems = () => {
  /* ───────────────────── state ───────────────────── */
  const [postedItems, setPostedItems] = useState([]);
  const [receivedItems] = useState([]); // TODO: implement later
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /* ────────────────── fetch posted items ──────────── */
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (!user) return navigate("/login");

      const q = query(
        collection(db, "give"),
        where("giverId", "==", user.uid),
        orderBy("createdAt", "desc")
      );

      const unsubSnap = onSnapshot(q, (snap) => {
        const list = snap.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            title: data.itemName,
            description: data.description,
            image: data.photoURL || "📦",
            location: data.location,
            condition: data.itemStatus,
            datePosted: formatDistanceToNow(
              data.createdAt?.toDate?.() || new Date(),
              { addSuffix: true }
            ),
            category: data.category,
            status: data.itemStatus,
            views: data.views || 0,
            requests: data.requests || 0,
          };
        });
        setPostedItems(list);
        setLoading(false);
      });

      // clean up Firestore listener when auth changes/unmounts
      return () => unsubSnap();
    });

    return () => unsubAuth();
  }, [navigate]);

  /* ───────────────── helper ───────────────────────── */
  const statusColor = (s) =>
    ({
      available: "text-green-700",
      pending: "text-yellow-700",
      given: "text-blue-700",
    }[s.toLowerCase()] || "text-gray-700");

  /* ───────────────── render ───────────────────────── */
  return (
    <div className="p-6 space-y-6 pt-22 sm:pt-10 sm:overflow-y-scroll">
      {/* hero */}
      <div
        className="bg-gradient-to-r from-blue-50 to-green-50
                      dark:from-blue-900 dark:to-green-900
                      rounded-2xl p-8 border dark:border-gray-800"
      >
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">My Items 📦</h2>
            <p className="opacity-70 mb-4">
              Manage your posted items and view your received gifts.
            </p>
            <Link
              to="/give"
              className="bg-gradient-to-r from-blue-500 to-green-500
                         hover:from-blue-600 hover:to-green-600
                         text-white rounded-full flex items-center gap-2
                         px-4 py-2 w-fit"
            >
              <Plus className="w-4 h-4" />
              Post New Item
            </Link>
          </div>
          <div className="hidden lg:block">
            <div
              className="w-32 h-32 bg-gradient-to-r from-blue-200 to-green-200
                            dark:from-blue-600 dark:to-green-600 rounded-full
                            flex items-center justify-center"
            >
              <Package className="w-16 h-16 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* posted items */}
      <section>
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
          <Gift className="w-5 h-5" />
          Items I've Posted ({postedItems.length})
        </h3>

        {loading ? (
          <p>Loading…</p>
        ) : postedItems.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {postedItems.map((item) => (
              <div
                key={item.id}
                className="bg-gray-50 dark:bg-black/20 text-gray-900 dark:text-gray-200
                              rounded-xl p-4 border dark:border-gray-800"
              >
                <div className="text-center mb-3">
                  {item.image.startsWith("http") ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 object-cover mx-auto rounded mb-2"
                    />
                  ) : (
                    <div className="text-4xl mb-2">{item.image}</div>
                  )}
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-sm opacity-70">{item.description}</p>
                </div>

                <div className="space-y-2 text-xs text-gray-500 mb-3">
                  <div className="flex gap-1 items-center">
                    <MapPin className="w-3 h-3" />
                    <span>{item.location}</span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <Calendar className="w-3 h-3" />
                    <span>{item.datePosted}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-3">
                  <span className={`${statusColor(item.status)} text-xs`}>
                    {item.status}
                  </span>
                  <span className="text-blue-700 text-xs font-medium">
                    {item.category}
                  </span>
                </div>

                <div
                  className="flex justify-between items-center text-xs
                                text-gray-500 bg-white dark:bg-gray-800
                                rounded-lg p-2"
                >
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {item.views} views
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    {item.requests} requests
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium mb-2">No items posted yet</h4>
            <p className="text-gray-600 mb-4">
              Start sharing items with your community!
            </p>
            <Link
              to="/give"
              className="bg-gradient-to-r from-blue-500 to-green-500
                         hover:from-blue-600 hover:to-green-600
                         text-white rounded-full px-4 py-2 inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Post Your First Item
            </Link>
          </div>
        )}
      </section>

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
                <div
                  key={item.id}
                  className="bg-gray-50 dark:bg-black/20 text-gray-900 dark:text-gray-200 rounded-xl p-4 border border-gray-200 dark:border-gray-800"
                >
                  <div className="text-center mb-3">
                    <div className="text-4xl mb-2">{item.image}</div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm opacity-70 mb-2">
                      {item.description}
                    </p>
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No items received yet
              </h3>
              <p className="text-gray-600 mb-4">
                Start browsing available items in your community!
              </p>
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
                <p className="text-2xl font-bold">
                  {postedItems.reduce((sum, item) => sum + item.views, 0)}
                </p>
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
