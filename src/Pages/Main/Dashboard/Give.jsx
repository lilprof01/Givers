import React, { useState, useEffect } from "react";
import { auth, db } from "../../../Authentication/Firebase";
import {
  doc, getDoc,
  collection, addDoc, serverTimestamp,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CLOUD_NAME  = "dcmzckthf"; 
const UPLOAD_PRESET = "givers"; 

const GiveItemForm = () => {
  const [itemName,       setItemName]       = useState("");
  const [category,       setCategory]       = useState("");
  const [description,    setDescription]    = useState("");
  const [itemStatus,     setItemStatus]     = useState("available");
  const [useSavedAddr,   setUseSavedAddr]   = useState(true);
  const [customAddr,     setCustomAddr]     = useState("");
  const [file,           setFile]           = useState(null);
  const [previewURL,     setPreviewURL]     = useState("");
  const [submitting,     setSubmitting]     = useState(false);
  const [progress,       setProgress]       = useState(0);

  const [userData, setUserData] = useState({ uid: "", username: "", address: "" });

  
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) return;
      const snap = await getDoc(doc(db, "users", u.uid));
      if (snap.exists()) {
        const { username = "", address = "" } = snap.data();
        setUserData({ uid: u.uid, username, address });
      }
    });
    return () => unsub();
  }, []);
  
  const handleChange = ({ target: { name, value } }) => {
    const map = {
      itemName:    setItemName,
      category:    setCategory,
      description: setDescription,
      itemStatus:  setItemStatus,
      locationChoice: (v) => setUseSavedAddr(v === "saved"),
      location:    setCustomAddr,
    };
    map[name]?.(value);
  };

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreviewURL(URL.createObjectURL(f));      // local preview
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    if (!file) { toast.error("Please choose a photo"); return; }

    setSubmitting(true);
    try {
      /* 1️⃣  Upload to Cloudinary ------------------------------------ */
      const form = new FormData();
      form.append("file", file);
      form.append("upload_preset", UPLOAD_PRESET);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: form,
        }
      );


      const cldJson = await res.json();
      if (!cldJson.secure_url)
        throw new Error(cldJson.error?.message || "Cloudinary upload failed");

      const photoURL = cldJson.secure_url;

      /* 2️⃣  Create Firestore doc ------------------------------------ */
      await addDoc(collection(db, "give"), {
        itemName,
        category,
        description,
        itemStatus,
        location: useSavedAddr ? userData.address : customAddr,
        giverId:   userData.uid,
        giverName: userData.username,
        photoURL,
        createdAt: serverTimestamp(),
      });

      toast.success("Item submitted 🎉");
      /* reset */
      setItemName(""); setCategory(""); setDescription("");
      setItemStatus("available"); setCustomAddr(""); setFile(null);
      setPreviewURL(""); setProgress(0);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="col-start-2 p-6 flex flex-col items-center">
      <ToastContainer position="top-center" autoClose={3000} />
      <form
        onSubmit={handleSubmit}
        className="space-y-5 w-full max-w-md mx-auto"
      >
        <h2 className="text-xl font-bold text-center text-[#6C3BAA]">
          Give an Item
        </h2>

        <input name="itemName" value={itemName}
          onChange={handleChange} placeholder="Item name" required
          className="w-full border rounded p-2"/>

        <select name="category" value={category}
          onChange={handleChange} required
          className="w-full border rounded p-2">
          <option value="" disabled>Select category</option>
          {["Clothes","Books","Furniture","Electronics","Toys","Others"].map(c=>(
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <textarea name="description" value={description} required
          onChange={handleChange} placeholder="Describe the item"
          className="w-full border rounded p-2 min-h-[100px]"/>

        <select name="itemStatus" value={itemStatus}
          onChange={handleChange} className="w-full border rounded p-2">
          <option value="available">Available</option>
          <option value="taken">Taken</option>
        </select>

        {/* Address */}
        <div>
          <p className="text-sm font-medium mb-1">Choose location</p>
          <label className="flex items-center gap-2 mb-1">
            <input type="radio" name="locationChoice" value="saved"
              checked={useSavedAddr} onChange={handleChange}/>
            Use my saved address
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="locationChoice" value="new"
              checked={!useSavedAddr} onChange={handleChange}/>
            Enter new address
          </label>

          {!useSavedAddr && (
            <input name="location" value={customAddr} required
              onChange={handleChange} placeholder="Enter new address"
              className="w-full border rounded p-2 mt-2"/>
          )}
        </div>

        {/* Image picker */}
        <div className="space-y-2">
          <label className="block font-semibold">Item photo</label>
          <input type="file" accept="image/*" onChange={handleFile}/>
          {previewURL && (
            <img src={previewURL} alt="preview"
                 className="h-32 w-32 object-cover rounded"/>
          )}
        </div>

        <button type="submit" disabled={submitting}
          className="w-full py-2 bg-[#6C3BAA] text-white rounded disabled:opacity-50">
          {submitting ? "Submitting…" : "Submit Item"}
        </button>
      </form>
    </div>
  );
};

export default GiveItemForm;
