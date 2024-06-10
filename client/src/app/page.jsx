"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks/hooks";
import HoverButtonWrapper from "@/components/HoverButtonWrapper";

export default function Home() {
  const { currentUser, loading } = useAppSelector((state) => state.user);
  const linkToUser =
    currentUser && currentUser.usertype === "Customer" ? "/search" : "/sell";
  const linkTo = currentUser ? linkToUser : "/signin";
  return (
    <>
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
        <Link href={linkTo} style={{ textDecoration: "none", width: "200px" }}>
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
    </>
  );
}
