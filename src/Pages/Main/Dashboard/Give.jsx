import React, { useState, useEffect } from "react";
import { auth, db } from "../../../Authentication/Firebase";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CLOUD_NAME = "dcmzckthf";
const UPLOAD_PRESET = "givers";

const GiveItemForm = () => {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [itemStatus, setItemStatus] = useState("available");
  const [useSavedAddr, setUseSavedAddr] = useState(true);
  const [customAddr, setCustomAddr] = useState("");
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);

  const [userData, setUserData] = useState({
    uid: "",
    username: "",
    address: "",
  });

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
      itemName: setItemName,
      category: setCategory,
      description: setDescription,
      itemStatus: setItemStatus,
      locationChoice: (v) => setUseSavedAddr(v === "saved"),
      location: setCustomAddr,
    };
    map[name]?.(value);
  };

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreviewURL(URL.createObjectURL(f)); // local preview
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    if (!file) {
      toast.error("Please choose a photo");
      return;
    }

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
        giverId: userData.uid,
        giverName: userData.username,
        photoURL,
        createdAt: serverTimestamp(),
      });

      toast.success("Item submitted 🎉");
      /* reset */
      setItemName("");
      setCategory("");
      setDescription("");
      setItemStatus("available");
      setCustomAddr("");
      setFile(null);
      setPreviewURL("");
      setProgress(0);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="col-start-2 flex flex-col items-center dark:bg-black text-gray-900 dark:text-gray-200 h-screen lg:h-auto">
      <section className="w-full h-full bg-gradient-to-tl from-blue-400/35 via-transparent to-green-400/10 dark:to-green-400/10 p-5 flex flex-col justify-center items-center align-middle">
        <ToastContainer position="top-center" autoClose={3000} />
        <form
          onSubmit={handleSubmit}
          className="space-y-5 w-full max-w-md mx-auto"
        >
          <h2 className="text-xl font-bold text-center tracking-tight bg-clip-text bg-gradient-to-r from-green-400 to-blue-600 text-transparent">
            Give an Item
          </h2>

          <input
            name="itemName"
            value={itemName}
            onChange={handleChange}
            placeholder="Item name"
            required
            className="w-full border rounded p-2 text-gray-900 dark:text-gray-200 outline-1 -outline-offset-1 dark:outline-gray-300 dark:placeholder:text-gray-200/50 sm:text-sm/6"
          />

          <select
            name="category"
            value={category}
            onChange={handleChange}
            required
            className="w-full border rounded p-2 text-gray-900 dark:text-gray-200 outline-1 -outline-offset-1 dark:outline-gray-300 dark:placeholder:text-gray-200/50 sm:text-sm/6 *:dark:bg-black"
          >
            <option value="" disabled>
              Select category
            </option>
            {[
              "Clothes",
              "Books",
              "Furniture",
              "Electronics",
              "Toys",
              "Others",
            ].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <textarea
            name="description"
            value={description}
            required
            onChange={handleChange}
            placeholder="Describe the item"
            className="w-full border rounded p-2 min-h-[100px] text-gray-900 dark:text-gray-200 outline-1 -outline-offset-1 dark:outline-gray-300 dark:placeholder:text-gray-200/50 sm:text-sm/6 resize-none"
          />

          <select
            name="itemStatus"
            value={itemStatus}
            onChange={handleChange}
            className="w-full border rounded p-2 text-gray-900 dark:text-gray-200 outline-1 -outline-offset-1 dark:outline-gray-300 dark:placeholder:text-gray-200/50 sm:text-sm/6 *:dark:bg-black"
          >
            <option value="available">Available</option>
            <option value="taken">Taken</option>
          </select>

          {/* Address */}
          <div>
            <p className="text-sm font-medium mb-1">Choose location</p>
            <label className="flex items-center gap-2 mb-1">
              <input
                type="radio"
                name="locationChoice"
                value="saved"
                checked={useSavedAddr}
                onChange={handleChange}
              />
              Use my saved address
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="locationChoice"
                value="new"
                checked={!useSavedAddr}
                onChange={handleChange}
              />
              Enter new address
            </label>

            {!useSavedAddr && (
              <input
                name="location"
                value={customAddr}
                required
                onChange={handleChange}
                placeholder="Enter new address"
                className="w-full border rounded p-2 mt-2"
              />
            )}
          </div>

          {/* Image picker */}
          <div className="space-y-2">
            <label className="block font-semibold">Item photo</label>
            <input type="file" accept="image/*" onChange={handleFile} className="w-40 p-2 bg-gray-200 rounded-lg cursor-pointer text-blue-600" />
            {previewURL && (
              <img
                src={previewURL}
                alt="preview"
                className="h-32 w-32 object-cover rounded"
              />
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full justify-center rounded-md bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 px-3 py-1.5 text-sm/6 font-semibold text-white hover:cursor-pointer hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {submitting ? "Submitting…" : "Submit Item"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default GiveItemForm;
