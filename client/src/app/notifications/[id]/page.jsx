"use client";
import HoverButtonWrapper from "@/components/HoverButtonWrapper";
import { updateUserFailure, updateUserStart, updateUserSuccess } from "@/store/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import React, { useEffect, useState } from "react";
import { MdOutlineReply , MdClear } from "react-icons/md";

const Notificaions = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { currentUser } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

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

  const removeNotification = async (key) => {
    dispatch(updateUserStart());
    try {
      const res = await fetch("/server/user/remove-notification", {
        method:"POST",
        headers:{
          "Content-type" : "application/json",
        },
        body:JSON.stringify({id : currentUser._id, notificationId : key}) 
      });
      const data = await res.json();
      if(data.success === false) {
        console.log(data);
        dispatch(updateUserFailure({...currentUser, data}));
        return;
      }
      console.log(data);
      dispatch(updateUserSuccess({...currentUser, priceRangeMap:data.priceRangeMap}));
    } catch (error) {
      console.log(error);
      dispatch(updateUserFailure(error));
    }
  }

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
              <MdClear onClick={() => removeNotification(key)} style={{color:"red", fontSize:isMobile ? "60px":"30px", margin:"0"}}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notificaions;
