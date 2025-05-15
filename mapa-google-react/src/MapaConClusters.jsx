import { GoogleMap, LoadScript, Marker, MarkerClustererF } from "@react-google-maps/api";
import { useState } from "react";

const containerStyle = {
  width: '100%',
  height: '500px',
};

const center = {
  lat: 23.2186908,
  lng: -106.4137016,
};

// Simulación de múltiples ubicaciones cercanas
const locations = [
  { lat: 23.2186908, lng: -106.4137016 },
  { lat: 23.2200000, lng: -106.4120000 },
  { lat: 23.2175000, lng: -106.4140000 },
  { lat: 23.2195000, lng: -106.4155000 },
  { lat: 23.2160000, lng: -106.4110000 },
];

export default function MapaConClusters() {
  const [selected, setSelected] = useState(null);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
        <MarkerClustererF>
          {(clusterer) =>
            locations.map((location, index) => (
              <Marker
                key={index}
                position={location}
                clusterer={clusterer}
                onClick={() => setSelected(location)}
              />
            ))
          }
        </MarkerClustererF>

        {selected && (
          <InfoWindow
            position={selected}
            onCloseClick={() => setSelected(null)}
          >
            <div>
              <h2 className="text-lg font-bold">Ubicación seleccionada</h2>
              <p>Coordenadas: {selected.lat}, {selected.lng}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
}
