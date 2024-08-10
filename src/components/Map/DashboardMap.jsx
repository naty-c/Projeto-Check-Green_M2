import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import axios from 'axios';
import getAddressFromCep from '../../service/addressService';
import styles from './DashboardMap.module.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { renderToString } from 'react-dom/server';
import { MapPinCheckInside } from 'lucide-react';

const svgIcon = renderToString(<MapPinCheckInside color="#586fdf" />);
const base64Icon = `data:image/svg+xml;base64,${btoa(svgIcon)}`;

const customIcon = L.icon({
  iconUrl: base64Icon,
  iconSize: [38, 95],
  iconAnchor: null,
  popupAnchor: [0, 0],
});

function MapMarkers({ places }) {
  const map = useMap();

  useEffect(() => {
    if (places.length > 0) {
      const firstPlace = places[0];
      map.flyTo([firstPlace.latitude, firstPlace.longitude], 13, { animate: true });
    }
  }, [places, map]);

  return (
    <>
      {places.map((place) => (
        <Marker
          key={place.id}
          position={[place.latitude, place.longitude]} 
          icon={customIcon}
        >
          <Popup>
            <strong>{place.name}</strong>
            <p>{place.description}</p>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

function DashboardMap({ center = [-27.593500, -48.558540], zoom = 13 }) {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get('http://localhost:3000/places');
        const placesWithCoordinates = await Promise.all(
          response.data.map(async (place) => {
            const addressData = await getAddressFromCep(place.cep);
            return { ...place, ...addressData }; // Merge place data with address
          })
        );
        setPlaces(placesWithCoordinates);
      } catch (error) {
        console.error('Error fetching places or coordinates:', error);
      }
    };

    fetchPlaces(); // Fetch places on component mount
  }, []);

  return (
    <MapContainer 
      center={center} 
      zoom={zoom} 
      className={styles.mapContainer}
      >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapMarkers places={places} />
    </MapContainer>
  );
};

export default DashboardMap;