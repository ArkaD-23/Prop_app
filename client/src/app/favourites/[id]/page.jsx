"use client"
import HoverButtonWrapper from "@/components/HoverButtonWrapper";
import { useAppSelector } from "@/store/hooks/hooks.js";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const FavouriteListings = () => {
  let count = 0;
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAppSelector((state) => state.user);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const res = await fetch("/server/listing/getall");
        const data = await res.json();
        console.log(data);
        setListings(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching listings:", error);
        setListings([]);
        setLoading(false);
      }
    };
    fetchListings();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    margin: isMobile ? "20px 20px" : "30px 22%",
  };
  return (
    <div>
      <h1
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "150px",
        }}
      >
        My Favourites
      </h1>
      <div>
        {loading ? (
          <h3
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "150px",
              color: "grey",
            }}
          >
            Loading...
          </h3>
        ) : (
          ""
        )}
      </div>
      <div>
        {listings && listings.length > 0 && (
          <div style={cardStyle}>
            {listings.map((listing) => {
              if (currentUser.favourites.includes(listing._id)) {
                count++;
                return (
                  <HoverButtonWrapper>
                    <div
                      key={listing._id}
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "0.5rem",
                        padding: "0.75rem",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <Link href={`/listing/${listing._id}`}>
                        <img
                          src={listing.imageUrls[0]}
                          alt="listing cover"
                          style={{
                            height: "4rem",
                            width: "4rem",
                            objectFit: "contain",
                          }}
                        />
                      </Link>
                      <Link
                        href={`/listing/${listing._id}`}
                        style={{
                          color: "#4a5568",
                          fontWeight: "600",
                          textDecoration: "none",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          flex: "1",
                        }}
                      >
                        <p>{listing.name}</p>
                      </Link>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <button
                          onClick={() => handleListingDelete(listing._id)}
                          style={{
                            color: "#c53030",
                            textTransform: "uppercase",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </HoverButtonWrapper>
                );
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavouriteListings;
