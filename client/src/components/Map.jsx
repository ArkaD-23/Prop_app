// components/Map.js
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; // Import Mapbox GL CSS

const Map = ({ coordinates , styleURL }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style:styleURL,
      center: [coordinates.longitude, coordinates.latitude],
      zoom: 9
    });
    new mapboxgl.Marker()
      .setLngLat([coordinates.longitude, coordinates.latitude])
      .addTo(map);
      
    return () => map.remove();
  }, [coordinates]);

  return (
    <div
      ref={mapContainerRef}
      style={{ width: '100%', height: '500px', border: 'solid 2px black' }}
    />
  );
};

export default Map;
