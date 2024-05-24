/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import MapPoint from '../../models/MapPoint';
import MapPointCSVRow from '../../models/MapPointCSVRow'
import Papa from "papaparse"
import { BlobDocument } from '../../models/BlobDocument';
import Filter from '../../models/Filter';
import GeographicLocationFilter from '../../models/GeographicLocationFilter';
import GeographicLocation from '../../models/GeographicLocation';
import { GetLocationLabel } from '../../models/Location';

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

const getGeographicLocations = (selectedGeographicLocationFilters: GeographicLocationFilter[]) => {
    // TODO: replace with api call START
    console.log('TODO_getGeographicLocations', selectedGeographicLocationFilters)
    const points = uniquePoints(dataset);
    const filteredPoints = points.filter((point) => {
        return selectedGeographicLocationFilters.some((filter) =>
            point.parentGroup === filter.Category && point.group === filter.Institution
        );
    });

    const geographicLocations: GeographicLocation[] = filteredPoints.map((point) => {
        const [latitude, longitude] = point.latlngStr.split(',').map((coord) => parseFloat(coord)).reverse();
        return {
            geographicLocationId: point.id,
            geographicLocationLat: latitude.toString(),
            geographicLocationLong: longitude.toString(),
            geographicLocationName: GetLocationLabel(point.latlngStr),
        }
    });
    // TODO: replace with api call END

    return geographicLocations
}

const getFilterOptions = () => {
    const categories: Filter[] = [];

    // replace with an api call to get all categories
    const groups = uniqueGroups(dataset);
    groups.forEach(cur => {
        const category = cur.parentGroup;
        const institution = cur.group;
        if (!categories.some((cat) => cat.Category === category)) {
            categories.push({
                Category: category,
                Institutions: []
            });
        }
        const foundCategory = categories.find((cat) => cat.Category === category);
        foundCategory?.Institutions?.push(institution);
    });
    console.log('TODO_getFilterOptions', categories, groups)

    return categories;
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

const getDocument = (document_id: string) => {
    const doc = dataset.find((doc) => doc.id === document_id);
    if (doc === undefined) return null;

    const blobDocument: BlobDocument = {
        id: doc.id,
        title: doc.documentDisplayTitle,
        fileUrl: doc.fileTitle, // TODO: change to actual file url
        type: doc.documentType
    };
    return blobDocument;
}

export { getAllMapPoints, getGeographicLocations, getFilterOptions, getCarceralDocumentsByType, getDocument };