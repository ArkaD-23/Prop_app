import Link from "next/link";
import { MdLocationOn } from "react-icons/md";

export default function Propcard({ listing }) {
  return (
    <div
      style={{
        backgroundColor: "white",
        boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)',
        transition: "box-shadow 0.3s",
        overflow: "hidden",
        borderRadius: "0.5rem",
        width: "100%",
        maxWidth: "330px",
        margin: "15px"
      }}
    >
      <Link href={`/listing/${listing.id}`} style={{textDecoration:'none'}}>
        <img src={listing.imageUrls[0]} alt="listing cover" style={{height: "320px",width: "100%",objectFit: "cover",transition: "transform 0.3s"}}/> 
        <div
          style={{
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            width: "100%",
          }}
        >
          <p
            style={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              fontSize: "1.125rem",
              fontWeight: "600",
              color: "#475569",
            }}
          >
            {listing.name}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
            }}
          >
            <MdLocationOn
              style={{ height: "1rem", width: "1rem", color: "#047857" }}
            />
            <p
              style={{
                fontSize: "0.875rem",
                color: "#4B5563",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                width: "100%",
              }}
            >
              {listing.address}
            </p>
          </div>
          <p
            style={{
              fontSize: "0.875rem",
              color: "#4B5563",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {listing.description}
          </p>
          <p
            style={{
              color: "#64748B",
              marginTop: "0.5rem",
              fontWeight: "600",
            }}
          >
            Rs.{listing.Price}
          </p>
          <div
            style={{
              color: "#475569",
              display: "flex",
              gap: "1rem",
            }}
          >
            <div style={{ fontWeight: "700", fontSize: "0.75rem" }}>
              {listing.bedrooms > 1
                ? `${listing.bedrooms} bedrooms `
                : `${listing.bedrooms} bedroom `}
            </div>
            <div style={{ fontWeight: "700", fontSize: "0.75rem" }}>
              {listing.bathrooms > 1
                ? `${listing.bathrooms} bathrooms `
                : `${listing.bathrooms} bathroom `}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
