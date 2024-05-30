/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import MapPoint from '../../models/MapPoint';
import MapPointCSVRow from '../../models/MapPointCSVRow'
import Papa from "papaparse"
import FiltersResponseFilter from '../../models/FiltersResponseFilter';
import GeographicLocationFilter from '../../models/GeographicLocationFilter';
import GeographicLocation from '../../models/GeographicLocation';
import { DocumentListResponseItem } from '../../models/GeographicDocument';
import DocumentResponse from '../../models/DocumentResponse';
import localforage from 'localforage';

// defined in .env file
const backend_api_url = import.meta.env.VITE_BACKEND_API_URL

// fetches map point csv from azure blob storage
const getMapPointsCSV = async (): Promise<MapPointCSVRow[]> => {
    try {
        const response = await axios.get("https://carceralwebmapstorage.blob.core.windows.net/map-coordinates/map_coordinates.csv");

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

export type Location = {
    latlngStr: string;
    label: string;
}

// TODO: Remove when backend api is connected
const MARKERLOCATIONS: Location[] = [
    { latlngStr: '47.299723843258185, -123.17403244585927', label: 'Washington Corrections Center' },
    { latlngStr: '46.92520017548775, -123.92100101336285', label: 'Stafford Creek Corrections Center' },
    { latlngStr: '46.07812903003074, -118.35677764875055', label: 'Washington State Penitentiary' },
    { latlngStr: '46.73098767622705, -117.16580759999998', label: 'Evergreen Newsroom, Murrow Center' },
    { latlngStr: '47.19686490207005, -122.6579449486688', label: 'McNeil Island Corrections Center' },
    { latlngStr: '47.61945939065681, -122.359439800832', label: 'Seattle Post Intelligencer building' },
    { latlngStr: '47.601990221257424, -122.33189048910353', label: 'Smith Tower, ACLU of Washington state office' },
    { latlngStr: '46.345958963317436, -120.19008248921602', label: 'La Escuelita, Granger, WA' },
    { latlngStr: '47.65479243631465, -122.30745790445988', label: 'University of Washington' },
    { latlngStr: '47.60334696496473, -122.30660900064738', label: 'Black Panthers Party Headquarters (second location)' },
    { latlngStr: '47.61945939065681, -122.359439800832', label: 'Seattle Post Intelligencer building' },
    { latlngStr: '47.65835361274492, -122.30385550858871', label: 'McMahon Hall, University of Washington' },
    { latlngStr: '47.246334710589394, -122.45096066974075', label: 'Tacoma Urban League' },
    { latlngStr: '47.84570689182511, -122.00011294155688', label: 'Monroe Correctional Complex' },
]
const GetLocationLabel = (latlngStr: string): string => {
    const location = MARKERLOCATIONS.find((marker) => marker.latlngStr === latlngStr);
    return location ? location.label : latlngStr;
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
export const getFilterOptions = async () => {
    try {
        const resJson = await fetchWithLocalCache(`${backend_api_url}/filters`, 'filters')
        const filters = resJson.filters as FiltersResponseFilter[];
        return filters;
    } catch (error) {
        console.error('Error fetching or processing filters:', error);
        return [];
    }
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

const fetchWithLocalCache = async (url: string, cacheKey: string, cacheDuration: number = 5) => {
    const now = new Date().getTime();

    const cache: { timestamp: number, data: string } | null = await localforage.getItem(cacheKey);
    // check cache if it exists
    if (cache) {
        const { timestamp, data } = cache;
        // if it does, check if it's expired
        if (now - timestamp < cacheDuration * 60 * 1000) {
            // if it's not expired, return cache
            const parsedData = JSON.parse(data);
            return parsedData;
        }
    }
    // if it's expired, fetch new data and update cache
    const response = await fetch(url);
    const data = await response.json();
    localforage.setItem(cacheKey, JSON.stringify({
        timestamp: now,
        data,
    }));
    return data;
}

