import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  useMap,
} from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

// MapController to pan/zoom map when selectedDistrict changes
const MapController = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 12, { duration: 1.5 });
    }
  }, [position, map]);

  return null;
};

const BangladeshMap = ({ selectedDistrict }) => {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load warehouse data from Warehouse.json
  useEffect(() => {
    fetch("/Warehouse.json")
      .then((res) => res.json())
      .then((data) => {
        setWarehouses(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading map data...</p>;

  // Default center Dhaka or selected district
  const center = selectedDistrict
    ? [selectedDistrict.lat, selectedDistrict.lng]
    : [23.8103, 90.4125];

  return (
    <MapContainer
      center={center}
      zoom={7}
      style={{ height: "600px", width: "100%" }}
      zoomControl={false}
      scrollWheelZoom={true}
    >
      <ZoomControl position="bottomright" />
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapController position={center} />

      {warehouses.map(
        (
          { district, latitude, longitude, covered_area, status, flowchart },
          idx
        ) => (
          <Marker key={idx} position={[latitude, longitude]}>
            <Popup>
              <div>
                <h3 className="font-bold text-lg">{district}</h3>
                <p>
                  <strong>Status:</strong> {status}
                </p>
                <p>
                  <strong>Covered Areas:</strong>
                </p>
                <ul className="list-disc list-inside">
                  {covered_area.map((area, i) => (
                    <li key={i}>{area}</li>
                  ))}
                </ul>
                {flowchart && (
                  <img
                    src={flowchart}
                    alt={`${district} flowchart`}
                    style={{ width: "100%", marginTop: "10px", borderRadius: 6 }}
                  />
                )}
              </div>
            </Popup>
          </Marker>
        )
      )}
    </MapContainer>
  );
};

export default BangladeshMap;
