import React, { useState } from 'react';
import './App.css';
import LeafletMap from './components/LeafletMap/LeafletMap';
import MiniDrawer from './components/MaterialUI/MiniDrawer';
import { createTheme, ThemeProvider } from '@mui/material';
import DataRow from './models/DataRow';
import CarceralDocument from './models/CarceralDocument';
import DetailsDrawer from './components/MaterialUI/DetailsDrawer';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [selectedMarker, setSelectedMarker] = useState<CarceralDocument[]>()
  const [tool, setTool] = useState<string>('')
  const [dataGeoJson, setDataGeoJson] = useState<any[]>([])
  const [treeData, setTreeData] = useState<{label: string, checked:boolean, children: any[]}>({ label: 'All', checked: true, children: [] });
  const [documents, setDocuments] = useState<CarceralDocument[]>([])

  const handleCheckboxChange = (updatedTreeData: { label: string, checked: boolean, children: any[] }) => {
    console.log('Updated Tree Data:', updatedTreeData)
    setTreeData(updatedTreeData)
    // get all options
    let queue = [updatedTreeData]
    let allOptions: any[] = []

    while (queue.length > 0) {
      let current = queue.shift()
      allOptions.push(current)
      if (current && current.children.length > 0)
        queue = queue.concat(current.children)
    }
    console.log(allOptions)

    // update geojson show on map
    let newGeoJson = dataGeoJson.map((feature) => {
      let show_on_map = allOptions.find((option) => option?.label === feature.properties.group)?.checked
      return {
        ...feature,
        properties: {
          ...feature.properties,
          show_on_map
        }
      }
    })
    setDataGeoJson(newGeoJson)
  }

  const handleOnMarkerClick = (latlng: string | undefined) => {
    console.log(`Map was clicked at ${latlng}}!`)
    const filtered = documents.filter((doc) => doc.getLatLngStr() === latlng)
    setSelectedMarker(filtered)
  }

  const handleCSVData = (data: DataRow[]) => {
    console.log('Data uploaded:', data)
    const documents = data.map((dataRow) => CarceralDocument.fromDataRow(dataRow));
    console.log('Documents:', documents);
    const uniqueGeoJsonPreppedData = CarceralDocument.uniqueGeoJsonPreppedPoints(documents);
    console.log('Unique GeoJson Prepped Data:', uniqueGeoJsonPreppedData);
    setDataGeoJson(uniqueGeoJsonPreppedData);
    setTreeData(CarceralDocument.filterOptions(documents));
    setDocuments(documents);
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <MiniDrawer options={treeData} onOptionsChange={handleCheckboxChange} onUpload={handleCSVData}>
        <div className="App">
          <LeafletMap
            label='My Leaflet Map'
            tool={tool}
            geojson={dataGeoJson}
            onMarkerClick={handleOnMarkerClick}
          />
          <DetailsDrawer selectedMark={selectedMarker} />
        </div>
      </MiniDrawer>
    </ThemeProvider>
  );
}

export default App;
