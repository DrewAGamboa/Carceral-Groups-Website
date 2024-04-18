import './App.css';
import LeafletMap from './components/LeafletMap/LeafletMap';
import MenuDrawer from './components/MaterialUI/MenuDrawer';
import { createTheme, ThemeProvider } from '@mui/material';
import DetailsDrawer from './components/MaterialUI/DetailsDrawer';
import useLeafletMap from './hooks/useLeafletMap';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const {
        selectedMarker,
        dataGeoJson,
        treeData,
        handleCheckboxChange,
        handleOnMarkerClick
  } = useLeafletMap()

  return (
    <ThemeProvider theme={darkTheme}>  
      <MenuDrawer options={treeData} onOptionsChange={handleCheckboxChange} />
      <div className="App">
          <LeafletMap 
            label='My Leaflet Map'
            tool={'none'}
            geojson={dataGeoJson}
            onMarkerClick={handleOnMarkerClick}
          />
          <DetailsDrawer selectedMark={selectedMarker} />
        </div>
    </ThemeProvider>
  )
}

export default App
