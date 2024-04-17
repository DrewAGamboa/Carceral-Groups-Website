import axios from 'axios';
import MapPoint from '../../models/MapPoint';
import MapPointCSVRow from '../../models/MapPointCSVRow'
import Papa from "papaparse"

// fetches map point csv from azure blob storage
const getMapPointsCSV = async (): Promise<MapPointCSVRow[]> => {
  try {
    const response = await axios.get("https://carceralgroups.blob.core.windows.net/map-coordinates/map_coordinates.csv");

    const records = Papa.parse<MapPointCSVRow>(response.data, {
      header: true,
      delimiter: ",",
      skipEmptyLines: true
    }).data

    return records;
  } catch (error) {
    throw new Error('Error fetching or processing CSV file');
  }
};

// fetch data and create MapPoints
const dataset = (await getMapPointsCSV()).map(row => 
  new MapPoint(
    row.filter1,
    row.filter2,
    row.documentDisplayTitle,
    row.fileTitle,
    row.documentType,
    row.geographicLocation
  ));

const getAllMapPoints = () => {
    return [...dataset]
}

export default getAllMapPoints