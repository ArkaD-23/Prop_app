"use client";
import styles from "./page.module.css";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks/hooks";
import HoverButtonWrapper from "@/components/HoverButtonWrapper";
import { useState, useEffect } from "react";
import ImageSlider from "@/components/ImageSlider";

export default function Home() {
  const { currentUser, loading } = useAppSelector((state) => state.user);
  const [listings, setListings] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [images, setImages] = useState([]);
  const linkToUser =
    currentUser && currentUser.userType === "Customer" ? "/search" : "/sell";
  const linkTo = currentUser ? linkToUser : "/signin";

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch("/server/listing/getall");
        const data = await res.json();
        console.log(data);
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

  useEffect(() => {
    if (listings.length < 6) {
      const imageUrls = listings.map((listing) => listing.imageUrls[0]);
      setImages(imageUrls);
    }
    else {
      const imageUrls = listings.map((listing) => listing.imageUrls[0].slice(0,6));
      setImages(imageUrls);
    }
  }, [listings]);

  const containerStyles = {
    width: "100%",
    height: isMobile ? "30vh" : "70vh",
  };

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.header}>
          Find your next <span className={styles.highlight}>perfect</span>
          <br />
          place with ease
        </h1>
        <div className={styles.description}>
          PropApp is the best place to find your next perfect place to live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link href={linkTo} style={{ textDecoration: "none", width: "200px" }}>
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
                WebkitTransition: "all 0.3 ease",
                transition: "all 0.3 ease",
                cursor: "pointer",
                borderRadius: "50px",
              }}
            >
              {loading ? "Loading...." : "Let's get started..."}
            </button>
          </HoverButtonWrapper>
        </Link>
      </div>
        <div style={containerStyles}>
          <ImageSlider slides={images} />
        </div>
    </>
  );
}
