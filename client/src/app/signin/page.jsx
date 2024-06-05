"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "@/store/features/user/userSlice.js";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks.js";
import HoverButtonWrapper from "@/components/HoverButtonWrapper";

export default function Signin() {
  const [formData, setFormData] = useState({});
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentUser, loading, error } = useAppSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert("Please fill all the fields!");
      return;
    }
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
        alert("Please enter correct credentials");
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
        <h1 style={{ textAlign: "center", marginBottom: "1.6em" }}>SIGNIN</h1>
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
          <input
            id="password"
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
            type="password"
            placeholder="password"
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
        </form>
      </div>
    </div>
  );
}
