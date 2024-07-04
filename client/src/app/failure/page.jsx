import Link from "next/link";
import React from "react";

const Failure = () => {
  return (
    <div style={{ marginTop: "150px" }}>
      <div
        style={{
          display: "grid",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <h2 style={{ color: "red", textAlign: "center" }}>Failed !</h2>
        <p style={{ color: "grey" }}>
          The transaction has failed unexpectedly !
        </p>
        <div style={{display:"flex", justifyContent:"center"}}>
          <Link href="/" style={{ width: "100px", }}>
            <button style={{ width: "100px", cursor: "pointer" }}>
              Home Page
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Failure;
