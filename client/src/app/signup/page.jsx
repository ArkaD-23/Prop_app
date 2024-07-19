"use client";
import { useRouter } from "next/navigation";
import React, { useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signUpStart,
  signUpSuccess,
  signUpFailure,
  signInStart,
  signInSuccess,
  signInFailure,
} from "@/store/features/user/userSlice.js";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks.js";
import HoverButtonWrapper from "@/components/HoverButtonWrapper";
import {
  DisableVisibility,
  EnableVisibility,
} from "@/components/PasswordVisibility";

export default function Signup() {
  const [formData, setFormData] = useState({});
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentUser, error, loading } = useAppSelector((state) => state.user);
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    if (currentUser) {
      router.push("/");
    } 
    else setIsLoading(false);
  }, [currentUser, router]);

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signUpStart());
      const res = await fetch("../../server/auth/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signUpFailure(data));
        return;
      }
      dispatch(signUpSuccess(data));
      try {
        dispatch(signInStart());
        const res = await fetch("../../server/auth/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success === false) {
          dispatch(signInFailure(data));
          return;
        }
        dispatch(signInSuccess(data));
        router.push("/");
      } catch (error) {
        dispatch(signInFailure(error));
      }
    } catch (error) {
      dispatch(signUpFailure(error));
    }
  };

  return (
    <div style={{ maxWidth: "400px", padding: "8% 0 0", margin: "100px auto" }}>
      <div
        style={{
          padding: "45px",
          paddingBottom: "70px",
          background: "#FFFFFF",
          margin: "0, auto 100px",
          textAlign: "center",
          boxShadow:
            "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "1.6em" }}>SIGNUP</h1>
        <form onSubmit={handleSubmit}>
          <input
            id="username"
            onChange={handleChange}
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
            placeholder="username"
          />
          <input
            id="email"
            onChange={handleChange}
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
            type="email"
            placeholder="email"
          />
          <input
            id="contact_no"
            onChange={handleChange}
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
            placeholder="contact no"
          />
          <select
            id="userType"
            onChange={handleChange}
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
          >
            <option value="">What are you here for?</option>
            <option value="Realtor">To Sell</option>
            <option value="Customer">To Buy</option>
          </select>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#f2f2f2",
              width: "100%",
              border: "0",
              padding: "15px",
              boxSizing: "border-box",
              fontSize: "14px",
              borderRadius: "50px",
              fontFamily: "Roboto",
            }}
          >
            <input
              id="password"
              onChange={handleChange}
              style={{
                border: "0",
                background: "#f2f2f2",
                outline: "0",
                //margin: "0 0 15px",
              }}
              type={visible ? "text" : "password"}
              placeholder="password"
            />
            <div
              onClick={(e) => {
                e.preventDefault();
                setVisible(!visible);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setVisible(!visible);
                }
              }}
              tabIndex="0"
              role="button"
              style={{ outline: "0", border: "0" }}
            >
              {visible ? <EnableVisibility /> : <DisableVisibility />}
            </div>
          </div>
          <p
            style={{
              margin: "0px 10px 15px",
              fontSize: "10px",
              fontWeight: "1",
              textAlign: "left",
              opacity: "0.5",
            }}
          >
            Your password should be atleast: 8 characters long, contains atleast
            a uppercase, a lowercase, a number and a special character and no
            spacing
          </p>

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
              {loading ? "Loading...." : "Signup"}
            </button>
          </HoverButtonWrapper>
          {error ? (
            <p style={{ color: "#C53030", fontSize: "14px" }}>{error.message}</p>
          ) : ""}
        </form>
      </div>
    </div>
  );
}
