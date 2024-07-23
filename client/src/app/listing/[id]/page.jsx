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
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
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
import Contact from "@/components/Contact";

const Listing = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [allListings, setAllListings] = useState([]);
  const [contact, setContact] = useState(false);
  const [negotiate, setNegotiate] = useState(false);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.user);
  const [formData, setFormData] = useState(null);
  const [messageHandler, setMessageHandler] = useState(false);
  const [message, setMessage] = useState(null);

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
    justifyContent: "space-around",
    gap: "2rem",
    marginBottom: "5rem",
  };

  const containerStyles = {
    width: isMobile ? "100%" : "60%",
    height: isMobile ? "30vh" : "70vh",
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const addToNegotiations = async () => {
    try {
      setLoading(true);
      dispatch(updateUserStart());
      const res = await fetch(
        `/server/user/addnegotiation/${currentUser._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            listingId: listing._id,
            Min_Price: formData.Min_Price,
            Max_Price: formData.Max_Price,
          }),
        }
      );
      const data = await res.json();
      if (data.success === false) {
        console.log(data);
        setMessage(data.message);
        setMessageHandler(true);
        dispatch(
          updateUserFailure({ ...currentUser, negotiations: data.negotiations })
        );
        setLoading(false);
        return;
      }
      console.log(data);
      setMessage(data.message);
      setMessageHandler(true);
      dispatch(
        updateUserSuccess({ ...currentUser, negotiations: data.negotiations })
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
      setMessage("Something went wrong !");
      setMessageHandler(true);
      dispatch(updateUserFailure(error));
      setLoading(false);
      return;
    }
  };

  const addToFavourites = async () => {
    dispatch(updateUserStart());
    if (currentUser.favourites.includes(id)) {
      try {
        const res = await fetch(`/server/user/remove/${currentUser._id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });
        const data = await res.json();
        console.log(data);
        if (data.success === false) {
          dispatch(updateUserFailure({ ...currentUser, data }));
          console.log(data);
          return;
        }
        dispatch(
          updateUserSuccess({ ...currentUser, favourites: data.favourites })
        );
        return;
      } catch (error) {
        console.log(error);
        dispatch(updateUserFailure(error));
      }
    }
    try {
      const res = await fetch(`/server/user/favourites/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        alert(data.message);
        return;
      }
      dispatch(
        updateUserSuccess({ ...currentUser, favourites: data.favourites })
      );
    } catch (error) {
      dispatch(updateUserFailure(error));
      alert(error.message);
    }
  };

  const pay = async () => {
    try {
      setPaymentLoading(true);
      const res = await fetch(`/server/listing/create-checkout-session/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: currentUser._id }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error from server:", errorData);
        alert("Something went wrong!");
        setPaymentLoading(false);
        return;
      }
      const data = await res.json();
      if (data.success === false) {
        alert("Something went wrong !");
        setPaymentLoading(false);
        return;
      }
      setPaymentLoading(false);
      window.location.href = data.url;
      return;
    } catch (error) {
      console.log(error);
      setPaymentLoading(false);
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
        {currentUser.userType === "Customer" && (
          <HoverButtonWrapper>
            <button
              title="Add to favourites"
              style={{
                padding: "12px",
                color: "#ffffff",
                borderRadius: "8px",
                background: "#2980b9",
                cursor: "pointer",
                opacity: 1,
              }}
              onClick={addToFavourites}
            >
              {currentUser.favourites.includes(id) ? (
                <IoMdHeart />
              ) : (
                <IoMdHeartEmpty />
              )}
            </button>
          </HoverButtonWrapper>
        )}
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
            <div style={divStyle}>
              <div style={containerStyles}>
                <ImageSlider slides={listing.imageUrls} />
              </div>
              {isMobile && (
                <hr
                  style={{
                    marginTop: isMobile ? "" : "50px",
                    border: "none",
                    borderTop: "2px solid lightgrey",
                    width: "100%",
                  }}
                />
              )}
              <div style={{ flex: "grid" }}>
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
                <div>
                  {currentUser.userType === "Customer" && (
                    <div
                      style={{
                        width: "250px",
                        marginRight: "20px",
                        marginBottom: "20px",
                        marginLeft: "20px",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            display: negotiate ? "grid" : "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <div style={{ width: negotiate ? "100%" : "45%" }}>
                            <HoverButtonWrapper>
                              <button
                                style={{
                                  marginBottom: "20px",
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
                                onClick={pay}
                              >
                                {paymentLoading ? "Please wait..." : "Buy now"}
                              </button>
                            </HoverButtonWrapper>
                          </div>
                          <div style={{ width: "45%" }}>
                            {!negotiate && (
                              <HoverButtonWrapper>
                                <button
                                  onClick={() => {
                                    setNegotiate(true);
                                    setMessageHandler(false);
                                  }}
                                  style={{
                                    marginBottom: "20px",
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
                                  Negotiate
                                </button>
                              </HoverButtonWrapper>
                            )}
                          </div>
                          {negotiate && (
                            <div>
                              <p>
                                Enter{" "}
                                <span style={{ fontWeight: "bold" }}>
                                  Price Range
                                </span>{" "}
                                for{" "}
                                <span style={{ fontWeight: "bold" }}>
                                  {listing.name.toLowerCase()}
                                </span>
                              </p>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <input
                                  id="Min_Price"
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
                                  type="text"
                                  placeholder="Min"
                                  onChange={handleChange}
                                />
                                <span style={{ fontWeight: "bold" }}>-</span>
                                <input
                                  id="Max_Price"
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
                                  type="text"
                                  placeholder="Max"
                                  onChange={handleChange}
                                />
                              </div>
                              <HoverButtonWrapper>
                                <button
                                  style={{
                                    marginBottom: "20px",
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
                                  onClick={addToNegotiations}
                                >
                                  {loading ? "Loading..." : "Place"}
                                </button>
                              </HoverButtonWrapper>
                              {messageHandler && <p style={{color:"green", marginBottom:"10px", marginLeft:"10px"}}>{message}</p>}
                            </div>
                          )}
                        </div>
                        {!contact && (
                          <HoverButtonWrapper>
                            <button
                              onClick={() => {
                                setContact(true);
                                setMessageHandler(false);
                              }}
                              style={{
                                marginBottom: "20px",
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
                              Contact Seller
                            </button>
                          </HoverButtonWrapper>
                        )}
                        {contact && (
                          <div>
                            <Contact listing={listing}/>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {currentUser.userType === "Customer" && (
              <div style={{ containerStyles }}>
                <p style={{ color: "lightgray", margin: "0px" }}>
                  *Hospitals, schools and banks in 1km of radius are highlighted
                  in green
                </p>
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
