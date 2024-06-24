"use client";
import HoverButtonWrapper from "@/components/HoverButtonWrapper.jsx";
import React from "react";
import {
  MdBathtub,
  MdDone,
  MdLocationOn,
  MdOutlineReply,
  MdBed,
} from "react-icons/md";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Map from "@/components/Map.jsx";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import ImageSlider from "@/components/ImageSlider";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "@/store/features/user/userSlice.js";

const Listing = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [allListings, setAllListings] = useState([]);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.user);
  //const [formData, setFormData] = useState(currentUser);

  useEffect(() => {
    const fetchListing = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const res = await fetch(`/server/listing/getone/${id}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          console.log("first");
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log("second");
      }
    };

    const fetchAllListings = async () => {
      try {
        const res = await fetch("/server/listing/getall");
        const data = await res.json();
        setAllListings(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch all listings", error);
        setAllListings([]);
      }
    };

    fetchListing();
    fetchAllListings();
  }, [id]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const divStyle = {
    display: isMobile ? "grid" : "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const containerStyles = {
    width: "100%",
    height: isMobile ? "30vh" : "70vh",
  };

  const addToFavourites = async () => {
    dispatch(updateUserStart);
    try {
      const res = await fetch(`../../server/user/favourites/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id}),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess({ ...currentUser, favourites: data.favourites }));
      alert(data.message);
    } catch (error) {
      dispatch(updateUserFailure(error));
      alert(error.message);
    }
  };

  return (
    <div>
      <div
        style={{
          marginLeft: "25px",
          marginTop: "100px",
          marginBottom: "25px",
          display: "flex",
          alignItems: "center",
          justifyContent: "left",
        }}
      >
        <HoverButtonWrapper>
          <button
            style={{
              padding: "12px",
              color: "#ffffff",
              borderRadius: "8px",
              background: "#2980b9",
              cursor: "pointer",
              opacity: "1",
            }}
            onClick={() => window.history.back()}
          >
            <MdOutlineReply />
          </button>
        </HoverButtonWrapper>
      </div>
      <div>
        {loading && (
          <p
            style={{ textAlign: "center", margin: "7rem 0", fontSize: "2rem" }}
          >
            Loading...
          </p>
        )}
        {error && (
          <p
            style={{ textAlign: "center", margin: "7rem 0", fontSize: "2rem" }}
          >
            Something went wrong!
          </p>
        )}
        {listing && !loading && !error && (
          <div>
            <div style={containerStyles}>
              <ImageSlider slides={listing.imageUrls} />
            </div>
            <hr
              style={{
                marginTop: "50px",
                border: "none",
                borderTop: "2px solid lightgrey",
                width: "100%",
              }}
            />
            <div style={divStyle}>
              <div style={{ padding: "20px" }}>
                <p
                  style={{
                    color: "#374151",
                    marginTop: "1rem",
                    fontSize: "2rem",
                  }}
                >
                  {listing.name}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <p
                    style={{
                      color: "#374151",
                      marginTop: "1rem",
                      fontSize: "1.5rem",
                    }}
                  >
                    <MdLocationOn style={{ color: "green" }} />{" "}
                    {listing.address}
                  </p>
                </div>
                <p style={{ color: "#374151", marginTop: "1rem" }}>
                  <span style={{ fontWeight: "bold", color: "black" }}>
                    Description -{" "}
                  </span>
                  {listing.description}
                </p>
                <div style={{ display: "flex" }}>
                  <p style={{ fontWeight: "bold", color: "black" }}>
                    Highlights -
                  </p>
                  <ul
                    style={{
                      color: "#34d399",
                      fontWeight: "bold",
                      fontSize: "0.875rem",
                      alignItems: "center",
                    }}
                  >
                    <li
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <MdBed />
                      {listing.bedrooms > 1
                        ? `${listing.bedrooms} bedrooms `
                        : `${listing.bedrooms} bedroom `}
                    </li>
                    <li
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <MdBathtub />
                      {listing.bathrooms > 1
                        ? `${listing.bathrooms} bathrooms `
                        : `${listing.bathrooms} bathroom `}
                    </li>
                    <li
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {listing.parking ? <MdDone /> : ""}
                      {listing.parking ? "Parking spot" : ""}
                    </li>
                    <li
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {listing.offer ? <MdDone /> : ""}
                      {listing.offer ? "Offer" : ""}
                    </li>
                  </ul>
                </div>
              </div>
              {currentUser.userType === "Customer" && (
                <div
                  style={{
                    width: "250px",
                    marginRight: "20px",
                    marginBottom: "20px",
                  }}
                >
                  <HoverButtonWrapper>
                    <button
                      style={{
                        fontFamily: '"Roboto", sans-serif',
                        textTransform: "uppercase",
                        outline: "0",
                        background: "#2980b9",
                        width: "100%",
                        border: "0",
                        padding: "15px",
                        color: "#FFFFFF",
                        fontSize: "14px",
                        WebkitTransition: "all 0.3s ease",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                        borderRadius: "50px",
                        marginBottom: "20px",
                      }}
                      onClick={addToFavourites}
                    >
                      Add to favourites
                    </button>
                  </HoverButtonWrapper>
                  <HoverButtonWrapper>
                    <button
                      style={{
                        fontFamily: '"Roboto", sans-serif',
                        textTransform: "uppercase",
                        outline: "0",
                        background: "#2980b9",
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
                      Buy now
                    </button>
                  </HoverButtonWrapper>
                </div>
              )}
            </div>
            {currentUser.userType === "Customer" && (
              <div>
                <Map
                  listings={allListings}
                  styleURL="mapbox://styles/mapbox/streets-v12"
                  highlightedListingId={id}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Listing;
