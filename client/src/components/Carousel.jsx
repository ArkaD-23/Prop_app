import React, { useEffect, useState } from "react";
import Propcard from "./Propcard";
import { useAppSelector } from "@/store/hooks/hooks";
import Link from "next/link";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allListings, setAllListings] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const {currentUser} = useAppSelector((state) => state.user); 

  useEffect(() => {
    const fetchAllListings = async () => {
      try {
        const res = await fetch("/server/listing/getall");
        const data = await res.json();
        setAllListings(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch all listings", error);
        setAllListings([]);
      }
    };
    fetchAllListings();
  }, []);

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

  const next = () => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = isMobile ? allListings.length - 1 : allListings.length - 3;
      return prevIndex === maxIndex ? 0 : prevIndex + 1;
    });
  };

  const prev = () => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = isMobile ? allListings.length - 1 : allListings.length - 3;
      return prevIndex === 0 ? maxIndex : prevIndex - 1;
    });
  };

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "80%",
        margin: "0 auto",
      }}
    >
      <button
        onClick={prev}
        style={{
          //position: "absolute",
          left: "0",
          zIndex: "1",
          backgroundColor: "transparent",
          border: "none",
          fontSize: "2rem",
          cursor: "pointer",
        }}
      >
        &#9664;
      </button>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: isMobile ? "" : "100%",
        }}
      >
        {allListings.slice(currentIndex, currentIndex + (isMobile ? 1 : 3)).map((listing) => (
          <>
          {currentUser ? 
            <Link style={{textDecoration: "none"}} href={`/listing/${listing._id}`}>
              <Propcard key={listing._id} listing={listing} />
            </Link> : 
            <Link style={{textDecoration: "none"}} href="/signin">
              <Propcard key={listing._id} listing={listing} />
            </Link>}
          </>
        ))}
      </div>
      <button
        onClick={next}
        style={{
          //position: "absolute",
          right: "0",
          zIndex: "1",
          backgroundColor: "transparent",
          border: "none",
          fontSize: "2rem",
          cursor: "pointer",
        }}
      >
        &#9654;
      </button>
    </div>
  );
};

export default Carousel;
