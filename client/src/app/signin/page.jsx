"use client";
import Link from "next/link";
import React, { useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
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

export default function Signin() {
  const [formData, setFormData] = useState({});
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentUser, loading, error } = useAppSelector((state) => state.user);
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    if (currentUser) {
      router.push('/');
    } else {
      setIsLoading(false);
    }
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
      dispatch(signInStart());
      const res = await fetch("../../server/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      router.push("/");
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  return (
    <div style={{ maxWidth: "400px", padding: "8% 0 0", margin: "150px auto" }}>
      <div
        style={{
          background: "#FFFFFF",
          margin: "0 auto 100px",
          padding: "45px",
          textAlign: "center",
          boxShadow:
            "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "1.6em", color:"#334155"}}>SIGNIN</h1>
        <form onSubmit={handleSubmit}>
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
            type="text"
            placeholder="email"
          />
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
              margin:"0 0 15px"
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
              {loading ? "Loading...." : "Signin"}
            </button>
          </HoverButtonWrapper>
          <p
            style={{
              margin: "15px 0 0",
              color: "#b3b3b3",
              fontSize: "12px",
            }}
          >
            Not registered?{" "}
            <Link
              style={{ color: "#2980b9", textDecoration: "none" }}
              href="/signup"
            >
              Create an account
            </Link>
          </p>
          {error ? (
            <p style={{ color: "#C53030", fontSize: "14px" }}>{error.message}</p>
          ) : ""}
        </form>
      </div>
    </div>
  );
}
