import React, { useRef, useEffect, useState } from "react";
import { Box } from "@mui/material";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { theme } from "../../../themes/themes";

export const Map = ({ drivers, stops }) => {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const markersRef = useRef({}); // Para almacenar marcadores de paradas
  const popupRef = useRef(
    new mapboxgl.Popup({ offset: 25, closeButton: true })
  );

  useEffect(() => {
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
          features: [],
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

      setMap(initialMap);
    });

    return () => initialMap.remove();
  }, []);

  useEffect(() => {
    if (map) {
      const driverFeatures = drivers.map((driver) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [driver.lng, driver.lat],
        },
        properties: {
          code: driver.movilCode,
          name: driver.fullName,
        },
      }));

      map.getSource("drivers").setData({
        type: "FeatureCollection",
        features: driverFeatures,
      });

      // Evento de clic para mostrar el popup
      map.on("click", "drivers-layer", (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const { code, name } = e.features[0].properties;

        // Contenido del popup
        const popupContent = `
        <div>
          <p style="margin: 1px 0;"><strong>Code:</strong> ${code}</p>
          <p style="margin: 1px 0;"><strong>Name:</strong> ${name}</p>
          <button 
          style="margin-top: 5px; background-color: #4264fb; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; width: 100%;"
        >
          Asignar Carrera
        </button>
        </div>
      `;

        // Muestra el popup en la posición del clic
        popupRef.current
          .setLngLat(coordinates)
          .setHTML(popupContent)
          .addTo(map);
      });

      // Cambia el cursor al pasar sobre un conductor
      map.on("mouseenter", "drivers-layer", () => {
        map.getCanvas().style.cursor = "pointer";
      });

      map.on("mouseleave", "drivers-layer", () => {
        map.getCanvas().style.cursor = "";
      });
    }
  }, [drivers, map]);

  useEffect(() => {
    if (map && stops?.length > 0) {
      stops.forEach((stop) => {
        if (markersRef.current[stop._id]) {
          markersRef.current[stop._id].remove();
        }

        const el = document.createElement("div");
        el.style.display = "flex";
        el.style.flexDirection = "column";
        el.style.alignItems = "center";

        const label = document.createElement("div");
        label.textContent = stop.name;
        label.style.color = "black";
        label.style.backgroundColor = "white";
        label.style.padding = "2px 5px";
        label.style.borderRadius = "3px";
        label.style.fontSize = "12px";
        label.style.fontWeight = "bold";
        label.style.marginBottom = "5px";
        label.style.textAlign = "center";
        label.style.whiteSpace = "nowrap";
        el.appendChild(label);

        const svgIcon = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );
        svgIcon.setAttribute("width", "40");
        svgIcon.setAttribute("height", "40");
        svgIcon.setAttribute("viewBox", "0 0 24 24");
        svgIcon.innerHTML = `<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>`;
        svgIcon.style.fill = stop.color;
        svgIcon.style.stroke = "white";
        svgIcon.style.strokeWidth = "1px";
        el.appendChild(svgIcon);

        const marker = new mapboxgl.Marker({
          element: el,
          draggable: false,
          anchor: "bottom",
        })
          .setLngLat([stop.lng, stop.lat])
          .addTo(map);

        markersRef.current[stop._id] = marker;
      });
    }

    return () => {
      Object.values(markersRef.current).forEach((marker) => marker.remove());
      markersRef.current = {};
    };
  }, [stops, map]);

  return (
    <Box>
      <Box
        ref={mapContainerRef}
        style={{
          width: "40vw",
          height: "86vh",
          borderRadius: theme.shape.borderRadius,
        }}
      />

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
    </Box>
  );
};
