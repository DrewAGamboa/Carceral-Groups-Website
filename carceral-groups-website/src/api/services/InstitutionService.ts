/* eslint-disable @typescript-eslint/no-explicit-any */
import Institution from "../../models/Institution"

// defined in .env file
const backend_api_url = import.meta.env.VITE_BACKEND_API_URL

export async function createInstitution() {
    try {
        const response = await fetch(`${backend_api_url}/Institution`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(`New Institution ${Date.now()}`) // TODO: Revisit this if institution name is not the only field
        })
        const resJson = await response.json()
        const institution = resJson as Institution
        console.info('Create Response:', response, institution)
        return institution
    }
    catch (error) {
        console.error('Error creating institution:', error);
        return null;
    }
}

export async function getInstitutions() {
    try {
        const response = await fetch(`${backend_api_url}/Institution`)
        const resJson = await response.json()
        const institutions = resJson as Institution[]
        return institutions
    }
    catch (error) {
        console.error('Error fetching institutions:', error);
        return [];
    }
}

export async function getInstitution(id: string) {
    try {
        const response = await fetch(`${backend_api_url}/Institution/${id}`)
        const resJson = await response.json()
        const institution = resJson as Institution
        console.info('Get Response institution:', response, resJson)
        return institution
    }
    catch (error) {
        console.error('Error fetching institution:', error);
        return null;
    }
}

export async function updateInstitution(id: string, updates: any) {
    try{
        const response = await fetch(`${backend_api_url}/Institution/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updates.name) // TODO: Revisit this if category name is not the only field
        })
        const resJson = await response.json()
        const updatedInstitution = resJson as Institution
        console.info('Update Response:', response, updatedInstitution)
        return updatedInstitution;
    }
    catch (error) {
        console.error('Error updating institution:', error);
        return null;
    }
}

export async function deleteInstitution(id: string) {
    try {
        const response = await fetch(`${backend_api_url}/Institution/${id}`, {
            method: 'DELETE',
        })
        console.info('Delete Response:', response)
        return true;
    }
    catch (error) {
        console.error('Error deleting institution:', error);
        return false;
    }
}
