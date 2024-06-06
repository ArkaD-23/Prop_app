"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useNavigate } from "react-router-dom";
import styles from "./buy.module.css";
import Propcard from "@/components/Propcard.jsx";
import HoverButtonWrapper from "@/components/HoverButtonWrapper";

const Buy = () => {
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    parking: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const parkingFromUrl = urlParams.get("parking");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      parkingFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        parking: parkingFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "createdAt",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      try {
        const searchQuery = urlParams.toString();
        const res = await fetch(`/server/listing/getall?${searchQuery}`);
        const data = await res.json();
        console.log(data);
        setListings(Array.isArray(data) ? data : []);
        setLoading(false);
        if (data.length > 8) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      } catch (error) {
        console.error("Error fetching listings:", error);
        setListings([]);
      }
    };

    fetchListings();
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (e.target.id === "parking" || e.target.id === "offer") {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "createdAt";

      const order = e.target.value.split("_")[1] || "desc";

      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("parking", sidebardata.parking);
    urlParams.set("offer", sidebardata.offer);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    const searchQuery = urlParams.toString();
    setLoading(true);
    setShowMore(false);
    try {
    //  const searchQuery = urlParams.toString();
      const res = await fetch(`/server/listing/getall?${searchQuery}`);
      const data = await res.json();
      setListings(Array.isArray(data) ? data : []);
      setLoading(false);
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      router.push(`/search?${searchQuery}`);
    } catch (error) {
      console.error("Error fetching listings:", error);
      setListings([]);
    }
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/server/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  return (
    <div className={styles.container}>
      <div
        style={{
          padding: "1.75rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "360px",
            gap: "2rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
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
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <label style={{ fontWeight: "600" }}>Amenities:</label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input
                type="checkbox"
                id="parking"
                style={{ width: "1.25rem" }}
                onChange={handleChange}
                checked={sidebardata.parking}
              />
              <span>Parking</span>
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input
                type="checkbox"
                id="offer"
                style={{ width: "1.25rem" }}
                onChange={handleChange}
                checked={sidebardata.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <select
              defaultValue={"createdAt_desc"}
              id="sort_order"
              style={{
                border: "1px solid",
                borderRadius: "0.5rem",
                padding: "0.75rem",
                }}
              onChange={handleChange}
            >
              <option value="Price_desc">Price high to low</option>
              <option value="Price_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
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
                WebkitTransition: "all 0.3s ease",
                transition: "all 0.3s ease",
                cursor: "pointer",
                borderRadius: "50px",
              }}
            >
              Search
            </button>
          </HoverButtonWrapper>
        </form>
      </div>
      <div style={{ flex: 1 }}>
        <h1
          style={{
            fontSize: "1.875rem",
            fontWeight: "600",
            borderBottom: "1px solid",
            padding: "0.75rem",
            color: "#2f4f4f",
            marginTop: "1.25rem",
          }}
        >
          Listing results:
        </h1>
        <div
          style={{
            padding: "1.75rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          {!loading && listings.length === 0 && (
            <p style={{ fontSize: "1.25rem", color: "#2f4f4f" }}>
              No listing found!
            </p>
          )}
          {loading && (
            <p
              style={{
                fontSize: "1.25rem",
                color: "#2f4f4f",
                textAlign: "center",
                width: "100%",
              }}
            >
              Loading...
            </p>
          )}
          {!loading &&
            listings &&
            listings.map((listing) => (
              <Propcard key={listing.id} listing={listing} />
            ))}
          {showMore && (
            <button
              onClick={onShowMoreClick}
              className="text-green-700 hover:underline p-7 text-center w-full"
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default Buy;
