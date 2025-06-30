import { Gift, Users, Heart, TrendingUp, Package, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../Authentication/Firebase";
import { toast } from "react-toastify";

const Dashboard = () => {

  const [user, setUser] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();


  const stats = [
    {
      title: "Items Given",
      value: "0",
      change: "+0%",
      icon: Gift,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Items Received",
      value: "0",
      change: "+0%",
      icon: Package,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Community Impact",
      value: "0",
      change: "+0%",
      icon: Heart,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Profile Views",
      value: "0",
      change: "+0%",
      icon: Eye,
      color: "from-orange-500 to-orange-600",
    },
  ];

  const recentItems = [
    {
      id: 1,
      title: "Vintage Coffee Table",
      status: "Available",
      image: "📦",
      date: "2 hours ago",
    },
    {
      id: 2,
      title: "Children's Books Set",
      status: "Given",
      image: "📚",
      date: "1 day ago",
    },
    {
      id: 3,
      title: "Kitchen Appliances",
      status: "Given",
      image: "🍳",
      date: "3 days ago",
    },
  ];

  
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
          console.log("Auth user:", user);

          // Fetch additional user data from Firestore
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            console.log("Firestore user data:", userData);

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

  return (
    <div>
      {isVerified ? (
        <div className="p-6 space-y-6 mt-20 sm:mt-0 max-h-screen overflow-y-scroll">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900 dark:to-green-900 text-gray-900 dark:text-gray-200 rounded-2xl p-8 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Welcome back, Pelumi! 👋
              </h2>
              <p className="opacity-70 mb-4">
                You've made a positive impact in your community. Keep giving!
              </p>
              <button className="bg-gradient-to-r from-blue-500 to-green-500 dark:from-blue-600 dark:to-green-600 hover:from-blue-600 hover:to-green-600 text-white rounded-full px-4 py-2 cursor-pointer">
                Share New Item
              </button>
            </div>
            <div className="hidden lg:block">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-200 to-green-200 dark:from-blue-600 dark:to-green-600 rounded-full flex items-center justify-center">
                <Gift className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>
        </div>
  
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/80 dark:bg-black/50 text-gray-600 dark:text-gray-300 backdrop-blur-sm border-gray-100 shadow hover:shadow-lg transition-all duration-300 p-4 rounded-lg"
            >
              <div className="flex flex-row items-center justify-between pb-2">
                <div className="text-sm font-medium">
                  {stat.title}
                </div>
                <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color}`}>
                  <stat.icon className="w-4 h-4 text-white" />
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {stat.value}
                </div>
                <p className="text-xs text-green-600 font-medium flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {stat.change} from last month
                </p>
              </div>
            </div>
          ))}
        </div>
  
        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Items */}
          <div className="lg:col-span-2">
            <div className="bg-gray-100/30 dark:bg-black/40 text-gray-900 dark:text-gray-300 backdrop-blur-sm border-gray-100 p-4 rounded-lg">
              <div>
                <div className="text-lg font-semibold mb-3">
                  Recent Items
                </div>
              </div>
              <div>
                <div className="space-y-4">
                  {recentItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-2xl">{item.image}</div>
                        <div>
                          <h4 className="font-medium">
                            {item.title}
                          </h4>
                          <p className="text-sm text-gray-500">{item.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            item.status === "Available"
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {item.status}
                        </span>
                        <button
                          size="sm"
                          className="hover:text-gray-950 dark:hover:text-gray-100 cursor-pointer"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
  
          {/* Community Activity */}
          <div className="bg-gray-100/30 dark:bg-black/40 text-gray-900 dark:text-gray-300 backdrop-blur-sm border-gray-100 p-4 rounded-lg">
            <div>
              <div className="text-lg font-semibold flex items-center gap-2">
                <Users className="w-5 h-5" />
                Community Activity
              </div>
            </div>
            <div>
              <div className="space-y-4">
                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-blue-500" />
                  </div>
                  <h3 className="font-semibold mb-2">
                    Active Community
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Join 10,000+ members making a difference
                  </p>
                  <button className="w-full border border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 py-2 rounded-xl cursor-pointer">
                    View Community
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      ) : (
        <main className="h-screen dark:text-white dark:bg-[#121212]">
          <h1>Fetching Dashboard...</h1>
        </main>
      )}
    </div>
    
  );
};

export default Dashboard;
