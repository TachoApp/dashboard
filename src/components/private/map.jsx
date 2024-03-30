import React from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%', 
};

const center = {
  lat: -17.3937,
  lng: -66.1571,
};

const drivers = [
  { code: 'DR001', name: 'Juan Pérez', lat: -17.3895186, lng: -66.1593585 },
  { code: 'DR002', name: 'María Rodríguez', lat: -17.3949844, lng: -66.1765852 },
  { code: 'DR003', name: 'Pedro Gómez', lat: -17.3822649, lng: -66.1488538 },
  { code: 'DR004', name: 'Ana Torres', lat: -17.3877768, lng: -66.1657557 },
  { code: 'DR005', name: 'Carlos Sánchez', lat: -17.3961209, lng: -66.1567706 },
  { code: 'DR006', name: 'Sofía Ramírez', lat: -17.3905672, lng: -66.1713299 },
  { code: 'DR007', name: 'Luis Hernández', lat: -17.3798062, lng: -66.1502224 },
  { code: 'DR008', name: 'Fernanda López', lat: -17.3940508, lng: -66.1628514 },
  { code: 'DR009', name: 'Diego Martínez', lat: -17.3873897, lng: -66.1582545 },
  { code: 'DR010', name: 'Valeria García', lat: -17.3925396, lng: -66.1498751 },
  { code: 'DR011', name: 'Andrés Gutiérrez', lat: -17.3846148, lng: -66.1662368 },
  { code: 'DR012', name: 'Laura Flores', lat: -17.3981571, lng: -66.1614132 },
  { code: 'DR013', name: 'Javier Rosales', lat: -17.3915925, lng: -66.1737556 },
  { code: 'DR014', name: 'Camila Herrera', lat: -17.3770524, lng: -66.1558451 },
  { code: 'DR015', name: 'Ricardo Morales', lat: -17.3932846, lng: -66.1601381 },
];

export const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDuPGoPpbEn3IERAonyLZhWW-h0jDwto1A',
  });
  const [selectedDriver, setSelectedDriver] = React.useState(null);

  const handleMarkerClick = (driver) => {
    setSelectedDriver(driver);
  };

  if (loadError) return <div>Error al cargar el mapa</div>;
  if (!isLoaded) return <div>Cargando el mapa...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
    >
      {drivers.map((driver) => (
        <Marker
          key={driver.codigo}
          position={{ lat: driver.latitud, lng: driver.longitud }}
          onClick={() => handleMarkerClick(driver)}
        >
          {selectedDriver === driver && (
            <InfoWindow onCloseClick={() => setSelectedDriver(null)}>
              <div>
                <p>Código: {driver.codigo}</p>
                <p>Nombre: {driver.nombre}</p>
              </div>
            </InfoWindow>
          )}
        </Marker>
      ))}
    </GoogleMap>
  );
};
