import React, { useRef, useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import driversEndpoints from "../../../../services/drivers";
import { useToast } from "../../feedback/toast";
import { useLogout } from "../../../../helpers/logout";
mapboxgl.accessToken =
  "pk.eyJ1IjoidGFtZmxpa2siLCJhIjoiY2x1aDJzYXZwMmppNjJybzlncHltN3JnbyJ9.O6S2SZU1Uf-NMpXLtGVuhQ";

export const UpdateStopDialog = ({ open, onClose, refresh, stop }) => {
  const { handleOpenToast } = useToast();
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [parada, setParada] = useState({
    name: "",
    lat: -17.3937,
    lng: -66.1571,
    color: "#000000",
  });
  const [initialParada, setInitialParada] = useState({});
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    if (stop) {
      setParada(stop);
      setInitialParada(stop);
    }
  }, [stop]);

  const initializeMap = () => {
    if (!mapRef.current && mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [stop.lng, stop.lat],
        zoom: 12,
      });

      mapRef.current.on("load", () => {
        setMapLoaded(true);
        if (parada.lat && parada.lng) {
          updateMarker();
        }
      });

      mapRef.current.on("click", (e) => {
        const [lng, lat] = e.lngLat.toArray();
        setParada((prev) => ({ ...prev, lng, lat }));
        checkModification({ ...parada, lng, lat });
      });
    }
  };

  useEffect(() => {
    if (open) {
      setTimeout(initializeMap, 100);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        setMapLoaded(false);
      }
    };
  }, [open]);

  useEffect(() => {
    if (mapRef.current && mapLoaded) {
      mapRef.current.resize();
      updateMarker();
    }
  }, [mapLoaded, parada]);

  const updateMarker = () => {
    if (!mapRef.current || !mapLoaded || !parada.lat || !parada.lng) return;

    if (markerRef.current) {
      markerRef.current.remove();
    }

    const el = document.createElement("div");
    el.style.display = "flex";
    el.style.flexDirection = "column";
    el.style.alignItems = "center";

    const label = document.createElement("div");
    label.textContent = parada.name;
    label.style.color = "black";
    label.style.backgroundColor = parada.name ? "white" : "transparent";
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
    svgIcon.style.fill = parada.color;
    svgIcon.style.stroke = "white";
    svgIcon.style.strokeWidth = "1px";
    el.appendChild(svgIcon);

    markerRef.current = new mapboxgl.Marker({
      element: el,
      draggable: true,
      anchor: "bottom",
    })
      .setLngLat([parada.lng, parada.lat])
      .addTo(mapRef.current);

    markerRef.current.on("dragend", () => {
      const lngLat = markerRef.current.getLngLat();
      setParada((prev) => ({ ...prev, lng: lngLat.lng, lat: lngLat.lat }));
      checkModification({ ...parada, lng: lngLat.lng, lat: lngLat.lat });
    });
  };

  const handleChange = (e) => {
    const newParada = { ...parada, [e.target.name]: e.target.value };
    setParada(newParada);
    checkModification(newParada);
  };

  const checkModification = (newParada) => {
    const modified = Object.keys(initialParada).some(
      (key) => initialParada[key] !== newParada[key]
    );
    setIsModified(modified);
  };

  const handleUpdate = async () => {
    console.log("Parada actualizada:", parada);
    try {
      const response = await driversEndpoints.updateDriversStop(
        parada._id,
        parada
      );
      refresh();
      handleClose();
      handleOpenToast("Parada actualizada exitosamente", "success");
    } catch (error) {
      if (error.response.status === 498) {
        useLogout();
      }
      if (error.response.status === 409) {
        handleOpenToast("El nombre de la parada ya existe", "warning");
      } else {
        handleOpenToast("Error al actualizar la parada", "error");
      }
    }
  };

  const handleClose = () => {
    setParada(initialParada);
    setIsModified(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      TransitionProps={{
        onEntered: () => {
          if (mapRef.current && mapLoaded) {
            mapRef.current.resize();
            updateMarker();
          }
        },
      }}
    >
      <DialogTitle>Editar Parada</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Nombre"
          type="text"
          fullWidth
          value={parada.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="color"
          label="Color"
          type="color"
          fullWidth
          value={parada.color}
          onChange={handleChange}
        />
        <Box
          ref={mapContainerRef}
          sx={{
            width: "100%",
            height: "400px",
            marginTop: "20px",
            marginBottom: "20px",
            borderRadius: "10px",
          }}
        />
      </DialogContent>
      <DialogActions sx={{ mx: 2, mb: 1 }}>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button
          onClick={handleUpdate}
          disabled={!isModified}
          variant="contained"
        >
          Actualizar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
