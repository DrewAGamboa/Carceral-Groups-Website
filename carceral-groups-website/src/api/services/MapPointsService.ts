/* eslint-disable @typescript-eslint/no-explicit-any */
import FiltersResponseFilter from '../../models/FiltersResponseFilter';
import GeographicLocationFilter from '../../models/GeographicLocationFilter';
import GeographicLocation from '../../models/GeographicLocation';
import GeographicDocument, { DocumentListResponseItem } from '../../models/GeographicDocument';
import DocumentResponse from '../../models/DocumentResponse';
import localforage from 'localforage';
import GeographicDocumentType from '../../models/GeographicDocumentType';

// defined in .env file
const backend_api_url = import.meta.env.VITE_BACKEND_API_URL

export type Location = {
    latlngStr: string;
    label: string;
}

/**
 * Retrieves unique document types for a specific geographic location.
 * 
 * API Call: GET /GeographicLocations/{id}/DocumentTypes
 * 
 * @param {GeographicLocation} geographicLocation - The geographic location object containing latitude and longitude.
 * @returns {string[]} An array of unique document types available at the specified geographic location.
 */
export const getGeographicLocationsDocumentTypes = async (geographicLocation: GeographicLocation) => {
    try {
        const geographicLocationId = geographicLocation.geographicLocationId
        console.log("TODO_getGeographicLocationsDocumentTypes_request", geographicLocation)
        const response = await fetch(`${backend_api_url}/geographiclocations/${geographicLocationId}/documenttypes`)
        const geographicDocumentTypes = await response.json() as GeographicDocumentType[];
        console.log("TODO_getGeographicLocationsDocumentTypes_response", geographicDocumentTypes)
        return geographicDocumentTypes

    }
    catch (error) {
        console.error('Error fetching geographic document types:', error);
        return [];
    }
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
export const getDocument = async (id: string) => {
    try {
        console.log("TODO_getDocument_request", id)
        const response = await fetch(`${backend_api_url}/Document/${id}`)
        const resJson = await response.json()
        console.log("TODO_getDocument_response", resJson)
        const geographicDocument = resJson as DocumentResponse
        return geographicDocument

    }
    catch (error) {
        console.error('Error fetching geographic document types:', error);
        return null;
    }
}

/**
 * Retrieves documents based on a specific geographic location and document type.
 * 
 * API Call: GET /Documents/{geographicLocationId}{documentTypeId}
 * 
 * @param {GeographicLocation} geographicLocation - The geographic location object containing latitude and longitude.
 * @param {GeographicDocumentType} documentType - The document type to filter by.
 * @returns {DocumentListResponseItem[]} An array of document list response items. Each object includes:
 *   - `DocumentId` {string} - The unique identifier for the document.
 *   - `DocumentTitle` {string} - The title of the document.
 */
export const getDocumentsByLocationAndType = async (geographicLocation: GeographicLocation, documentType: GeographicDocumentType) => {
    try {
        const geographicLocationId = geographicLocation.geographicLocationId
        const documentTypeId = documentType.documentTypeId
        console.log("TODO_getDocumentsByLocationAndType_request", geographicLocation, documentType)
        const response = await fetch(`${backend_api_url}/Documents/ByLocationAndType?geographicLocationId=${geographicLocationId}&documentTypeId=${documentTypeId}`)
        const responseModel: { documents: DocumentListResponseItem[] } = await response.json()
        console.log("TODO_getGeographicLocationsDocumentTypes_response", responseModel)
        const geographicDocuments = responseModel.documents
        return geographicDocuments

    }
    catch (error) {
        console.error('Error fetching geographic document types:', error);
        return [];
    }
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
        console.log("TODO_getFilterOptions_response", resJson)
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
export const getGeographicLocations = async (selectedGeographicLocationFilters: GeographicLocationFilter[]) => {
    if (selectedGeographicLocationFilters.length === 0) {
        return [];
    }
    try {
        const geographicFilterRequest = { filters: selectedGeographicLocationFilters }
        console.log("TODO_getGeographicLocations_request", geographicFilterRequest)
        const response = await fetch(`${backend_api_url}/geographiclocations`,
            {
                method: 'POST',
                body: JSON.stringify(geographicFilterRequest),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        const geographicLocations = await response.json() as GeographicLocation[];
        console.log("TODO_getGeographicLocation_response", geographicLocations)
        return geographicLocations

    }
    catch (error) {
        console.error('Error fetching geographic locations:', error);
        return [];
    }
}

/**
 * Filters and returns geographic documents with destinations of where they traveled to.
 * 
 * API Call: POST /GeographicLocations/destinations
 *
 * @param {GeographicLocationFilter[]} selectedGeographicLocationFilters - An array of filter objects used to filter the geographic locations. Each filter object contains a `Category` and `Institution`.
 * @returns {GeographicDocument[]} An array of geographic document objects that meet the filter criteria. Each object includes:
 * - `DocumentId` {string} - The unique identifier for the document.
 * - `ToGeographicLocations` {GeographicLocation[]} - An array of geographic locations that the document is associated with.
 * - `GeographicLocation` {GeographicLocation} - The geographic location object containing latitude and longitude.
 */
export const getGeographicDocumentDestinations = async (selectedGeographicLocationFilters: GeographicLocationFilter[]) => {
    if (selectedGeographicLocationFilters.length === 0) {
        return [];
    }
    try {
        const geographicFilterRequest = { filters: selectedGeographicLocationFilters }
        const response = await fetch(`${backend_api_url}/geographiclocations/destinations`,
            {
                method: 'POST',
                body: JSON.stringify(geographicFilterRequest),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        const geographicDocuments = await response.json() as GeographicDocument[];
        console.info('Get Response geographiclocations/destinations:', response)
        return geographicDocuments

    }
    catch (error) {
        console.error('Error fetching geographic document destinations:', error);
        return [];
    }
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

