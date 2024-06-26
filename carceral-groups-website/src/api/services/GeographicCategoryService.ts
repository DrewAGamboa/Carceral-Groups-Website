/* eslint-disable @typescript-eslint/no-explicit-any */
import GeographicCategory from "../../models/GeographicCategory"

// defined in .env file
const backend_api_url = import.meta.env.VITE_BACKEND_API_URL

export async function createGeographicCategory() {
    try {
        const name = `New Category ${Date.now()}`
        const response = await fetch(`${backend_api_url}/Category`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name})
        
        })
        const resJson = await response.json()
        const geographicDocument = resJson as GeographicCategory
        console.info('Create Response:', response, geographicDocument)
        return geographicDocument
    }
    catch (error) {
        console.error('Error creating geographic category:', error);
        return null;
    }
}

export async function getGeographicCategorys() {
    try {
        const response = await fetch(`${backend_api_url}/Category`)
        const resJson = await response.json()
        const geographicDocument = resJson as GeographicCategory[]
        return geographicDocument
    }
    catch (error) {
        console.error('Error fetching geographic categories:', error);
        return [];
    }
}

export async function getGeographicCategory(id: string) {
    try {
        const response = await fetch(`${backend_api_url}/Category/${id}`)
        const resJson = await response.json()
        const category = resJson as GeographicCategory
        console.info('Get Response category:', response, resJson)
        return category
    }
    catch (error) {
        console.error('Error fetching category:', error);
        return null;
    }
}

export async function updateGeographicCategory(id: string, updates: any) {
    try{
        const updatedCategory = { ...updates, color: updates.color?.length > 0 ? updates.color : undefined}
        const response = await fetch(`${backend_api_url}/Category/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedCategory)
        })
        const resJson = await response.json()
        const updatedGeographicCategory = resJson as GeographicCategory
        console.info('Update Response:', response, updatedGeographicCategory)
        return updatedGeographicCategory;
    }
    catch (error) {
        console.error('Error updating geographic category:', error);
        return null;
    }
}

export async function deleteGeographicCategory(id: string) {
    try {
        const response = await fetch(`${backend_api_url}/Category/${id}`, {
            method: 'DELETE',
        })
        console.info('Delete Response:', response)
        return true;
    }
    catch (error) {
        console.error('Error deleting geographic category:', error);
        return false;
    }
}
