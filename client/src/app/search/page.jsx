"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import styles from "./buy.module.css";
import Propcard from "@/components/Propcard.jsx";
import Link from "next/link";
import { MdSearch } from "react-icons/md";
import Map from "@/components/Map";

const Buy = () => {
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    parking: false,
    offer: false,
    sort: "createdAt",
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

  const handleSubmit = async () => {
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

  const handleChangeAndSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowMore(false);

    const updatedData = { ...sidebardata };

    if (e.target.id === "parking" || e.target.id === "offer") {
      updatedData[e.target.id] = e.target.checked;
    }

    if (e.target.id === "sort_order") {
      const [sort, order] = e.target.value.split("_");
      updatedData.sort = sort || "createdAt";
      updatedData.order = order || "desc";
    }

    setSidebardata(updatedData);

    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", updatedData.searchTerm);
    urlParams.set("parking", updatedData.parking);
    urlParams.set("offer", updatedData.offer);
    urlParams.set("sort", updatedData.sort);
    urlParams.set("order", updatedData.order);
    const searchQuery = urlParams.toString();

    try {
      const res = await fetch(`/server/listing/getall?${searchQuery}`);
      const data = await res.json();
      setListings(Array.isArray(data) ? data : []);
      setShowMore(data.length > 8);
      router.push(`/search?${searchQuery}`);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching listings:", error);
      setListings([]);
      setLoading(false);
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
          justifyContent: "center",
          flexWrap: "wrap",
          //backgroundColor: "#ffffff",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            gap: "2rem",
            flexWrap: "wrap",
            alignItems: "center",
            //justifyContent:"center"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "#f2f2f2",
              padding: "10px",
              height: "23px",
              borderRadius: "50px",
            }}
          >
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
                boxSizing: "border-box",
                fontSize: "14px",
                borderRadius: "50px",
              }}
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
            <div style={{ border: "0", hover: "0" }} onClick={handleSubmit}>
              <MdSearch />
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <input
              type="checkbox"
              id="parking"
              style={{ width: "1.25rem" }}
              onChange={handleChangeAndSubmit}
              checked={sidebardata.parking}
            />
            <span>Parking</span>
          </div>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <input
              type="checkbox"
              id="offer"
              style={{ width: "1.25rem" }}
              onChange={handleChangeAndSubmit}
              checked={sidebardata.offer}
            />
            <span>Offer</span>
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
              onChange={handleChangeAndSubmit}
            >
              <option value="Price_desc">Price high to low</option>
              <option value="Price_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
        </div>
      </div>
      <hr
        style={{
          border: "none",
          borderTop: "2px solid lightgrey",
          margin: "20px 0px",
          width: "100%",
        }}
      />
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <div
            style={{
              padding: "0 2rem 2rem 2rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "2rem",
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
                <Link
                  href={`/listing/${listing._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Propcard key={listing._id} listing={listing} />
                </Link>
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
        <div style={{ width: "800px"}}>
          <Map
            listings={listings}
            styleURL="mapbox://styles/mapbox/streets-v12"
          />
        </div>
      </div>
    </div>
  );
};
export default Buy;
