"use client";
import { useAppSelector } from "@/store/hooks/hooks.js";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export const Navbar = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const [isMobile, setIsMobile] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

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

  return (
    <div
      style={{
        zIndex: "100",
        position: "fixed",
        left: "0",
        top: "0",
        width: window.innerWidth,
        background: "#2980b9",
        boxShadow: "0 5px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "100%",
          maxWidth: "90%",
          background: "#2980b9",
          margin: "auto",
        }}
      >
        <Link title="Home" style={{ textDecoration: "none" }} href="/">
          <h1 style={{ color: "azure", fontSize: "27px", fontWeight: "600" }}>
            PropApp
          </h1>
        </Link>
        {isMobile ? (
          <>
            {currentUser && (
              <>
                <button
                  onClick={toggleDropdown}
                  style={{
                    background: "none",
                    border: "none",
                    color: "azure",
                    fontSize: "20px",
                    cursor: "pointer",
                    fontSize: "27px",
                  }}
                >
                  ☰
                </button>

                <ul
                  style={{
                    display: dropdownVisible ? "block" : "none",
                    listStyle: "none",
                    fontWeight: "600",
                    position: "absolute",
                    top: "60px",
                    left: "0px",
                    width: "100%",
                    backgroundColor: "#2980b9",
                    textAlign: "center",
                    padding: "10px 0",
                  }}
                >
                  {currentUser.userType === "Customer" && (
                    <>
                      <Link
                        href="/search"
                        onClick={toggleDropdown}
                        style={{ textDecoration: "none" }}
                      >
                        <li style={{ color: "azure", margin: "10px 0" }}>
                          Buy
                        </li>
                      </Link>
                      <hr style={{ color: "#ffffff" }} />
                      <Link
                        href={`/negotiations/${currentUser._id}`}
                        onClick={toggleDropdown}
                        style={{ textDecoration: "none" }}
                      >
                        <li style={{ color: "azure", margin: "10px 0" }}>
                          Negotiations
                        </li>
                      </Link>
                      <hr style={{ color: "#ffffff" }} />
                      <Link
                        href={`/favourites/${currentUser._id}`}
                        onClick={toggleDropdown}
                        style={{ textDecoration: "none" }}
                      >
                        <li style={{ color: "azure", margin: "10px 0" }}>
                          Favourites
                        </li>
                      </Link>
                      <hr style={{ color: "#ffffff" }} />
                    </>
                  )}
                  {currentUser.userType === "Realtor" && (
                    <>
                      <Link
                        href="/sell"
                        onClick={toggleDropdown}
                        style={{ textDecoration: "none" }}
                      >
                        <li style={{ color: "azure", margin: "10px 0" }}>
                          Sell
                        </li>
                      </Link>
                      <hr style={{ color: "#ffffff" }} />
                      <Link
                        href={`/alllistings/${currentUser._id}`}
                        onClick={toggleDropdown}
                        style={{ textDecoration: "none" }}
                      >
                        <li style={{ color: "azure", margin: "10px 0" }}>
                          Listings
                        </li>
                      </Link>
                      <hr style={{ color: "#ffffff" }} />
                      <Link
                        href={`/notifications/${currentUser._id}`}
                        onClick={toggleDropdown}
                        style={{ textDecoration: "none" }}
                      >
                        <li style={{ color: "azure", margin: "10px 0" }}>
                          Notifications
                        </li>
                      </Link>
                      <hr style={{ color: "#ffffff" }} />
                    </>
                  )}

                  {currentUser && (
                    <Link
                      style={{ textDecoration: "none" }}
                      href={`/profile/${currentUser._id}`}
                      onClick={toggleDropdown}
                    >
                      <li style={{ color: "azure", margin: "10px 0" }}>
                        Profile
                      </li>
                    </Link>
                  )}
                </ul>
              </>
            )}
            {!currentUser && (
              
              <Link
                style={{ textDecoration: "none" }}
                href="/signin"
                //onClick={toggleDropdown}
              >
                <li style={{ color: "azure", margin: "10px 0", listStyle:"none", fontWeight: "600"}}>Signin</li>
              </Link>
            )}
          </>
        ) : (
          <ul style={{ display: "flex", listStyle: "none", fontWeight: "600" }}>
            {currentUser && (
              <>
                {currentUser.userType === "Customer" && (
                  <>
                    <Link href="/search" style={{ textDecoration: "none" }}>
                      <li style={{ color: "azure", margin: "0 15px" }}>Buy</li>
                    </Link>
                    <Link
                      href={`/negotiations/${currentUser._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <li style={{ color: "azure", margin: "0 15px" }}>
                        Negotiations
                      </li>
                    </Link>
                    <Link
                      href={`/favourites/${currentUser._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <li style={{ color: "azure", margin: "0 15px" }}>
                        Favourites
                      </li>
                    </Link>
                  </>
                )}
                {currentUser.userType === "Realtor" && (
                  <>
                    <Link href="/sell" style={{ textDecoration: "none" }}>
                      <li style={{ color: "azure", margin: "0 15px" }}>Sell</li>
                    </Link>
                    <Link
                      href={`/alllistings/${currentUser._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <li style={{ color: "azure", margin: "0 15px" }}>
                        Listings
                      </li>
                    </Link>
                    <Link
                      href={`/notifications/${currentUser._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <li style={{ color: "azure", margin: "0 15px" }}>
                        Notifications
                      </li>
                    </Link>
                  </>
                )}
              </>
            )}

            {currentUser ? (
              <Link
                style={{ textDecoration: "none" }}
                href={`/profile/${currentUser._id}`}
              >
                <li style={{ color: "azure", margin: "0 15px" }}>Profile</li>
              </Link>
            ) : (
              <Link style={{ textDecoration: "none" }} href="/signin">
                <li style={{ color: "azure", margin: "0 15px" }}>Signin</li>
              </Link>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};
