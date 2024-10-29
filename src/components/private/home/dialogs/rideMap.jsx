import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { point } from 'leaflet';

const mapToken = import.meta.env.VITE_MAPBOX_TOKEN;
mapboxgl.accessToken = mapToken;

const ROUTE_SOURCE_ID = 'route-source';
const ROUTE_LAYER_ID = 'route-layer';

export const RideMap = ({ 
  points, 
  onPointsUpdate, 
  initialCenter,
  availableDrivers = [],
  onDriverSelect,
  selectedDriver
}) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const driversMarkersRef = useRef({});
  const maxPoints = 5;
  const [mapLoaded, setMapLoaded] = useState(false);

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDriverData, setSelectedDriverData] = useState(null);
  const [driverSelectionDialog, setDriverSelectionDialog] = useState(false);

  // Initialize map only once
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: initialCenter || [-66.1571, -17.3937],
      zoom: 12,
      dragPan: true,
    });

    map.on('load', () => {
      setMapLoaded(true);
      map.getCanvas().style.cursor = 'default';
      
      // Simplified click handler
      map.on('click', (e) => {
        const targetElement = e.originalEvent.target;
        const isDriverMarker = targetElement.closest('.driver-marker');
        
        if (!isDriverMarker) {
          handleMapClick(e);
        }
      });
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      setMapLoaded(false);
    };
  }, []);

  // Handle driver markers
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;

    // Clear existing driver markers
    Object.values(driversMarkersRef.current).forEach(marker => marker.remove());
    driversMarkersRef.current = {};

    // Add new driver markers
    availableDrivers.forEach(driver => {
      const el = document.createElement('div');
      el.style.display = 'flex';
      el.style.flexDirection = 'column';
      el.style.alignItems = 'center';
      el.className = 'driver-marker';

      const label = document.createElement('div');
      label.textContent = driver.movilCode;
      label.style.color = 'black';
      label.style.backgroundColor = 'white';
      label.style.padding = '2px 5px';
      label.style.borderRadius = '3px';
      label.style.fontSize = '12px';
      label.style.fontWeight = 'bold';
      label.style.marginBottom = '5px';
      el.appendChild(label);

      const marker = new mapboxgl.Marker({
        element: el,
        anchor: 'bottom',
      })
      .setLngLat([driver.lng, driver.lat])
      .addTo(mapRef.current);

      el.addEventListener('click', (e) => {
        e.stopPropagation();
        setSelectedDriverData(driver);
        setDriverSelectionDialog(true);
      });

      driversMarkersRef.current[driver.driverId] = marker;
    });
  }, [availableDrivers, mapLoaded]);

  // Handle route points
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;

    // Remove existing markers and route
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
    
    removeRoute();

    // Add point markers
    points.forEach((point, index) => {
      const color = index === 0 ? 'green' : '#3b87e2';
      const name = `Punto ${String.fromCharCode(65 + index)}`;

      const el = document.createElement('div');
      el.style.display = 'flex';
      el.style.flexDirection = 'column';
      el.style.alignItems = 'center';

      const label = document.createElement('div');
      label.textContent = name;
      label.style.color = 'black';
      label.style.backgroundColor = 'white';
      label.style.padding = '2px 5px';
      label.style.borderRadius = '3px';
      label.style.fontSize = '12px';
      label.style.fontWeight = 'bold';
      label.style.marginBottom = '5px';
      label.style.textAlign = 'center';
      label.style.whiteSpace = 'nowrap';
      el.appendChild(label);

      const svgIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svgIcon.setAttribute('width', '45');
      svgIcon.setAttribute('height', '45');
      svgIcon.setAttribute('viewBox', '0 0 24 24');
      svgIcon.innerHTML = `<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>`;
      svgIcon.style.fill = color;
      svgIcon.style.stroke = 'white';
      svgIcon.style.strokeWidth = '1px';
      el.appendChild(svgIcon);

      const marker = new mapboxgl.Marker({
        element: el,
        draggable: true,
        anchor: 'bottom',
      })
      .setLngLat([point.lng, point.lat])
      .addTo(mapRef.current);

      marker.on('dragend', () => updateMarkerPosition(index));
      markersRef.current.push(marker);
    });

    // Draw route if there are at least 2 points
    if (points.length >= 2) {
      drawRoute();
    }
  }, [points, mapLoaded]);

  const removeRoute = () => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;

    if (map.getLayer(ROUTE_LAYER_ID)) {
      map.removeLayer(ROUTE_LAYER_ID);
    }
    if (map.getSource(ROUTE_SOURCE_ID)) {
      map.removeSource(ROUTE_SOURCE_ID);
    }
  };

  const drawRoute = async () => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;

    const coordinates = points.map(point => `${point.lng},${point.lat}`).join(';');
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0].geometry;

        removeRoute();

        map.addSource(ROUTE_SOURCE_ID, {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: route
          }
        });

        map.addLayer({
          id: ROUTE_LAYER_ID,
          type: 'line',
          source: ROUTE_SOURCE_ID,
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#3b87e2',
            'line-width': 5,
          }
        });

        const bounds = new mapboxgl.LngLatBounds();
        route.coordinates.forEach(coord => bounds.extend(coord));
        map.fitBounds(bounds, { padding: 50 });
      }
    } catch (error) {
      console.error('Error fetching route:', error);
    }
  };

  const handleMapClick = (e) => {
    if (points.length >= maxPoints) {
      alert('Solo puedes añadir hasta 5 puntos.');
      return;
    }

    const { lng, lat } = e.lngLat;
    setSelectedPoint({ lng, lat });
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedPoint(null);
  };

  const addPoint = async (isPickup) => {
    if (isPickup && points.length > 0) {
      alert('El punto de recojo (A) ya está establecido.');
      handleModalClose();
      return;
    }

    if (!isPickup && points.length === 0) {
      alert('Primero debes establecer el punto de recojo (A).');
      handleModalClose();
      return;
    }

    setIsLoading(true);
    try {
      const { lng, lat } = selectedPoint;
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();
      const placeName = data.features[0]?.place_name || 'Ubicación desconocida';
      const newPoint = { lng, lat, name: placeName };

      if (isPickup) {
        onPointsUpdate([newPoint, ...points]);
      } else {
        onPointsUpdate([...points, newPoint]);
      }
    } catch (error) {
      console.error('Error fetching location name:', error);
    } finally {
      setIsLoading(false);
      handleModalClose();
    }
  };

  const updateMarkerPosition = (index) => {
    const marker = markersRef.current[index];
    const lngLat = marker.getLngLat();
    const updatedPoints = [...points];
    updatedPoints[index] = { ...updatedPoints[index], lng: lngLat.lng, lat: lngLat.lat };
    onPointsUpdate(updatedPoints);
  };

  const handleDriverSelect = () => {
    if (selectedDriverData) {
      onDriverSelect(selectedDriverData);
      setDriverSelectionDialog(false);
    }
  };

  return (
    <Box sx={{ height: '100%', position: 'relative' }}>
      <Box ref={mapContainerRef} sx={{ height: '100%' }} />

      <Dialog open={isModalOpen} onClose={handleModalClose}>
  <DialogTitle>
    Agregar punto
    <IconButton
      aria-label="close"
      onClick={handleModalClose}
      sx={{
        position: 'absolute',
        right: 10,
        top: 10,
        color: (theme) => theme.palette.grey[500]
      }}
    >
      <CloseIcon />
    </IconButton>
  </DialogTitle>
  <DialogContent>
    <DialogContentText>
      {selectedPoint
        ? `¿Quieres agregar este punto como el punto de recojo (A) o como otro punto de la ruta?`
        : 'No se ha seleccionado ningún punto.'}
    </DialogContentText>
  </DialogContent>
  <DialogActions sx={{mx: 2, mb: 1}}>
    <Button onClick={() => addPoint(true)} disabled={isLoading || points.length > 0} variant="contained" color="success" sx={{fontWeight: 'bold'}}>
      Punto de recojo (A)
    </Button>
    <Button onClick={() => addPoint(false)} disabled={isLoading || point.length === 0} variant="contained" color="primary" sx={{fontWeight: 'bold'}}>
      Agregar punto de ruta (B, C, D, E)
    </Button>
  </DialogActions>
</Dialog>

      <Dialog open={driverSelectionDialog} onClose={() => setDriverSelectionDialog(false)}>
        <DialogTitle sx={{ fontWeight: 'bold' }}>
          Seleccionar Conductor
          <IconButton
            aria-label="close"
            onClick={() => setDriverSelectionDialog(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedDriverData && (
            <DialogContentText>
              ¿Estás seguro de que deseas seleccionar al conductor {selectedDriverData.movilCode}?
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions sx={{mx: 2, mb: 1}}>
          <Button onClick={() => setDriverSelectionDialog(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDriverSelect} color="primary" variant="contained" sx={{fontWeight: 'bold'}}>
            Seleccionar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};