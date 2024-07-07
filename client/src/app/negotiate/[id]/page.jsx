"use client";
import HoverButtonWrapper from "@/components/HoverButtonWrapper.jsx";
import React, { useState } from "react";
import { MdOutlineReply } from "react-icons/md";

const Negotiate = () => {

  const [loading, setLoading] = useState(false);
  
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
        Create Offer
      </h1>
      <form
        style={{ maxWidth: "400px", padding: "3% 0 0", margin: "0px auto" }}
      >
        <input
          id="email"
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
          placeholder="Buyer's email"
        />
        <input
          id="Price"
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
          type="number"
          placeholder="Price"
        />
        <HoverButtonWrapper>
            <button
              id="button"
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
                WebkitTransition: "all 0.3s ease",
                transition: "all 0.3s ease",
                cursor: "pointer",
                borderRadius: "50px",
              }}
            >
              {loading ? "Loading...." : "Place offer"}
            </button>
          </HoverButtonWrapper>
      </form>
    </div>
  );
};

export default Negotiate;
