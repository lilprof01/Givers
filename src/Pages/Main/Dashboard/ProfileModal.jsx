import { useState } from "react";
import { X, Save } from "lucide-react";

const Modal = ({ profile, onSave, onClose }) => {
  const [form, setForm] = useState({
    name: profile.name || "",
    location: profile.location || "",
    bio: profile.bio || "",
    phone: profile.phone || "",
    avatarUrl: profile.avatarUrl || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);        // parent will update Firestore
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-black p-6 rounded-xl w-[90vw] max-w-lg space-y-4"
      >
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold">Edit Profile</h2>
          <X className="w-5 h-5 cursor-pointer" onClick={onClose} />
        </div>

        {["name","location","phone","avatarUrl"].map((field)=>(
          <input
            key={field}
            placeholder={field === "avatarUrl" ? "Avatar image URL" : field}
            value={form[field]}
            onChange={(e)=>setForm({...form, [field]: e.target.value})}
            className="border rounded w-full p-2 text-sm"
          />
        ))}

        <textarea
          placeholder="Bio"
          rows={3}
          value={form.bio}
          onChange={(e)=>setForm({...form, bio:e.target.value})}
          className="border rounded w-full p-2 text-sm resize-none"
        />

        <button
          type="submit"
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-4 py-2 rounded w-full justify-center"
        >
          <Save className="w-4 h-4" /> Save
        </button>
      </form>
    </div>
  );
};

export default Modal;
