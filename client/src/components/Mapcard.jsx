import React from "react";

const Mapcard = ({ listing }) => {
  return (
    <div style={{ height: "300px", width: "200px"}}>
      <div style={{ height: "150px", width: "100%" }}>
        <img
          src={listing.imageUrls[0]}
          alt={listing.captions[0]}
          style={{ objectFit: "center", height: "100%", width: "100%" }}
        />
      </div>
      <div style={{paddingLeft:"10px", gap:"0"}}>
        <h3>{listing.name}</h3>
        <p>{listing.description}</p>
        <p style={{marginBottom:"0px"}}>
          <strong>Price:</strong> Rs.{listing.Price}
        </p>
        <p style={{margin:"0px"}}>
          <strong>Bedrooms:</strong> {listing.bedrooms}
        </p>
        <p style={{marginTop:"0px"}}>
          <strong>Bathrooms:</strong> {listing.bathrooms}
        </p>
      </div>
    </div>
  );
};

export default Mapcard;
