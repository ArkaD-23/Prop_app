"use client";
import HoverButtonWrapper from "@/components/HoverButtonWrapper";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "@/store/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks.js";
import Link from "next/link";
import { MdOutlineReply } from "react-icons/md";
import React, { useState, useEffect } from "react";

const Negotiations = () => {
  const dispatch = useAppDispatch();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAppSelector((state) => state.user);
  const [isMobile, setIsMobile] = useState(false);
  const [isNegotiated, setIsNegotiated] = useState(false);

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

  const removeNegotiation = async (id) => {
    dispatch(updateUserStart());
    try {
      const res = await fetch(
        `/server/user/remove-negotiation/${currentUser._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id }),
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        console.log(data);
        dispatch(updateUserFailure(...currentUser, data));
        return;
      }
      dispatch(
        updateUserSuccess({ ...currentUser, negotiations: data.negotiations })
      );
      return;
    } catch (error) {
      console.log(error);
      dispatch(updateUserFailure(error));
      return;
    }
  };

  return (
    <div>
      <div
        style={{
          marginLeft: "20px",
          marginRight: "20px",
          marginTop: "100px",
          marginBottom: "25px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <HoverButtonWrapper>
          <button
            title="Back"
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
      <h1
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          //marginTop: "50px",
        }}
      >
        My Negotiations
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
              if (currentUser.negotiations.includes(listing._id)) {
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
                        <p
                          style={{
                            wordWrap: "break-word",
                            overflowWrap: "break-word",
                            whiteSpace: "normal",
                          }}
                        >
                          {listing.name}
                        </p>
                      </Link>
                      <div
                        style={{
                          display: "flex",
                          //flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "10px",
                        }}
                      >
                        {currentUser.username in listing.offerPriceMap ? (
                          <p style={{ color: "green" }}>Accepted</p>
                        ) : (
                          <p style={{ color: "#8B8000" }}>Pending</p>
                        )}
                        <button
                          onClick={() => removeNegotiation(listing._id)}
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
              } else {
                return <div></div>;
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Negotiations;
