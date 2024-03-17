import React, { useState } from 'react';
import './App.css';
import LeafletMap from './components/LeafletMap/LeafletMap';
import ColorToggleButton from './components/MaterialUI/ColorToggleOptions';
import AnchorTemporaryDrawer from './components/MaterialUI/AnchorTemporaryDrawer';



const GEOJSONFEATURE = [
  {
    "type": "Feature",
    "properties": {
      "name": "Coors Field",
      "amenity": "Baseball Stadium",
      "popupContent": "This is where the Rockies play!",
      "group": "GroupA"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-122.200241, 47.847838]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "name": "My Feature",
      "amenity": "Baseball Stadium",
      "popupContent": "Hello from my marker!",
      "group": "GroupB"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-122.2003, 47.847838]
    }
  }
]

function App() {
  const [selectedMarker, setSelectedMarker] = useState<string>()
  const [tool, setTool] = useState<string>('')
  const [dataGeoJson, setDataGeoJson] = useState<any[]>(GEOJSONFEATURE)

  const handleAlignmentChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setTool(newAlignment)
  };

  const handleOnMarkerClick = (latlng: string | undefined) => {
    console.log(`Map was clicked at ${latlng}}!`)
    setSelectedMarker(latlng)
  }

  return (
    <div className="App">
      <LeafletMap
        label='My Leaflet Map'
        tool={tool}
        geojson={dataGeoJson}
        onMarkerClick={handleOnMarkerClick}
      />
      <div>
        <ColorToggleButton alignment={tool} handleChange={handleAlignmentChange} />
        <AnchorTemporaryDrawer selectedMark={selectedMarker} />
        <h1>Info</h1>
        {selectedMarker && <div>Marker: {selectedMarker}</div>}
        {tool && <div>Current Tool: {tool}</div>}
      </div>
    </div>
  );
}

export default App;
