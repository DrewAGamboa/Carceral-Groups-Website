import React, { useEffect, useRef } from 'react';
import L, { LeafletMouseEvent } from 'leaflet';
import './LeafletMap.css';

export interface LeafletMapProps {
  label: string;
  geojson?: any;
  tool: string;
  onMarkerClick: (latlng?: string) => void;
}

type LeafLetGroup = {
  group: L.LayerGroup;
  name: string;
};

type LeafLetHelper = {
  map: L.Map;
  groups: LeafLetGroup[];
};

const RedMarkerIcon = L.icon({
  // iconUrl: '/assets/red_pin.png',
  // TODO: figure out how to get the assets URL from the environment in squarespace.
  iconUrl: "https://vialekhnstore.z1.web.core.windows.net/assets/red_pin.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const LeafletMap: React.FC<LeafletMapProps> = ({ geojson, tool, onMarkerClick }) => {
  const leafletHelperRef = useRef<LeafLetHelper | null>(null);
  const toolRef = useRef<string>(tool);

  const handleOnMarkerClick = (event: LeafletMouseEvent) => {
    console.log(`Marker was clicked at ${event.latlng}}!`, event)
    const latlng = `${event.latlng.lat}, ${event.latlng.lng}`
    onMarkerClick(latlng)
  }

  useEffect(() => {
    if (!leafletHelperRef.current) {
      leafletHelperRef.current = { map: L.map('leaflet_map_container'), groups: [] };
      const map = leafletHelperRef.current.map
      console.log('Initializing map')
      // Initialize the map only when the div is available and the map hasn't been initialized
      let cartoTileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors, © CARTO'
      });

      map.setView([47.60, -122.33], 7); // Center map on Seattle, WA
      map.addLayer(cartoTileLayer);
    }

    // Cleanup function to remove the map on component unmount
    return () => {
      leafletHelperRef.current?.map.remove();
      leafletHelperRef.current = null;
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  useEffect(() => {
    toolRef.current = tool;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tool]); // Re-run this effect if tool prop changes

  useEffect(() => {
    console.log('GeoJSON:', geojson)
    const alreadyHasGeoJSON = leafletHelperRef.current?.groups.find(group => group.name === "GeoJSON");
    if (leafletHelperRef.current && alreadyHasGeoJSON) {
      leafletHelperRef.current.map.removeLayer(alreadyHasGeoJSON.group as L.LayerGroup);
      leafletHelperRef.current.groups = leafletHelperRef.current.groups.filter(group => group.name !== "GeoJSON");
    }
    
    if (leafletHelperRef.current && geojson) {
      // Add GeoJSON layer
      const geoJSON = L.geoJSON(geojson, {
        pointToLayer: (geoJsonPoint, latlng) => {
          return L.marker(latlng, { icon: RedMarkerIcon })
        },
        onEachFeature: (feature, layer) => {
          if (feature.properties?.popupContent) {
            layer.bindPopup(feature.properties.popupContent);
            layer.on('click', handleOnMarkerClick);
          }
        },
        filter: (feature) => {
          return feature.properties?.show_on_map;
        }
      }).addTo(leafletHelperRef.current.map);
      leafletHelperRef.current.groups.push({ group: geoJSON, name: "GeoJSON" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geojson]); // Re-run this effect if geojson prop changes

  return (
    <>
      <div id='leaflet_map_container' className="map-container" />
    </>
  );
};

export default LeafletMap;
