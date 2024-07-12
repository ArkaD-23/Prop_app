"use client";
import HoverButtonWrapper from "@/components/HoverButtonWrapper";
import { useAppSelector } from "@/store/hooks/hooks";
import React, { useEffect, useState } from "react";
import { MdOutlineReply , MdClear } from "react-icons/md";

const Notificaions = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [listings, setListings] = useState({});
  const { currentUser } = useAppSelector((state) => state.user);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch("/server/listing/getall");
        const data = await res.json();
        console.log(data);
        console.log(currentUser.priceRangeMap)
        setListings(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching listings:", error);
        setListings([]);
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
          //marginTop: "150px",
        }}
      >
        Notifications
      </h1>
      <div>
        <div style={cardStyle}>
          {Object.entries(currentUser.priceRangeMap).map(([key, value]) => (
            <div
              key={key} // It's important to provide a unique key for each element
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
              <span style={{margin:"0"}}>{value}</span>
              <MdClear onClick={removeNotification} style={{color:"red", fontSize:"50px", margin:"0"}}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notificaions;
