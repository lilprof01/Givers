import {
  Mail, MapPin, Calendar, Camera,
  Heart, Package, Shield, Edit3
} from "lucide-react";
import { useState, useEffect } from "react";
import { auth, db } from "../../../Authentication/Firebase";
import {
  doc, getDoc, updateDoc, serverTimestamp
} from "firebase/firestore";
import Modal from "./ProfileModal";               // 👉 tiny modal component below
import { toast, ToastContainer } from "react-toastify";

const Profile = () => {
  const [profile, setProfile] = useState(null);   // null until fetched
  const [modalOpen, setModalOpen] = useState(false);

  /* ────────────────────────────────────────
     Fetch user profile once on mount
  ──────────────────────────────────────── */
  useEffect(() => {
    const loadProfile = async () => {
      const fbUser = auth.currentUser;
      if (!fbUser) return;
      const snap = await getDoc(doc(db, "users", fbUser.uid));
      if (snap.exists()) {
        setProfile({ uid: fbUser.uid, email: fbUser.email, ...snap.data() });
      } else {
        // create a bare doc the first time
        await updateDoc(doc(db, "users", fbUser.uid), { createdAt: serverTimestamp() });
        setProfile({ uid: fbUser.uid, email: fbUser.email });
      }
    };
    loadProfile();
  }, []);

  /* ────────────────────────────────────────
     Handle save from the modal
  ──────────────────────────────────────── */
  const handleSave = async (updates) => {
    try {
      await updateDoc(doc(db, "users", profile.uid), updates);
      setProfile({ ...profile, ...updates });
      toast.success("Profile updated");
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    } finally {
      setModalOpen(false);
    }
  };

  if (!profile) return null;   // or spinner

  /* Example stats – replace with real counts if you store them */
  const stats = [
    { label: "Items Given", value: profile.itemsGiven ?? 0,  icon: Heart,   color: "text-red-500" },
    { label: "Items Received", value: profile.itemsReceived ?? 0, icon: Package, color: "text-blue-500" },
    { label: "Trust Score", value: `${profile.trustScore ?? 0}%`, icon: Shield,  color: "text-green-500" },
  ];

  return (
    <div className="p-6 mt-20 overflow-y-scroll">
      <ToastContainer />
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900 dark:to-green-900 rounded-2xl p-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Avatar */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 shadow">
              {profile.avatarUrl ? (
                <img src={profile.avatarUrl} className="object-cover w-full h-full" />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-3xl font-bold bg-gradient-to-r from-blue-500 to-green-500 text-white">
                  {profile.name?.split(" ").map((n)=>n[0]).join("") || "?"}
                </div>
              )}
            </div>
            {/* camera icon could trigger separate avatar flow */}
            <Camera className="absolute -bottom-2 -right-2 p-1 w-7 h-7 bg-white rounded-full shadow" />
          </div>

          {/* Info */}
          <div className="flex-1 space-y-3">
            <h1 className="text-3xl font-bold">{profile.name || "Your name"}</h1>
            <div className="flex flex-wrap gap-4 opacity-80">
              <InfoRow Icon={Mail} text={profile.email} />
              {profile.location && <InfoRow Icon={MapPin} text={profile.location} />}
              {profile.createdAt && (
                <InfoRow
                  Icon={Calendar}
                  text={`Joined ${new Date(profile.createdAt.seconds * 1000).toLocaleDateString()}`}
                />
              )}
            </div>
            {profile.bio && <p className="max-w-2xl">{profile.bio}</p>}
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-4 py-2 rounded">
              <Edit3 className="w-4 h-4" /> Edit Profile
            </button>
          </div>

          {/* Badge */}
          <div className="bg-white/70 dark:bg-black/40 rounded-xl p-4 text-center">
            <Shield className="w-16 h-16 mx-auto text-green-600" />
            <p className="font-medium">Verified Member</p>
            <p className="text-xs">Trust Score: {profile.trustScore ?? 0}%</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
        {stats.map((s,i)=>(
          <div key={i} className="bg-white/80 dark:bg-black/70 p-6 rounded shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-sm">{s.label}</p>
              </div>
              <s.icon className={`w-8 h-8 ${s.color}`}/>
            </div>
          </div>
        ))}
      </div>

      {/* …other sections (achievements, activity) keep as‑is … */}

      {/* Edit Modal */}
      {modalOpen && (
        <Modal
          profile={profile}
          onSave={handleSave}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Profile;

/* ───────────────── small helpers ───────────────── */
const InfoRow = ({ Icon, text }) => (
  <span className="flex items-center gap-2 text-sm">
    <Icon className="w-4 h-4" /> {text}
  </span>
);
