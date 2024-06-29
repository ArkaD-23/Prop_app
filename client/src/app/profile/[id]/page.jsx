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
import PrivateRoute from "@/components/PrivateRoute";
import {
  DisableVisibility,
  EnableVisibility,
} from "@/components/PasswordVisibility";

const Profile = () => {
  const dispatch = useAppDispatch();
  const { currentUser, error, loading } = useAppSelector((state) => state.user);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [formData, setFormData] = useState({});
  const [visible, setVisible] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`../../server/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        setUpdateSuccess(false);
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
      setUpdateSuccess(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`../../server/user/delete/${currentUser._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = res.json();
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
      alert(error.message);
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
              required
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
              Your password should be atleast: 8 characters long, contains
              atleast a uppercase, a lowercase, a number and a special character
              and no spacing
            </p>
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
                textDecoration: "none",
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
                textDecoration: "none",
              }}
            >
              Sign Out
            </Link>
          </div>
          {error ? (
            <p style={{ color: "#C53030", fontSize: "14px" }}>
              {error.message}
            </p>
          ) : (
            ""
          )}
          <p style={{ color: "#16A34A", marginTop: "1.25rem" }}>
            {updateSuccess ? "User updated successfully!" : ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
