import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { theme } from "../../themes/themes";

const drivers = [
  { code: "DR001", name: "Juan Pérez", lat: -17.3895186, lng: -66.1593585 },
  {
    code: "DR002",
    name: "María Rodríguez",
    lat: -17.3949844,
    lng: -66.1765852,
  },
  { code: "DR003", name: "Pedro Gómez", lat: -17.3822649, lng: -66.1488538 },
  { code: "DR004", name: "Ana Torres", lat: -17.3877768, lng: -66.1657557 },
  { code: "DR005", name: "Carlos Sánchez", lat: -17.3961209, lng: -66.1567706 },
  { code: "DR006", name: "Sofía Ramírez", lat: -17.3905672, lng: -66.1713299 },
  { code: "DR007", name: "Luis Hernández", lat: -17.3798062, lng: -66.1502224 },
  { code: "DR008", name: "Fernanda López", lat: -17.3940508, lng: -66.1628514 },
  { code: "DR009", name: "Diego Martínez", lat: -17.3873897, lng: -66.1582545 },
  { code: "DR010", name: "Valeria García", lat: -17.3925396, lng: -66.1498751 },
  {
    code: "DR011",
    name: "Andrés Gutiérrez",
    lat: -17.3846148,
    lng: -66.1662368,
  },
  { code: "DR012", name: "Laura Flores", lat: -17.3981571, lng: -66.1614132 },
  { code: "DR013", name: "Javier Rosales", lat: -17.3915925, lng: -66.1737556 },
  { code: "DR014", name: "Camila Herrera", lat: -17.3770524, lng: -66.1558451 },
  {
    code: "DR015",
    name: "Ricardo Morales",
    lat: -17.3932846,
    lng: -66.1601381,
  },
];

export const Map = () => {
  const mapContainerRef = React.useRef(null);
  const [map, setMap] = React.useState(null);
  const [popup, setPopup] = React.useState(null);

  useEffect(() => {
    const initMap = () => {
      mapboxgl.accessToken =
        "pk.eyJ1IjoidGFtZmxpa2siLCJhIjoiY2x1aDJzYXZwMmppNjJybzlncHltN3JnbyJ9.O6S2SZU1Uf-NMpXLtGVuhQ";
      const initialMap = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-66.1571, -17.3937],
        zoom: 12,
      });

      initialMap.on("load", () => {
        initialMap.addSource("drivers", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: drivers.map((driver) => ({
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [driver.lng, driver.lat],
              },
              properties: {
                code: driver.code,
                name: driver.name,
              },
            })),
          },
        });

        initialMap.addLayer({
          id: "drivers-layer",
          type: "circle",
          source: "drivers",
          paint: {
            "circle-color": "#4264fb",
            "circle-radius": 10,
            "circle-stroke-width": 2,
            "circle-stroke-color": "#ffffff",
          },
        });

        initialMap.on("click", "drivers-layer", (e) => {
          const driver = e.features[0].properties;
          const coordinates = e.features[0].geometry.coordinates.slice();

          // Crear un nuevo popup con estilos personalizados
          const popup = new mapboxgl.Popup({
            className: "custom-popup",
          })
            .setLngLat(coordinates)
            .setHTML(
              `<div class="popup-content"><p>Código: ${driver.code}</p><p>Nombre: ${driver.name}</p></div>`
            )
            .addTo(initialMap);

          setPopup(popup);
        });

        initialMap.on("mouseleave", "drivers-layer", () => {
          if (popup) {
            popup.remove();
            setPopup(null);
          }
        });
      });

      setMap(initialMap);
    };

    if (!map) initMap();
  }, []);

  return (
    <div>
      <div ref={mapContainerRef} style={{ width: "40vw", height: "86vh", borderRadius: theme.shape.borderRadius }} />

      {/* Estilos para el popup */}
      <style>{`
        .mapboxgl-popup-content {
          color: #000;
          padding: 10px;
          border-radius: 5px;
        }

        .popup-content p {
          margin: 0;
        }
      `}</style>
    </div>
  );
};
