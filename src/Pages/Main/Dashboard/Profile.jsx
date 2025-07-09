import {
  Mail,
  MapPin,
  Calendar,
  Camera,
  Award,
  Heart,
  Package,
  Star,
  Shield,
  Edit3,
  Save,
  X,
} from "lucide-react";
import img from "/assets/images/giveHeart.jpg";
import { useEffect, useState } from "react";
import { auth, db } from "../../../Authentication/Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";


const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(null);
  const [editedProfile, setEditedProfile] = useState(profile);

useEffect(() => {
  const fetchUser = async () => {
    const user = auth.currentUser;
    if (user) {
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) {
        const data = snap.data();
        const userData = {
          name: data.username || "Unnamed",
          email: user.email,
          location: data.address || "Not specified",
          bio: data.bio || "",
          phone: data.phone || "", 
          joinDate: new Date(user.metadata.creationTime).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
          }),
        };
        setProfile(userData);
        setEditedProfile(userData);
      }
    }
  };
  fetchUser();
}, []);

const handleSave = async () => {
  const user = auth.currentUser;
  if (!user) return;
  const ref = doc(db, "users", user.uid);

  await updateDoc(ref, {
    username: editedProfile.name,
    location: editedProfile.location,
    bio: editedProfile.bio,
    phone: editedProfile.phone,
  });

  setProfile(editedProfile);
  setIsEditing(false);
};

if (!profile) return <div className="p-6">Loading profile...</div>;


  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const stats = [
    { label: "Items Given", value: 12, icon: Heart, color: "text-red-500" },
    {
      label: "Items Received",
      value: 8,
      icon: Package,
      color: "text-blue-500",
    },
    {
      label: "Trust Score",
      value: "98%",
      icon: Shield,
      color: "text-green-500",
    },
  ];

  const achievements = [
    {
      title: "Early Adopter",
      description: "Joined in the first month",
      icon: "🚀",
    },
    { title: "Generous Giver", description: "Gave away 10+ items", icon: "💝" },
    {
      title: "Community Helper",
      description: "Helped 50+ neighbors",
      icon: "🤝",
    },
    {
      title: "Eco Warrior",
      description: "Prevented 100+ items from waste",
      icon: "🌱",
    },
  ];

  return (
    <div className="p-6 space-y-6 mt-20 sm:mt-0 overflow-y-scroll">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900 dark:to-green-900 text-gray-900 dark:text-gray-200 rounded-2xl p-8 border border-gray-100 dark:border-gray-800">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
          {/* Avatar Section */}
          <div className="relative">
            <div className="w-32 h-32 border-4 rounded-full border-white shadow-lg overflow-hidden">
              {/* <img src={img} alt="Profile" className="h-full w-full" /> */}
              <div className="h-full w-full flex justify-center items-center text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-blue-500 to-green-500 text-white">
                {profile.username?.[0]?.toUpperCase() || "U"}
              </div>
            </div>
            <button
              size="icon"
              className="absolute -bottom-2 -right-2 rounded-full bg-white p-2 text-gray-600 hover:bg-gray-50 shadow-lg border border-gray-200 cursor-pointer"
            >
              <Camera className="w-5 h-5" />
            </button>
          </div>

          {/* Profile Info */}
          <div className="flex-1 space-y-4">
            {isEditing ? (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    value={editedProfile.name}
                    onChange={(e) =>
                      setEditedProfile({
                        ...editedProfile,
                        name: e.target.value,
                      })
                    }
                    className="text-xl font-bold border px-2 py-1 rounded-lg"
                    placeholder="Full Name"
                  />
                  <input
                    value={editedProfile.email}
                    onChange={(e) =>
                      setEditedProfile({
                        ...editedProfile,
                        email: e.target.value,
                      })
                    }
                    className="border px-2 py-1 rounded-lg"
                    placeholder="Email"
                  />
                  <input
                    value={editedProfile.location}
                    onChange={(e) =>
                      setEditedProfile({
                        ...editedProfile,
                        location: e.target.value,
                      })
                    }
                    className="border px-2 py-1 rounded-lg"
                    placeholder="Location"
                  />
                </div>
                <textarea
                  value={editedProfile.bio}
                  onChange={(e) =>
                    setEditedProfile({ ...editedProfile, bio: e.target.value })
                  }
                  className="w-full p-3 border-2 border-gray-200 rounded-lg resize-none"
                  rows={3}
                  placeholder="Tell us about yourself..."
                />
              </div>
            ) : (
              <div className="space-y-3">
                <h1 className="text-3xl font-bold">{profile.name}</h1>
                <div className="flex flex-wrap gap-4 opacity-80">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{profile.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {profile.joinDate}</span>
                  </div>
                </div>
                <p className="max-w-2xl">{profile.bio}</p>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="flex justify-center items-center p-2 rounded-lg cursor-pointer bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="border flex justify-center items-center p-2 rounded-lg hover:bg-black hover:text-white transition-all duration-200 cursor-pointer"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex justify-center items-center p-2 rounded-lg bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white transition-all duration-300 cursor-pointer"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Trust Badge */}
          <div className="bg-white dark:bg-black/50  text-gray-900 dark:text-gray-200 rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <p className="text-sm font-medium">Verified Member</p>
              <p className="text-xs opacity-80">Trust Score: 98%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white/80 dark:bg-black/80 text-gray-900 dark:text-gray-200 backdrop-blur-sm border-gray-100 shadow hover:shadow-lg transition-all duration-200"
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm opacity-90">{stat.label}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Achievements */}
        <div className="lg:col-span-2">
          <div>
            <div className="flex items-center gap-2 font-bold mb-2">
              <Award className="w-5 h-5" />
              Achievements
            </div>
          </div>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className=" text-gray-900 dark:text-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-black/20 dark:to-black/80 rounded-xl p-4 border border-gray-200 dark:border-none"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div>
                      <h3 className="font-semibold mb-1">
                        {achievement.title}
                      </h3>
                      <p className="text-sm opacity-80">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="">
        <div className="mb-2">
          <div>Recent Activity</div>
        </div>
        <div>
          <div className="space-y-4">
            {[
              {
                action: "Gave away",
                item: "Vintage Guitar",
                time: "2 hours ago",
                type: "give",
              },
              {
                action: "Received",
                item: "Coffee Machine",
                time: "1 day ago",
                type: "receive",
              },
              {
                action: "Posted",
                item: "Study Desk",
                time: "3 days ago",
                type: "post",
              },
              {
                action: "Reviewed",
                item: "Maria Santos",
                time: "1 week ago",
                type: "review",
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-black/50 rounded-lg"
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    activity.type === "give"
                      ? "bg-green-500"
                      : activity.type === "receive"
                      ? "bg-blue-500"
                      : activity.type === "post"
                      ? "bg-purple-500"
                      : "bg-yellow-500"
                  }`}
                ></div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{activity.action}</span>{" "}
                    <span className="opacity-90">{activity.item}</span>
                  </p>
                  <p className="text-xs opacity-70">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
