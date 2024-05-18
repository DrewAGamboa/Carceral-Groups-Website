/* eslint-disable @typescript-eslint/no-explicit-any */
import localforage from "localforage"
import GeographicLocation, { DUMMY_GEO_LOCS } from "../../models/GeographicLocation"

const localForageKey = "geo-locs"

export async function createGeographicLocation() {
    const id = Date.now().toString()
    const newGeographicLocation = {
        geographicLocationId: id,
        geographicLocationLat: "45",
        geographicLocationLong: "-120",
        geographicLocationName: "A New Location",
    }
    let geographicLocations = await getGeographicLocations();
    geographicLocations = [newGeographicLocation, ...geographicLocations]
    await set(geographicLocations);
    return newGeographicLocation;
}

export async function getGeographicLocations() {
    let geographicLocations = await localforage.getItem(localForageKey) as GeographicLocation[];
    if (!geographicLocations) geographicLocations = DUMMY_GEO_LOCS;
    return geographicLocations
}

export async function getGeographicLocation(id: string) {
    const geographicLocations = await getGeographicLocations();
    const geographicLocation = geographicLocations.find(
        geographicLocation => geographicLocation.geographicLocationId === id
    );
    return geographicLocation ?? null;
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
