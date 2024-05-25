/* eslint-disable @typescript-eslint/no-explicit-any */
import localforage from "localforage"
import GeographicDocument, { DUMMY_GEO_DOCS } from "../../models/GeographicDocument"
import { uploadFileToBlob } from "./AzureStorageService";

const localForageKey = "geo-docs"


export async function uploadFile(fileInfo: {fileToUpload: File}) {
    if (!fileInfo.fileToUpload.size) throw new TypeError("No file to upload");

    // upload file to Azure Blob Storage
    // get the URI of the uploaded file
    try {
        const url = await uploadFileToBlob(fileInfo.fileToUpload)
        const sasTokenIndex = url.indexOf('?');
        return url.substring(0, sasTokenIndex);
    } 
    catch (error) {
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
    let geographicDocuments = await localforage.getItem(localForageKey) as GeographicDocument[];
    if (!geographicDocuments) geographicDocuments = DUMMY_GEO_DOCS;
    return geographicDocuments
}

export async function getGeographicDocument(id: string) {
    const geographicDocuments = await getGeographicDocuments();
    const geographicDocument = geographicDocuments.find(
        geographicDocument => geographicDocument.geographicDocumentId === id
    );
    return geographicDocument ?? null;
}

export async function updateGeographicDocument(id: string, updates: any) {
    let geographicDocuments = await getGeographicDocuments();
    const geographicDocument = geographicDocuments.find(
        geographicDocument => geographicDocument.geographicDocumentId === id
    );
    const updatedGeographicDocument = { ...geographicDocument, ...updates }
    geographicDocuments = geographicDocuments.map(
        geographicDocument => geographicDocument.geographicDocumentId === id ? updatedGeographicDocument : geographicDocument
    )
    await set(geographicDocuments);
    return updatedGeographicDocument;
}

export async function deleteGeographicDocument(id: string) {
    let geographicDocuments = await getGeographicDocuments();
    const index = geographicDocuments.findIndex(
        geographicDocument => geographicDocument.geographicDocumentId === id
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
