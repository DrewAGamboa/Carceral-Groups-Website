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
  typography: {
    fontFamily: [
      "Helvetica",
    ].join(',')
  }
});

function App() {
  const {
    filterOptions,
    selectedGeographicLocation,
    selectedGeoJSON,
    handleSelectedInstitutions,
    handleOnGeographicLocationClick,
    handleOnDetailsClose
  } = useLeafletMap()

  return (
    <ThemeProvider theme={darkTheme}>
      <MenuDrawer options={filterOptions} onOptionsChange={handleSelectedInstitutions} />
      <LeafletMap
        geojson={selectedGeoJSON}
        onMarkerClick={handleOnGeographicLocationClick}
      />
      <DetailsDrawer selectedMark={selectedGeographicLocation} onDetailsClose={handleOnDetailsClose} />
    </ThemeProvider>
  )
}

export default App
