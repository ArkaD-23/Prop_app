"use client";
import React, { useState } from "react";
import { useAppSelector } from "@/store/hooks/hooks.js";
import axios from "axios";
import styles from "./sell.module.css";
import HoverButtonWrapper from "@/components/HoverButtonWrapper";
import { MdDelete } from "react-icons/md";

const Sell = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    bedrooms: 1,
    bathrooms: 1,
    Price: 50,
    offer: false,
    parking: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files)); // Ensure files is an array
  };

  const handleImageSubmit = async () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);

      try {
        const urls = await Promise.all(files.map((file) => storeImage(file)));
        setFormData((prevState) => ({
          ...prevState,
          imageUrls: prevState.imageUrls.concat(urls),
        }));
        setImageUploadError(false);
      } catch (error) {
        console.error("Image upload error: ", error);
        setImageUploadError("Image upload failed (2 mb max per image)");
      } finally {
        setUploading(false);
      }
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    );

    try {
      const response = await axios.post(url, formData);
      const data = response.data;
      if (data.secure_url) {
        return data.secure_url;
      } else {
        throw new Error(
          data.error.message || "Failed to upload image to Cloudinary"
        );
      }
    } catch (error) {
      throw error;
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      imageUrls: prevState.imageUrls.filter((_, i) => i !== index),
    }));
  };

  const handleChange = (e) => {
    const { id, value, checked, type } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const encodedAddress = encodeURIComponent(formData.address);
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}&limit=1`;

      const response = await fetch(url);

      if (!response.ok) {
        alert("Something went wrong!");
      }

      const data = await response.json();

      if (data.features.length === 0) {
        alert("Location not found");
      }

      const coordinates = {
        latitude: data.features[0].center[1],
        longitude: data.features[0].center[0],
      };

      if (formData.imageUrls.length < 1)
        return setError("You must upload at least one image");
      setLoading(true);
      setError(false);
      const res = await fetch("/server/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          Realtor: currentUser.username,
          userRef: currentUser._id,
          coordinates: {
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
          },
        }),
      });
      const datas = await res.json();
      console.log(datas)
      setLoading(false);
      if (!datas.success) {
        setError(datas.message);
        console.log(error);
        return;
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: "12px", maxWidth: "1024px", margin: "150px auto" }}>
      <h1
        style={{
          fontSize: "1.875rem",
          fontWeight: "600",
          textAlign: "center",
          margin: "28px 0",
          color:"#334155"
        }}
      >
        Create a Listing
      </h1>
      <form onSubmit={handleSubmit} className={styles.container}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            flex: "1",
          }}
        >
          <input
            type="text"
            placeholder="Name"
            id="name"
            maxLength="62"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.name}
            style={{
              fontFamily: "Roboto",
              outline: "0",
              background: "#f2f2f2",
              width: "100%",
              border: "0",
              margin: "0 0 15px",
              padding: "15px",
              boxSizing: "border-box",
              fontSize: "14px",
              borderRadius: "50px",
            }}
          />
          <textarea
            placeholder="Description"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
            style={{
              fontFamily: "Roboto",
              outline: "0",
              background: "#f2f2f2",
              width: "100%",
              border: "0",
              margin: "0 0 15px",
              padding: "15px",
              boxSizing: "border-box",
              fontSize: "14px",
              borderRadius: "50px",
            }}
          />
          <input
            type="text"
            placeholder="Address"
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
            style={{
              fontFamily: "Roboto",
              outline: "0",
              background: "#f2f2f2",
              width: "100%",
              border: "0",
              margin: "0 0 15px",
              padding: "15px",
              boxSizing: "border-box",
              fontSize: "14px",
              borderRadius: "50px",
            }}
          />
          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="checkbox"
                id="parking"
                style={{ width: "20px" }}
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking spot</span>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="checkbox"
                id="offer"
                style={{ width: "20px" }}
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="text"
                id="bedrooms"
                onChange={handleChange}
                value={formData.bedrooms}
                style={{
                  fontFamily: "Roboto",
                  outline: "0",
                  background: "#f2f2f2",
                  width: "100%",
                  border: "0",
                  margin: "0 0 15px",
                  padding: "15px",
                  boxSizing: "border-box",
                  fontSize: "14px",
                  borderRadius: "50px",
                }}
              />
              <p>Bedroom(s)</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="text"
                id="bathrooms"
                onChange={handleChange}
                value={formData.bathrooms}
                style={{
                  fontFamily: "Roboto",
                  outline: "0",
                  background: "#f2f2f2",
                  width: "100%",
                  border: "0",
                  margin: "0 0 15px",
                  padding: "15px",
                  boxSizing: "border-box",
                  fontSize: "14px",
                  borderRadius: "50px",
                }}
              />
              <p>Bathroom(s)</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="text"
                id="Price"
                onChange={handleChange}
                value={formData.Price}
                style={{
                  fontFamily: "Roboto",
                  outline: "0",
                  background: "#f2f2f2",
                  width: "100%",
                  border: "0",
                  margin: "0 0 15px",
                  padding: "15px",
                  boxSizing: "border-box",
                  fontSize: "14px",
                  borderRadius: "50px",
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <p>Price (Rs.)</p>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: "1",
            gap: "16px",
          }}
        >
          <p style={{ fontWeight: "600" }}>
            Images:
            <span
              style={{ fontWeight: "400", color: "#718096", marginLeft: "8px" }}
            >
              The first image will be the cover (max 6)
            </span>
          </p>
          <div style={{ display: "flex", gap: "16px" }}>
            <input
              onChange={handleFileChange}
              type="file"
              id="images"
              accept="image/*"
              multiple
              style={{
                padding: "12px",
                border: "1px solid #D1D5DB",
                borderRadius: "8px",
                width: "100%",
              }}
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              style={{
                padding: "12px",
                color: "#2F855A",
                border: "1px solid #2F855A",
                borderRadius: "8px",
                textTransform: "uppercase",
                cursor: uploading ? "not-allowed" : "pointer",
                opacity: uploading ? "0.8" : "1",
                boxShadow: uploading
                  ? "none"
                  : "0px 2px 8px rgba(0, 0, 0, 0.15)",
              }}
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <p style={{ color: "#C53030", fontSize: "14px" }}>
            {imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "12px",
                  border: "1px solid #E2E8F0",
                  alignItems: "center",
                }}
              >
                <img
                  src={url}
                  alt="listing image"
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  style={{
                    padding: "12px",
                    color: "#C53030",
                    borderRadius: "8px",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    opacity: "1",
                  }}
                >
                  <MdDelete />
                </button>
              </div>
            ))}
          <HoverButtonWrapper>
            <button
              disabled={loading || uploading}
              style={{
                fontFamily: '"Roboto", sans-serif',
                textTransform: "uppercase",
                outline: "0",
                background: "green",
                width: "100%",
                border: "0",
                padding: "15px",
                color: "#FFFFFF",
                fontSize: "14px",
                WebkitTransition: "all 0.3s ease",
                transition: "all 0.3s ease",
                cursor: "pointer",
                borderRadius: "50px",
              }}
            >
              {loading ? "Creating..." : "Create listing"}
            </button>
          </HoverButtonWrapper>
          {error && (
            <p style={{ color: "#C53030", fontSize: "14px" }}>{error}</p>
          )}
        </div>
      </form>
    </main>
  );
};

export default Sell;
