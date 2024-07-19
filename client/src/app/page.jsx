"use client";
import styles from "./page.module.css";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks/hooks";
import HoverButtonWrapper from "@/components/HoverButtonWrapper";
import { useState, useEffect } from "react";
import ImageSlider from "@/components/ImageSlider";
import Carousel from "@/components/Carousel";
import Footer from "@/components/Footer";

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
    } else {
      const imageUrls = listings.map((listing) =>
        listing.imageUrls[0].slice(0, 6)
      );
      setImages(imageUrls);
    }
  }, [listings]);

  const containerStyles = {
    width: "100%",
    height: isMobile ? "30vh" : "80vh",
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
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
          <Link
            href={linkTo}
            style={{ textDecoration: "none", width: "200px" }}
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
        {!isMobile && (
          <div style={{ width: "45%", marginTop: "80px", marginRight: "50px" }}>
            <img
              src="landingpage.jpg"
              alt="home"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        )}
      </div>
      <div>
        <div>
          <h1
            style={{
              color: "#334155",
              fontWeight: "bold",
              fontSize: isMobile ? "20px" : "35px",
              textAlign: "center",
            }}
          >
            Explore Homes on PropApp
          </h1>
          <p
            style={{
              textAlign: "center",
              color: "#9ca3af",
              fontSize: isMobile ? "0.6rem" : "0.90rem",
            }}
          >
            Take a deep dive and browse homes for sale, original neighborhood
            photos and local insights to find what is right for you.
          </p>
        </div>
        <div style={containerStyles}>
          <ImageSlider slides={images} />
        </div>
      </div>
      <div style={{ marginTop: "80px" }}>
        <div>
          <h1
            style={{
              color: "#334155",
              fontWeight: "bold",
              fontSize: isMobile ? "20px" : "35px",
              textAlign: "center",
            }}
          >
            Newly Listed
          </h1>
        </div>
        <Carousel />
      </div>
      <div style={{ marginTop: "80px" }}>
        <div>
          <h1
            style={{
              color: "#334155",
              fontWeight: "bold",
              fontSize: isMobile ? "20px" : "35px",
              textAlign: "center",
            }}
          >
            See how PropApp can help
          </h1>
          <div style={{display:isMobile?"grid":"flex", justifyContent:"center", alignItems:"center", width:"100%", marginBottom:"80px", gap:isMobile?"":"200px"}}>
            <div style={{display:"grid", width:"230px", textAlign:"center", marginBottom:isMobile?"30px":""}}>
              <h2 style={{color: "#6B7280", height:"70px", margin:"0", fontSize:isMobile?"15px":""}}>Buy a home</h2>
              <p style={{color: "#9ca3af", margin:"0", fontSize: isMobile ? "0.7rem" : "1rem"}}>With over 1 million+ homes for sale available on the website, PropApp can match you with a house you will want to call home.</p>
            </div>
            <div style={{display:"grid", width:"230px", textAlign:"center"}}>
              <h2 style={{color: "#6B7280", height:"70px", margin:"0", fontSize:isMobile?"15px":""}}>See neighborhoods</h2>
              <p style={{color: "#9ca3af", margin:"0", fontSize: isMobile ? "0.7rem" : "1rem"}}>With the search functionality you can look for listings in your neighbourhood, use address or pin code to search.</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
