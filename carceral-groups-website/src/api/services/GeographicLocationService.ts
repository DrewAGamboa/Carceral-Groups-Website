/* eslint-disable @typescript-eslint/no-explicit-any */
import localforage from "localforage"
import GeographicLocation from "../../models/GeographicLocation"

const localForageKey = "geo-locs"
// defined in .env file
const backend_api_url = import.meta.env.VITE_BACKEND_API_URL

export async function createGeographicLocation() {
    const id = Date.now().toString()
    const newGeographicLocation: GeographicLocation = {
        geographicLocationId: id,
        geographicLocationName: "A New Location",
        latitude: "45",
        longitude: "-120",
    }
    let geographicLocations = await getGeographicLocations();
    geographicLocations = [newGeographicLocation, ...geographicLocations]
    await set(geographicLocations);
    return newGeographicLocation;
}

export async function getGeographicLocations() {
    try {
        const response = await fetch(`${backend_api_url}/GeographicLocation`)
        const resJson = await response.json()
        const geographicLocations = resJson as GeographicLocation[]
        console.info('Get Response geographicLocations:', response, resJson)
        return geographicLocations
    }
    catch (error) {
        console.error('Error fetching geographicLocations:', error);
        return [];
    }
}

export async function getGeographicLocation(id: string) {
    try {
        const response = await fetch(`${backend_api_url}/GeographicLocation/${id}`)
        const resJson = await response.json()
        const geographicLocation = resJson as GeographicLocation
        console.info('Get Response geographicLocation:', response, resJson)
        return geographicLocation
    }
    catch (error) {
        console.error('Error fetching geographicLocation:', error);
        return null;
    }
}

export async function updateGeographicLocation(id: string, updates: any) {
    let geographicLocations = await getGeographicLocations();
    const geographicLocation = geographicLocations.find(
        geographicLocation => geographicLocation.geographicLocationId === id
    );
    const updatedGeographicLocation = { ...geographicLocation, ...updates }
    geographicLocations = geographicLocations.map(
        geographicLocation => geographicLocation.geographicLocationId === id ? updatedGeographicLocation : geographicLocation
    )
    await set(geographicLocations);
    return updatedGeographicLocation;
}

export async function deleteGeographicLocation(id: string) {
    let geographicLocations = await getGeographicLocations();
    const index = geographicLocations.findIndex(
        geographicLocation => geographicLocation.geographicLocationId === id
    );
    if (index > -1) {
        geographicLocations.splice(index, 1);
        geographicLocations = [...geographicLocations]
        await set(geographicLocations);
        return true;
    }
    return false;
}

function set(geographicLocations: GeographicLocation[]) {
    return localforage.setItem(localForageKey, geographicLocations);
}
