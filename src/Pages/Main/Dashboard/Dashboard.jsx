import { Gift, MapPin, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import ItemPopUp from "../../../Components/Dashboard/ItemPopUp";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../../Authentication/Firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";
import { formatDistanceToNow } from "date-fns";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();
  const [giftItems, setGiftItems] = useState([]);
  const [userData, setUserData] = useState({ username: "", email: "" });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const { username = "", email = "" } = userDoc.data();
          setUserData({ username, email });
        }
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // live query: all items with itemStatus == "available", newest first
    const q = query(
      collection(db, "give"),
      where("itemStatus", "==", "available"),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {
      const docs = snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          title: data.itemName,
          description: data.description,
          image: data.photoURL, // 👉 use emoji fallback or data.photoURL
          location: data.location,
          condition: data.itemStatus, // or another field if you store “condition”
          giver: data.giverName,
          giverId: data.giverId,
          datePosted: formatDistanceToNow(
            data.createdAt?.toDate?.() || new Date(),
            { addSuffix: true }
          ),
          category: data.category,
          fullDescription: data.description, // you might store a longer field
        };
      });
      setGiftItems(docs);
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        if (user.emailVerified) {
          setIsVerified(true);
        } else {
          toast.error("Please verify your email before proceeding.", {
            position: "top-center",
          });
          navigate("/verifyemail"); // Redirect to a verification page
        }
        try {
          // 🔍 Debugging: Log the auth user before fetching Firestore data
          // console.log("Auth user:", user);

          // Fetch additional user data from Firestore
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            // console.log("Firestore user data:", userData);

            setUser({ uid: user.uid, email: user.email, ...userData });
            setIsVerified(true);
          } else {
            console.warn("User data not found in Firestore!");
            toast.error("User data not found in Firestore.");
            setUser({ uid: user.uid, email: user.email }); // Fallback
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        navigate("/login"); // Redirect if no user is signed in
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedItem(null);
  };

  if (giftItems.length <= 0) {
    return (
      <div className="flex flex-col justify-center items-center gap-4 sm:overflow-y-scroll">
        <div class="loader">
          <div class="box box-1">
            <div class="side-left"></div>
            <div class="side-right"></div>
            <div class="side-top"></div>
          </div>
          <div class="box box-2">
            <div class="side-left"></div>
            <div class="side-right"></div>
            <div class="side-top"></div>
          </div>
          <div class="box box-3">
            <div class="side-left"></div>
            <div class="side-right"></div>
            <div class="side-top"></div>
          </div>
          <div class="box box-4">
            <div class="side-left"></div>
            <div class="side-right"></div>
            <div class="side-top"></div>
          </div>
        </div>
        <p>Fetching available items</p>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6 pt-22 sm:pt-10 sm:mt-0 sm:overflow-y-scroll">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900 dark:to-green-900 text-gray-900 dark:text-gray-200 rounded-2xl p-8 border border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Welcome back, {userData?.username}! 👋
            </h2>
            <p className="opacity-70 mb-4">
              You've made a positive impact in your community. Keep giving!
            </p>
            <Link
              to={"/give"}
              className="bg-gradient-to-r from-blue-500 to-green-500 dark:from-blue-600 dark:to-green-600 hover:from-blue-600 hover:to-green-600 text-white rounded-full p-3 cursor-pointer"
            >
              Share New Item
            </Link>
          </div>
          <div className="hidden lg:block">
            <div className="w-32 h-32 bg-gradient-to-r from-blue-200 to-green-200 dark:from-blue-600 dark:to-green-600 rounded-full flex items-center justify-center">
              <Gift className="w-16 h-16 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="backdrop-blur-sm border-gray-100 text-gray-900 dark:text-gray-200">
        <div>
          <div className="text-lg font-semibold flex items-center gap-2">
            <Gift className="w-5 h-5" />
            Available Gift Items
          </div>
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {giftItems.map((item) => (
              <div
                key={item.id}
                className="bg-gray-50 dark:bg-black/20 rounded-xl p-4 hover:bg-gray-100 dark:hover:bg-gray-900/20 transition-colors duration-200 cursor-pointer border border-gray-200 dark:border-gray-800"
                onClick={() => handleItemClick(item)}
              >
                <div className="text-center mb-3">
                  {item.image.startsWith("http") ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-28 h-28 object-cover rounded mx-auto mb-3"
                    />
                  ) : (
                    <div className="text-7xl mb-3">{item.image}</div>
                  )}
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm opacity-70 mb-2 line-clamp-1">
                    {item.description}
                  </p>
                </div>
                <div className="space-y-1 text-xs opacity-50">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{item.datePosted}</span>
                  </div>
                </div>
                <div className="flex justify-end items-center gap-4 mt-3">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                    {item.category}
                  </span>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                    {item.condition}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ItemPopUp
        item={selectedItem}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
      />
    </div>
  );
};

export default Dashboard;
