/* eslint-disable @typescript-eslint/no-explicit-any */
import GeographicDocumentType from "../../models/GeographicDocumentType"

// defined in .env file
const backend_api_url = import.meta.env.VITE_BACKEND_API_URL

export async function getDocumentTypes() {
    try {
        const response = await fetch(`${backend_api_url}/DocumentType`)
        const resJson = await response.json()
        const documentTypes = resJson as GeographicDocumentType[]
        return documentTypes
    }
    catch (error) {
        console.error('Error fetching documentTypes:', error);
        return [];
    }
}
