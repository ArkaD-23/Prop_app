"use client";
import { useAppSelector } from "@/store/hooks/hooks.js";
import Link from "next/link";
import React from "react";
import { Navbarmenu } from "@/components/Navbarmenu.jsx";

export const Navbar = () => {
  const { currentUser } = useAppSelector((state) => state.user);

  return (
    <div
      style={{
        zIndex: "100",
        position: "fixed",
        left: "0",
        top: "0",
        width: "100%",
        background: "#2980b9",
        boxShadow: "0 5px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/*<Navbarmenu />*/}
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
      </div>
    </div>
  );
};
