"use client";
import HoverButtonWrapper from "@/components/HoverButtonWrapper";
import { useAppSelector } from "@/store/hooks/hooks";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const AllListings = () => {
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

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/server/listing/delete/${listingId}`, {
        method:"DELETE"
      });
      const data = res.json();
      if(data.success === false) {
        alert("Something went wrong!");
        return;
      };
      setListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

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
        My Listings
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
              if (listing.Realtor === currentUser.username) {
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
                          Delete
                        </button>
                        <Link href={`/updatelisting/${listing._id}`}>
                          <button
                            style={{
                              color: "#38a169",
                              textTransform: "uppercase",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                            }}
                          >
                            Edit
                          </button>
                        </Link>
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

export default AllListings;
