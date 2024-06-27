/* eslint-disable @typescript-eslint/no-explicit-any */
import GeographicDocument from "../../models/GeographicDocument"
import { uploadFileToBlob } from "./AzureStorageService";


// defined in .env file
const backend_api_url = import.meta.env.VITE_BACKEND_API_URL

export async function uploadFile(fileInfo: {fileToUpload: File}) {
    if (!fileInfo.fileToUpload.size) throw new TypeError("No file to upload");

    // upload file to Azure Blob Storage
    // get the URI of the uploaded file
    try {
        const url = await uploadFileToBlob(fileInfo.fileToUpload)
        return url;
    } 
    catch (error) {
        console.error("Error uploading file to Azure Blob Storage:", error);
        throw new Error("Error uploading file to Azure Blob Storage")
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function createGeographicDocument(newDocument: GeographicDocument) {
    try {
        const response = await fetch(`${backend_api_url}/Document`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newDocument)
        })
        const resJson = await response.json()
        const geographicDocument = resJson as GeographicDocument
        console.info('Create Response:', response, geographicDocument)
        return geographicDocument
    }
    catch (error) {
        console.error('Error creating geographicDocument:', error);
        return null;
    }
}

export async function getGeographicDocuments() {
    try {
        const response = await fetch(`${backend_api_url}/Document`)
        console.info('Get Response geographicDocuments:', response)
        const resJson = await response.json()
        const geographicDocuments = resJson as GeographicDocument[]
        return geographicDocuments
    }
    catch (error) {
        console.error('Error fetching geographicDocuments:', error);
        return [];
    }
}

export async function getGeographicDocument(id: string) {
    try {
        const response = await fetch(`${backend_api_url}/Document/${id}`)
        const resJson = await response.json()
        const geographicDocument = resJson as GeographicDocument
        console.info('Get Response geographicDocument:', response, resJson)
        return geographicDocument
    }
    catch (error) {
        console.error('Error fetching geographicDocument:', error);
        return null;
    }
}

export async function updateGeographicDocument(id: string, updates: any) {
    try{
        const response = await fetch(`${backend_api_url}/Document/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updates)
        })
        const resJson = await response.json()
        const updatedGeographicDocument = resJson as GeographicDocument
        console.info('Update Response:', response, updatedGeographicDocument)
        return updatedGeographicDocument;
    }
    catch (error) {
        console.error('Error updating geographic document:', error);
        return null;
    }
}

export async function deleteGeographicDocument(id: string) {
    try {
        const response = await fetch(`${backend_api_url}/Document/${id}`, {
            method: 'DELETE',
        })
        console.info('Delete Response:', response)
        return true;
    }
    catch (error) {
        console.error('Error deleting geographic document:', error);
        return false;
    }
}
