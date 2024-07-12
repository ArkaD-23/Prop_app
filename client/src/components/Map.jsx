import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { createRoot } from 'react-dom/client';
import Mapcard from './Mapcard';

const Map = ({ listings, styleURL, highlightedListingId, zoom}) => {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [pois, setPois] = useState([]);

  useEffect(() => {
    if (!listings || listings.length === 0) return;
  
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    const initializeMap = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: styleURL,
      center: [listings[0].coordinates.longitude, listings[0].coordinates.latitude],
      zoom: zoom ? zoom : 12
    });

    initializeMap.on('load', () => {
      setMap(initializeMap);
    });


    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [listings, styleURL]);

  useEffect(() => {
    if (!map || listings.length === 0) return;

    const highlightedListing = listings.find(listing => listing._id === highlightedListingId)

    listings.forEach(listing => {
      const popupNode = document.createElement('div');
      const root = createRoot(popupNode);
      root.render(<Mapcard listing={listing} />);
    
      const highlighted = (listing._id === highlightedListingId);
    
      new mapboxgl.Marker({ color: highlighted ? "#b40219" : "#3bb2d0" })
        .setLngLat([listing.coordinates.longitude, listing.coordinates.latitude])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setDOMContent(popupNode)
        )
        .addTo(map);

      if (highlighted) {
        map.setCenter([highlightedListing.coordinates.longitude, highlightedListing.coordinates.latitude])
        fetchPOIs(listing.coordinates.longitude, listing.coordinates.latitude);
      }
    });
  }, [map, listings, highlightedListingId]);

  const fetchPOIs = async (longitude, latitude) => {
    const fetchPOI = async (type) => {
      const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${type}.json?proximity=${longitude},${latitude}&types=poi&radius=1000&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`);
      const data = await response.json();
      return data.features; // Array of POIs
    };

    const hospitals = await fetchPOI('hospital');
    const schools = await fetchPOI('school');
    const banks = await fetchPOI('bank');
    setPois([...hospitals, ...schools, ...banks]);
  };

  useEffect(() => {
    if (!map || pois.length === 0) return;

    pois.forEach(poi => {
      new mapboxgl.Marker({ color: "#00ff00" })
        .setLngLat(poi.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setText(poi.text)
        )
        .addTo(map);
    });
  }, [map, pois]);

  return (
    <div
      ref={mapContainerRef}
      style={{ height: '550px', border: 'solid 2px black', borderRadius: "20px" }}
    />
  );
};

export default Map;
