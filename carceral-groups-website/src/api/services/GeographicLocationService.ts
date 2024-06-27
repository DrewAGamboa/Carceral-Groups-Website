/* eslint-disable @typescript-eslint/no-explicit-any */
import GeographicLocation from "../../models/GeographicLocation"

// defined in .env file
const backend_api_url = import.meta.env.VITE_BACKEND_API_URL

export async function createGeographicLocation() {
    try {
        const newGeographicLocation: GeographicLocation = {
            geographicLocationId: -1,
            geographicLocationName: `A New Location ${Date.now()}`,
            latitude: "45",
            longitude: "-120",
        }

        const response = await fetch(`${backend_api_url}/GeographicLocation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newGeographicLocation)
        })
        const resJson = await response.json()
        const geographicLocation = resJson as GeographicLocation
        console.info('Create Response:', response, geographicLocation)
        return geographicLocation
    }
    catch (error) {
        console.error('Error creating geographicLocation:', error);
        return null;
    }
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
    try{
        const response = await fetch(`${backend_api_url}/GeographicLocation/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updates)
        })
        const resJson = await response.json()
        const updatedGeographicLocation = resJson as GeographicLocation
        console.info('Update Response:', response, updatedGeographicLocation)
        return updatedGeographicLocation;
    }
    catch (error) {
        console.error('Error updating geographic location:', error);
        return null;
    }
}

export async function deleteGeographicLocation(id: string) {
    try {
        const response = await fetch(`${backend_api_url}/GeographicLocation/${id}`, {
            method: 'DELETE',
        })
        console.info('Delete Response:', response)
        return true;
    }
    catch (error) {
        console.error('Error deleting geographic location:', error);
        return false;
    }
}
