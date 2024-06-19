import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; // Import Mapbox GL CSS
import { createRoot } from 'react-dom/client';
import Mapcard from './Mapcard';

const Map = ({ listings, styleURL, highlightedListingId }) => {
  const mapContainerRef = useRef(null);
  useEffect(() => {
    if (!listings || listings.length === 0) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: styleURL,
      center: [listings[0].coordinates.longitude, listings[0].coordinates.latitude],
      zoom: 9
    });

    listings.forEach(listing => {
      const popupNode = document.createElement('div');
      const root = createRoot(popupNode);
      root.render(<Mapcard listing={listing} />);
    
      const highlighted = (listing._id === highlightedListingId);
    
      new mapboxgl.Marker({ color: highlighted ? "#b40219" : "#3bb2d0"})
        .setLngLat([listing.coordinates.longitude, listing.coordinates.latitude])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setDOMContent(popupNode)
        )
        .addTo(map);
    });
    
    return () => map.remove();
  }, [listings, styleURL, highlightedListingId]);

  return (
    <div
      ref={mapContainerRef}
      style={{ width: '100%', height: '500px', border: 'solid 2px black' }}
    />
  );
};

export default Map;
