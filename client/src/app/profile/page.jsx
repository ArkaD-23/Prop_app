"use client";
import React, { useState } from "react";
import Propcard from "@/components/Propcard.jsx";
import Link from "next/link";
import {
  signOut,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "@/store/features/user/userSlice.js";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks.js";
import { useRouter } from "next/navigation";
import HoverButtonWrapper from "@/components/HoverButtonWrapper";

const Profile = () => {
  const dispatch = useAppDispatch();
  const { currentUser, error, loading } = useAppSelector((state) => state.user);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [formData, setFormData] = useState({});
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`../../server/user/update/${currentUser.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`../../server/user/delete/${currentUser.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

  const handleSignout = async () => {
    try {
      await fetch("../../server/auth/signout");
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ display: "grid" }}>
      <div
        style={{
          width: "100%",
          padding: "8% 0 0",
          margin: " auto",
          display: "grid",
          justifyItems: "center",
        }}
      >
        <div
          style={{
            background: "#FFFFFF",
            maxWidth: "360px",
            margin: "0, auto 100px",
            padding: "45px",
            display: "grid",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 style={{ textAlign: "center" }}>My Profile</h1>
          <form onSubmit={handleSubmit}>
            <input
              id="username"
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
              defaultValue={currentUser ? currentUser.username : ""}
              placeholder="username"
              onChange={handleChange}
            />
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
              defaultValue={currentUser ? currentUser.email : ""}
              placeholder="email"
              onChange={handleChange}
            />
            <input
              id="contact_no"
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
              defaultValue={currentUser ? currentUser.contact_no : ""}
              placeholder="contact"
              onChange={handleChange}
            />
            <input
              id="password"
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
              defaultValue={currentUser ? currentUser.password : ""}
              placeholder="password"
              onChange={handleChange}
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
                  WebkitTransition: "all 0.3 ease",
                  transition: "all 0.3 ease",
                  cursor: "pointer",
                  borderRadius: "50px",
                }}
              >
                {" "}
                {loading ? "Loading...." : "Update"}
              </button>
            </HoverButtonWrapper>
          </form>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1.25rem",
            }}
          >
            <Link
              href="/"
              style={{
                color: "#DC2626",
                cursor: "pointer",
                textDecoration: error ? "underline" : "none",
              }}
              onClick={handleDeleteAccount}
            >
              Delete Account
            </Link>

            <Link
              href="/signin"
              onClick={handleSignout}
              style={{
                color: "#DC2626",
                cursor: "pointer",
                textDecoration: error ? "underline" : "none",
              }}
            >
              Sign Out
            </Link>
          </div>
          <p style={{ color: "#DC2626", marginTop: "1.25rem" }}>
            {error && "Something went wrong!"}
          </p>
          <p style={{ color: "#16A34A", marginTop: "1.25rem" }}>
            {updateSuccess && "User updated successfully!"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
