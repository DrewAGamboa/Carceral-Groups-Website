/* eslint-disable @typescript-eslint/no-explicit-any */
import localforage from "localforage"
import GeographicDocument, { DUMMY_GEO_DOCS } from "../../models/GeographicDocument"

const localForageKey = "geo-docs"

export async function createGeographicDocument() {
    const id = Date.now().toString()
    const newGeographicDocument = {
        geographicDocumentId: id,
        geographicDocumentTitle: "1970.03.15, Letter | Pablo Griego to Theresa Aragon de Shepro",
        geographicDocumentUri: "https://vialekhnstore.blob.core.windows.net/documents/All/Federal/Mexican American Self Help (MASH)/1971.07.21_Arellano Contribution MASH Pinto Fund.pdf",
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
