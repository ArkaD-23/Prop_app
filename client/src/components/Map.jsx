// components/Map.js
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; // Import Mapbox GL CSS
import { createRoot } from 'react-dom/client';
import Propcard from './Propcard'; // Make sure to import your Propcard component
import Mapcard from './Mapcard';

const Map = ({ listings, styleURL }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (listings.length === 0) return; // Ensure listings is not empty

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: styleURL,
      center: [listings[0].coordinates.longitude, listings[0].coordinates.latitude],
      zoom: 9
    });

    listings.forEach(listing => {
      const popupNode = document.createElement('div');
      //popupNode.style.backgroundColor="lightblue";
      const root = createRoot(popupNode);
      root.render(<Mapcard listing={listing} />);

      new mapboxgl.Marker()
        .setLngLat([listing.coordinates.longitude, listing.coordinates.latitude])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setDOMContent(popupNode)
        )
        .addTo(map);
    });

    return () => map.remove();
  }, [listings, styleURL]); // Add styleURL to dependencies

  return (
    <div
      ref={mapContainerRef}
      style={{ width: '100%', height: '500px', border: 'solid 2px black' }}
    />
  );
};

export default Map;
