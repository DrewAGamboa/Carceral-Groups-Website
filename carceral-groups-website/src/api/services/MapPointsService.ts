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

const dataset = (await getMapPointsCSV()).map(row => 
  new MapPoint(
    row.filter1,
    row.filter2,
    row.documentDisplayTitle,
    row.fileTitle,
    row.documentType,
    row.geographicLocation
  ));
  
// service methods
const getAllMapPoints = () => {
    return [...dataset]
}

const getUniqueGeoJsonPreppedPoints = () => {
  const points = uniquePoints(dataset);
  return points.map((doc) => doc.toGeoJson());
}

const getFilterOptions = () => {
    let filter: {label: string, checked: boolean, children: any[]} = {
        label: 'All',
        checked: true,
        children: []
    }
    const groups = uniqueGroups(dataset);
    groups.forEach(cur => {
        const parentGroup = cur.parentGroup;
        const subGroup = cur.group;
        const foundParentGroup = filter.children.find((group) => group.label === parentGroup);
        if (foundParentGroup) {
            foundParentGroup.children.push({
                label: subGroup,
                checked: true,
                children: []
            });
        }
        else{
            const parentFilter =  {
                label: parentGroup,
                checked: true,
                children: [
                    {
                        label: subGroup,
                        checked: true,
                        children: []
                    }
                ]
            }
            filter.children.push(parentFilter);
        }
    });
    return filter;
}

const getCarceralDocumentsByType = () => {
    const uniqueTypes = uniqueDocumentTypes(dataset);
    const docsByType = uniqueTypes.map((type) => {
        return {
            type: type.documentType,
            docs: dataset.filter((doc) => doc.documentType === type.documentType)
        }
    });
    return docsByType;
}
  
// internal methods
const uniquePoints = (docs: MapPoint[]) => {
    const uniqueObjects = docs.reduce((uniqueArr: MapPoint[], currentObj: MapPoint) => {
        const isDuplicate = uniqueArr.some((obj) => obj.uniqueGroupPoint === currentObj.uniqueGroupPoint);
        if (!isDuplicate) {
            uniqueArr.push(currentObj);
        }
        return uniqueArr;
    }, []);
    return uniqueObjects;
}

const uniqueGroups = (docs: MapPoint[]) => {
    const uniqueObjects = docs.reduce((uniqueArr: MapPoint[], currentObj: MapPoint) => {
        const isDuplicate = uniqueArr.some((obj) => obj.group === currentObj.group && obj.parentGroup === currentObj.parentGroup);
        if (!isDuplicate) {
            uniqueArr.push(currentObj);
        }
        return uniqueArr;
    }, []);
    return uniqueObjects;
}

const uniqueDocumentTypes = (docs: MapPoint[]) => {
    const uniqueObjects = docs.reduce((uniqueArr: MapPoint[], currentObj: MapPoint) => {
        const isDuplicate = uniqueArr.some((obj) => obj.documentType === currentObj.documentType);
        if (!isDuplicate) {
            uniqueArr.push(currentObj);
        }
        return uniqueArr;
    }, []);
    return uniqueObjects;
}

export { getAllMapPoints, getUniqueGeoJsonPreppedPoints, getFilterOptions, getCarceralDocumentsByType };