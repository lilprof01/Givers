import React, { useState, useEffect } from "react";
import { auth, db, storage } from "../../../Authentication/Firebase";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
// import { v4 as uuid } from "uuid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GiveItemForm = () => {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [itemStatus, setItemStatus] = useState("available");
  const [useSavedAddress, setUseSavedAddress] = useState(true);
  const [customAddress, setCustomAddress] = useState("");
  const [itemPhoto, setItemPhoto] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "itemName":
        setItemName(value);
        break;
      case "category":
        setCategory(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "itemStatus":
        setItemStatus(value);
        break;
      case "locationChoice":
        setUseSavedAddress(value === "saved");
        break;
      case "location":
        setCustomAddress(value);
        break;
      default:
        break;
    }
  };

  const [userData, setUserData] = useState({
    uid: "",
    username: "",
    address: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (!fbUser) return;
      const snap = await getDoc(doc(db, "users", fbUser.uid));
      if (snap.exists()) {
        const { username = "", address = "" } = snap.data();
        setUserData({ uid: fbUser.uid, username, address });
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return; // guard against double‑click
    setSubmitting(true);

    // try {
    //   let photoURL = "";

    //   // 1. Upload image if user picked one
    //   if (itemPhoto) {
    //     const storageRef = ref(
    //       storage,
    //       `itemImages/${userData.uid}/${uuid()}-${itemPhoto.name}`
    //     );
    //     // await uploadBytes(storageRef, itemPhoto);
    //     // photoURL = await getDownloadURL(storageRef);
    //   }

      // 2. Write Firestore document
      await addDoc(collection(db, "give"), {
        itemName,
        category,
        description,
        itemStatus,
        location: useSavedAddress ? userData.address : customAddress,
        giverId: userData.uid,
        giverName: userData.username,
        photoURL, // <-- download link
        createdAt: serverTimestamp(),
      });
      console.log("Wrote document with id:", docRef.id);  // <= add this

      alert("Item submitted! 🎉");
      // reset form
      setItemName("");
      setCategory("");
      setDescription("");
      setItemPhoto(null);
      setCustomAddress("");
      setItemStatus("available");
    } catch (err) {
      console.error("Upload failed:", err);
      alert(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="col-start-2 p-16 transition-all duration-300 flex flex-col justify-start items-center text-center align-middle gap-8 dark:bg-[#121212] mt-20 sm:mt-0">
      <>
        <ToastContainer position="top-center" autoClose={3000} />
        <form
          onSubmit={handleSubmit}
          className="space-y-6 w-full max-w-md mx-auto p-4"
        >
          <h2 className="text-xl font-bold text-center text-[#6C3BAA]">
            Give an Item
          </h2>

          {/* Item Name */}
          <input
            type="text"
            name="itemName"
            value={itemName}
            onChange={handleChange}
            required
            placeholder="Item Name"
            className="w-full px-3 py-2 border rounded-md"
          />

          {/* Category */}
          <select
            name="category"
            value={category}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="Clothes">Clothes</option>
            <option value="Books">Books</option>
            <option value="Furniture">Furniture</option>
            <option value="Electronics">Electronics</option>
            <option value="Toys">Toys</option>
            <option value="Others">Others</option>
          </select>

          {/* Description */}
          <textarea
            name="description"
            value={description}
            onChange={handleChange}
            required
            placeholder="Describe the item"
            className="w-full px-3 py-2 border rounded-md min-h-[100px]"
          />

          {/* Status */}
          <select name="itemStatus" value={itemStatus} onChange={handleChange}>
            <option value="available">Available</option>
            <option value="taken">Taken</option>
          </select>

          {/* Location Choice */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Choose Location</p>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="locationChoice"
                  value="saved"
                  checked={useSavedAddress}
                  onChange={handleChange}
                />
                Use My Saved Address
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="locationChoice"
                  value="new"
                  checked={!useSavedAddress}
                  onChange={handleChange}
                />
                Enter New Address
              </label>
            </div>

            {!useSavedAddress && (
              <input
                type="text"
                name="location"
                value={customAddress}
                onChange={handleChange}
                placeholder="Enter New Address"
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            )}
          </div>
          <div>
            <label className="block font-semibold mb-1">Item photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setItemPhoto(e.target.files[0])}
            />
          </div>
          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#6C3BAA] text-white rounded-md hover:opacity-90"
          >
            Submit Item
          </button>
        </form>
      </>
    </div>
  );
};

export default GiveItemForm;
