import React, { useEffect, useState } from "react";
import HoverButtonWrapper from "./HoverButtonWrapper";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "@/store/features/user/userSlice";

const Contact = ({ listing }) => {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(null);
  const [messageHandler, setMessageHandler] = useState(true);
  const { currentUser } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const onChange = (e) => {
    setMessage(e.target.value);
  };
  useEffect(() => {
    const fetchLandlord = async () => {
      if (!listing || !listing.userRef) {
        console.log("hello");
        return;
      }
      try {
        const res = await fetch(`/server/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data.user);
        console.log(landlord);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing]);

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/server/user/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderEmail: currentUser.email,
          recipientEmail: landlord.email,
          subject: `Negotiation regarding ${listing.name}`,
          text: `${message}`,
        }),
      });
      const data = await res.json();
      if (data.success === false) {
        setConfirmationMessage(data.message);
        setLoading(false);
        return;
      }
      console.log(data);
      setConfirmationMessage(data.message);
      setLoading(false);
    } catch (error) {
      alert(error.message);
      setConfirmationMessage("Something went wrong !");
      setLoading(false);
      return;
    }
  };

  return (
    <>
      {landlord && (
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <p>
            Contact{" "}
            <span style={{ fontWeight: "bold" }}>{landlord.username}</span> for{" "}
            <span style={{ fontWeight: "bold" }}>
              {listing.name.toLowerCase()}
            </span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={onChange}
            placeholder="Enter your message here..."
            style={{
              width: "100%",
              border: "1px solid #ccc",
              padding: "0.75rem",
              borderRadius: "0.5rem",
            }}
          ></textarea>
          <HoverButtonWrapper>
            <button
              style={{
                marginBottom: "20px",
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
              onClick={sendEmail}
            >
              {!loading ? "Send Message" : "Sending..."}
            </button>
          </HoverButtonWrapper>
          {messageHandler && <p style={{color:"green", marginBottom:"10px", marginLeft:"10px"}}>{confirmationMessage}</p>}
        </div>
      )}
    </>
  );
};

export default Contact;
