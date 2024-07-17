import React, { useEffect, useState } from "react";
import Propcard from "./Propcard";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allListings, setAllListings] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

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

  const cards = [
    { id: 1, title: "Card 1", content: "Content for card 1" },
    { id: 2, title: "Card 2", content: "Content for card 2" },
    { id: 3, title: "Card 3", content: "Content for card 3" },
    { id: 4, title: "Card 4", content: "Content for card 4" },
    { id: 5, title: "Card 5", content: "Content for card 5" },
    { id: 6, title: "Card 6", content: "Content for card 6" },
  ];

  const next = () => {
    setCurrentIndex((prevIndex) => {
      if (isMobile) {
        prevIndex === cards.length - 2 ? 0 : prevIndex + 1;
      } else {
        prevIndex === cards.length - 3 ? 0 : prevIndex + 1;
      }
    });
  };

  const prev = () => {
    setCurrentIndex((prevIndex) => {
      if (isMobile) {
        prevIndex === 0 ? cards.length - 2 : prevIndex - 1;
      } else {
        prevIndex === 0 ? cards.length - 3 : prevIndex - 1;
      }
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
          width: "100%",
        }}
      >
        {allListings.slice(currentIndex, currentIndex + 3).map((listing) => (
          <Propcard key={listing._id} listing={listing} />
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
