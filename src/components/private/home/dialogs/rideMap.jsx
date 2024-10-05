import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import { theme } from '../../../../themes/themes';
import CloseIcon from '@mui/icons-material/Close';

const mapToken = import.meta.env.VITE_MAPBOX_TOKEN;
mapboxgl.accessToken = mapToken;

export const RideMap = ({ points, onPointsUpdate, initialCenter }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const maxPoints = 5;

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: initialCenter || [-66.1571, -17.3937],
      zoom: 12,
      dragPan: true,
    });

    mapRef.current.on('load', () => {
      mapRef.current.getCanvas().style.cursor = 'default';
      mapRef.current.on('click', handleMapClick);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [initialCenter]);

  useEffect(() => {
    if (!mapRef.current) return;

    // Remove existing markers and route
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
    if (mapRef.current.getLayer('route')) {
      mapRef.current.removeLayer('route');
      mapRef.current.removeSource('route');
    }

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
  }, [points]);

  const drawRoute = async () => {
    const coordinates = points.map(point => `${point.lng},${point.lat}`).join(';');
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0].geometry;

        mapRef.current.addSource('route', {
          'type': 'geojson',
          'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': route
          }
        });

        mapRef.current.addLayer({
          'id': 'route',
          'type': 'line',
          'source': 'route',
          'layout': {
            'line-join': 'round',
            'line-cap': 'round'
          },
          'paint': {
            'line-color': '#3b87e2',
            'line-width': 5,
          }
        });

        const bounds = new mapboxgl.LngLatBounds();
        route.coordinates.forEach(coord => bounds.extend(coord));
        mapRef.current.fitBounds(bounds, { padding: 50 });
      }
    } catch (error) {
      console.error('Error fetching route:', error);
    }
  };

  const handleMapClick = (e) => {
    if (points.length === maxPoints) {
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
      console.error('Error fetching geocoding data:', error);
    } finally {
      setIsLoading(false);
      handleModalClose();
    }
  };

  const updateMarkerPosition = async (index) => {
    const updatedPoints = [...points];
    const { lng, lat } = markersRef.current[index].getLngLat();

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();
      const newPlaceName = data.features[0]?.place_name || 'Ubicación desconocida';

      updatedPoints[index] = { lng, lat, name: newPlaceName };
      onPointsUpdate(updatedPoints);
    } catch (error) {
      console.error('Error fetching new location name:', error);
    }
  };

  return (
    <Box sx={{ position: 'relative', height: '100%' }}>
      <Box ref={mapContainerRef} sx={{ height: '100%', borderRadius: 2 }} />

      {isLoading && <p>Cargando nombre de la ubicación...</p>}

      <Dialog open={isModalOpen} onClose={handleModalClose}>
  <DialogTitle sx={{fontWeight: "bold"}}>
    Agregar Punto
    <IconButton
      aria-label="close"
      onClick={handleModalClose}
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
    <DialogContentText>
      ¿Quieres agregar este punto como el punto de recojo (A) o una parte de la ruta (B, C, D, E)?
    </DialogContentText>
  </DialogContent>
  <DialogActions sx={{mx: 2, mb: 1}}>
    <Button onClick={() => addPoint(true)} color="success" variant='contained' disabled={points.length > 0} sx={{fontWeight: 'bold'}}>
      Agregar punto de recojo (A)
    </Button>
    <Button onClick={() => addPoint(false)} color="primary" variant='contained' sx={{fontWeight: 'bold'}}>
      Agregar punto ruta
    </Button>
  </DialogActions>
</Dialog>
    </Box>
  );
};