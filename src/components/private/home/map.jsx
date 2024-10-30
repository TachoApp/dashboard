import React, { useRef, useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { theme } from "../../../themes/themes";
import { ManualRideDialog } from "./dialogs/main";

const mapToken = import.meta.env.VITE_MAPBOX_TOKEN;

export const Map = ({ drivers, stops, getRides }) => {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const markersRef = useRef({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [availableDrivers, setAvailableDrivers] = useState([]);

  useEffect(() => {
    mapboxgl.accessToken = mapToken;
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

  // Replace socket-based driver updates with prop-based updates
  useEffect(() => {
    setAvailableDrivers(drivers);
  }, [drivers]);

  useEffect(() => {
    if (map) {
      const driverFeatures = availableDrivers.map((driver) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [driver.lng, driver.lat],
        },
        properties: {
          code: driver.movilCode,
          name: driver.fullName,
          id: driver.driverId,
        },
      }));

      map.getSource("drivers").setData({
        type: "FeatureCollection",
        features: driverFeatures,
      });
    }
  }, [availableDrivers, map]);

  useEffect(() => {
    if (map) {
      map.on("mouseenter", "drivers-layer", () => {
        map.getCanvas().style.cursor = "pointer";
      });

      map.on("mouseleave", "drivers-layer", () => {
        map.getCanvas().style.cursor = "";
      });

      map.on("click", "drivers-layer", (e) => {
        const { code, name, id } = e.features[0].properties;
        const coordinates = e.features[0].geometry.coordinates.slice();

        const popupContent = `
          <div>
            <p style="margin: 1px 0; color: black; font-size: 15px;"><strong>Codigo:</strong> ${code}</p>
            <p style="margin: 1px 0; color: black; font-size: 15px;"><strong>Nombre:</strong> ${name}</p>
          </div>
        `;

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(popupContent)
          .addTo(map);
      });
    }
  }, [map]);

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
    <Box sx={{ position: 'relative' }}>
      <Box
        ref={mapContainerRef}
        style={{
          width: "40vw",
          height: "86vh",
          borderRadius: theme.shape.borderRadius,
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => setDialogOpen(true)}
        sx={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          zIndex: 1000,
          fontWeight: 'bold'
        }}
      >
        Carrera manual
      </Button>
      <ManualRideDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        availableDrivers={availableDrivers}
        getRides={getRides}
      />
    </Box>
  );
};