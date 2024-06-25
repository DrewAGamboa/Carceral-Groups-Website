/* eslint-disable @typescript-eslint/no-explicit-any */
import localforage from "localforage"
import GeographicDocument from "../../models/GeographicDocument"
import { uploadFileToBlob } from "./AzureStorageService";

const localForageKey = "geo-docs"

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
    const id = Date.now().toString()
    const newGeographicDocument = {
        ...newDocument,
        geographicDocumentId: id,
    }
    let geographicDocuments = await getGeographicDocuments();
    geographicDocuments = [newGeographicDocument, ...geographicDocuments]
    await set(geographicDocuments);
    return newGeographicDocument;
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
    let geographicDocuments = await getGeographicDocuments();
    const geographicDocument = geographicDocuments.find(
        geographicDocument => geographicDocument.documentId === id
    );
    const updatedGeographicDocument = { ...geographicDocument, ...updates }
    geographicDocuments = geographicDocuments.map(
        geographicDocument => geographicDocument.documentId === id ? updatedGeographicDocument : geographicDocument
    )
    await set(geographicDocuments);
    return updatedGeographicDocument;
}

export async function deleteGeographicDocument(id: string) {
    let geographicDocuments = await getGeographicDocuments();
    const index = geographicDocuments.findIndex(
        geographicDocument => geographicDocument.documentId === id
    );
    if (index > -1) {
        geographicDocuments.splice(index, 1);
        geographicDocuments = [...geographicDocuments]
        await set(geographicDocuments);
        return true;
    }
    return false;
}

function set(geographicDocuments: GeographicDocument[]) {
    return localforage.setItem(localForageKey, geographicDocuments);
}
