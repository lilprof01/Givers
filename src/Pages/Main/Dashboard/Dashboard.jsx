import { Gift, Users, Heart, TrendingUp, Package, Eye, MapPin, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import ItemPopUp from "../../../Components/Dashboard/ItemPopUp";

const Dashboard = () => {

  const [user, setUser] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();


  const stats = [
    {
      id: 1,
      title: "Vintage Coffee Table",
      description: "Beautiful mahogany coffee table in excellent condition",
      image: "📦",
      location: "Downtown, City Center",
      condition: "Excellent",
      giver: "Sarah Johnson",
      datePosted: "2 hours ago",
      category: "Furniture",
      fullDescription: "This is a beautiful vintage mahogany coffee table that has been in my family for years. It's in excellent condition with minor wear that adds to its character. Perfect for a living room or study area."
    },
    {
      id: 2,
      title: "Children's Books Set",
      description: "Collection of 20 children's books, ages 3-8",
      image: "📚",
      location: "Westside, Green Valley",
      condition: "Good",
      giver: "Mike Chen",
      datePosted: "1 day ago",
      category: "Books",
      fullDescription: "A wonderful collection of children's books including classic stories and educational books. Great for young readers ages 3-8. Some books show gentle use but all are in good readable condition."
    },
    {
      id: 3,
      title: "Kitchen Appliances",
      description: "Blender, toaster, and coffee maker set",
      image: "🍳",
      location: "Eastside, Oak Hills",
      condition: "Very Good",
      giver: "Lisa Rodriguez",
      datePosted: "3 days ago",
      category: "Appliances",
      fullDescription: "A complete set of kitchen appliances including a high-powered blender, 4-slice toaster, and programmable coffee maker. All items work perfectly and have been well-maintained."
    },
    {
      id: 4,
      title: "Winter Clothing",
      description: "Coats, sweaters, and warm accessories",
      image: "🧥",
      location: "Central District",
      condition: "Good",
      giver: "David Kim",
      datePosted: "5 days ago",
      category: "Clothing",
      fullDescription: "Warm winter clothing including 3 coats (sizes M-L), several sweaters, scarves, and gloves. All items are clean and in good condition. Perfect for someone in need of warm clothing."
    },
    {
      id: 5,
      title: "Exercise Equipment",
      description: "Yoga mats, dumbbells, and resistance bands",
      image: "🏋️",
      location: "Northside, Pine Ridge",
      condition: "Excellent",
      giver: "Jennifer Wang",
      datePosted: "1 week ago",
      category: "Sports",
      fullDescription: "Complete home workout set including 2 yoga mats, adjustable dumbbells (5-25 lbs), resistance bands, and exercise ball. Everything is in excellent condition and barely used."
    },
    {
      id: 6,
      title: "Art Supplies",
      description: "Paints, brushes, canvases, and drawing materials",
      image: "🎨",
      location: "Arts District",
      condition: "Very Good",
      giver: "Alex Thompson",
      datePosted: "1 week ago",
      category: "Art",
      fullDescription: "Professional art supplies including acrylic paints, various brushes, stretched canvases, sketchbooks, and drawing pencils. Great for an aspiring artist or art student."
    }
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

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="p-6 space-y-6 mt-20 sm:mt-0 overflow-y-scroll">
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
                  <div className="text-7xl mb-3">{item.image}</div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm opacity-70 mb-2 line-clamp-1">{item.description}</p>
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
