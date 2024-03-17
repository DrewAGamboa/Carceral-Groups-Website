import React, { useEffect, useRef } from 'react';
import L, { LeafletMouseEvent } from 'leaflet';
import './LeafletMap.css';

export interface LeafletMapProps {
  label: string;
  geojson?: any;
  tool: string;
  onMarkerClick: (latlng?: string) => void;
}

const LeafletMap: React.FC<LeafletMapProps> = ({ geojson, tool, onMarkerClick }) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapLayerControlRef = useRef<L.Control.Layers | null>(null);
  const mapCustomLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const toolRef = useRef<string>(tool);

  const handleOnMarkerClick = (event: LeafletMouseEvent) => {
    console.log(`Marker was clicked at ${event.latlng}}!`, event)
    const latlng = event.latlng.toString()

    onMarkerClick(latlng.toString())
  }

  const handleMapClick = (event: LeafletMouseEvent) => {
    const curTool = toolRef.current;
    console.log(`Map was clicked at ${event.latlng}!`);
    console.log('Tool:', curTool)
    if (curTool === 'place_marker') {
      console.log('Placing marker');
      const marker = L.marker(event.latlng).addTo(mapRef.current as L.Map);
      marker.bindPopup('You clicked here!').openPopup();
      marker.on('click', () => onMarkerClick(event.latlng.toString()));
      mapCustomLayerGroupRef.current?.addLayer(marker);
    } else {
      console.log('clicked map but no tool selected');
    }
  };

  useEffect(() => {
    if (!mapRef.current) {
      console.log('Initializing map')
      // Initialize the map only when the div is available and the map hasn't been initialized
      let cartoTileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors, © CARTO'
      });

      let osmTileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      });

      mapRef.current = L.map('leaflet_map_container', {center: [47.84, -122.21], zoom: 13, layers: [cartoTileLayer, osmTileLayer]})
      mapCustomLayerGroupRef.current = L.layerGroup().addTo(mapRef.current);
      mapLayerControlRef.current = L.control.layers({ "Carto Dark Matter": cartoTileLayer, "OSM": osmTileLayer }).addTo(mapRef.current);
      mapLayerControlRef.current?.addOverlay(mapCustomLayerGroupRef.current, "User Added Layer");
      mapRef.current.on('click', handleMapClick);

      // Attempt to use geolocation
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        mapRef.current?.setView([latitude, longitude], 13);
      });
    }

    // Cleanup function to remove the map on component unmount
    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  useEffect(() => {
    toolRef.current = tool;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tool]); // Re-run this effect if tool prop changes

  useEffect(() => {
    if (mapRef.current && geojson) {
      // Add GeoJSON layer
      const geoJSON = L.geoJSON(geojson, {
        onEachFeature: (feature, layer) => {
          if (feature.properties?.popupContent) {
            layer.bindPopup(feature.properties.popupContent);
            layer.on('click', handleOnMarkerClick);
          }
        },
      }).addTo(mapRef.current);
      mapLayerControlRef.current?.addOverlay(geoJSON, 'GeoJSON');
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
