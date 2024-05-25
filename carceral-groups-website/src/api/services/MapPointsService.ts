/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import MapPoint from '../../models/MapPoint';
import MapPointCSVRow from '../../models/MapPointCSVRow'
import Papa from "papaparse"
import FiltersResponseFilter from '../../models/Filter';
import GeographicLocationFilter from '../../models/GeographicLocationFilter';
import GeographicLocation from '../../models/GeographicLocation';
import { GetLocationLabel } from '../../models/Location';
import { DocumentListResponseItem } from '../../models/GeographicDocument';
import DocumentResponse from '../../models/DocumentResponse';

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

/**
 * Retrieves unique document types for a specific geographic location.
 * 
 * API Call: GET /GeographicLocations/{id}/DocumentTypes
 * 
 * @param {GeographicLocation} geographicLocation - The geographic location object containing latitude and longitude.
 * @returns {string[]} An array of unique document types available at the specified geographic location.
 */
export const getGeographicLocationsDocumentTypes = (geographicLocation: GeographicLocation) => {
    // TODO: replace with api call START
    const points = getAllMapPoints();
    const filteredPoints = points.filter((point) => {
        const latlng = `${geographicLocation.Longitude}, ${geographicLocation.Latitude}`
        return point.latlngStr === latlng;
    });
    const documentTypes = uniqueDocumentTypes(filteredPoints).map((type) => type.documentType)
    // TODO: replace with api call END

    return documentTypes;
}

/**
 * Retrieves a document by its ID.
 * 
 * API Call: GET /Documents/{id}
 *
 * @param {string} id - The unique identifier of the document to retrieve.
 * @returns {(DocumentResponse | null)} The document object if found, otherwise null. Each document object includes:
 *   - `DocumentId` {string} - The unique identifier for the document.
 *   - `DocumentTitle` {string} - The title of the document.
 *   - `DocumentURI` {string} - The URI of the document.
 */
export const getDocument = (id: string) => {
    // TODO: replace with api call START
    const doc = dataset.find((doc) => doc.id === id);
    if (doc === undefined) return null;
    const DUMMY_FILE_URL = 'https://vialekhnstore.blob.core.windows.net/documents/All/Federal/Mexican American Self Help (MASH)/1971.07.21_Arellano Contribution MASH Pinto Fund.pdf'
    const document: DocumentResponse = {
        DocumentId: doc.id,
        DocumentTitle: doc.documentDisplayTitle,
        DocumentURI: DUMMY_FILE_URL, // TODO: change to actual file url
    };
    // TODO: replace with api call END
    return document;
}

/**
 * Retrieves documents based on a specific geographic location and document type.
 * 
 * API Call: GET /Documents/{geographicLocationId}{documentTypeId}
 * 
 * @param {GeographicLocation} geographicLocation - The geographic location object containing latitude and longitude.
 * @param {string} documentTypeId - The ID of the document type to filter by.
 * @returns {DocumentListResponseItem[]} An array of document list response items. Each object includes:
 *   - `DocumentId` {string} - The unique identifier for the document.
 *   - `DocumentTitle` {string} - The title of the document.
 */
export const getDocumentsByLocationAndType = (geographicLocation: GeographicLocation, documentTypeId: string) => {
    const response: { Documents: DocumentListResponseItem[] } = { Documents: [] }
    // TODO: replace with api call START
    const points = getAllMapPoints();
    const filteredPoints = points.filter((point) => {
        const latlng = `${geographicLocation.Longitude}, ${geographicLocation.Latitude}`
        const isType = point.documentType === documentTypeId;
        return point.latlngStr === latlng && isType;
    });
    filteredPoints.forEach((point) => {
        response.Documents.push({
            DocumentId: point.id,
            DocumentTitle: point.documentDisplayTitle
        });
    })
    // TODO: replace with api call END
    return response.Documents
}

/**
 * Retrieves filter options based on unique categories and institutions.
 * 
 * API Call: GET /Filters
 * 
 * @returns {FiltersResponseFilter[]} An array of filter objects. Each object includes:
 *   - `Category` {string} - The unique category name.
 *   - `Institutions` {string[]} - An array of institutions under the category.
 */
export const getFilterOptions = () => {
    const response: { Filters: FiltersResponseFilter[] } = { Filters: [] }
    // TODO: replace with an api call to get all categories START
    const groups = uniqueGroups(dataset);
    groups.forEach(cur => {
        const category = cur.parentGroup;
        const institution = cur.group;
        if (!response.Filters.some((cat) => cat.Category === category)) {
            response.Filters.push({
                Category: category,
                Institutions: []
            });
        }
        const foundCategory = response.Filters.find((cat) => cat.Category === category);
        foundCategory?.Institutions?.push(institution);
    });
    // TODO: replace with an api call to get all categories END
    return response.Filters;
}

/**
 * Filters and transforms geographic data points based on selected filters.
 * 
 * API Call: POST /GeographicLocations
 *
 * @param {GeographicLocationFilter[]} selectedGeographicLocationFilters - An array of filter objects used to filter the geographic locations. Each filter object contains a `Category` and `Institution`.
 * @returns {GeographicLocation[]} An array of geographic location objects that meet the filter criteria. Each object includes:
 *   - `GeographicLocationId` {string} - The unique identifier for the geographic location.
 *   - `GeographicLocationName` {string} - A label for the geographic location.
 *   - `Latitude` {string} - The latitude of the geographic location.
 *   - `Longitude` {string} - The longitude of the geographic location.
 */
export const getGeographicLocations = (selectedGeographicLocationFilters: GeographicLocationFilter[]) => {
    const geographicFilterRequest = { Filters: selectedGeographicLocationFilters }
    // TODO: replace with api call START
    const points = uniquePoints(dataset);
    const filteredPoints = points.filter((point) => {
        return geographicFilterRequest.Filters.some((filter) =>
            point.parentGroup === filter.Category && point.group === filter.Institution
        );
    });

    const geographicLocations: GeographicLocation[] = filteredPoints.map((point) => {
        const [latitude, longitude] = point.latlngStr.split(',').map((coord) => parseFloat(coord)).reverse();
        return {
            GeographicLocationId: point.id,
            GeographicLocationName: GetLocationLabel(point.latlngStr),
            Latitude: latitude.toString(),
            Longitude: longitude.toString(),
        }
    });
    // TODO: replace with api call END

    return geographicLocations
}
