export const DUMMY_GEO_DOCS: GeographicDocument[] = [
    {
        documentId: "1",
        documentTitle: "1969.05.05, Letter | Armando Mendoza to Tomas Ybarra Frausto",
        uri: "https://vialekhnstore.blob.core.windows.net/documents/All/Federal/Mexican American Self Help (MASH)/1971.07.21_Arellano Contribution MASH Pinto Fund.pdf",
        fileTitle: "",
        documentTypeId: 0,
        fileTypeId: 0,
        categoryId: 0,
        institutionId: 0,
        geographicLocationId: 0
    },
    {
        documentId: "2",
        documentTitle: "1969.09.14, Photograph(s) | Unidentified Meeting",
        uri: "https://vialekhnstore.blob.core.windows.net/documents/All/Federal/Mexican American Self Help (MASH)/1971.07.21_Arellano Contribution MASH Pinto Fund.pdf",
        fileTitle: "",
        documentTypeId: 0,
        fileTypeId: 0,
        categoryId: 0,
        institutionId: 0,
        geographicLocationId: 0
    },
    {
        documentId: "3",
        documentTitle: "2024.02.19, Ralph Dunuan 1",
        uri: "https://vialekhnstore.blob.core.windows.net/documents/All/Federal/Mexican American Self Help (MASH)/1971.07.21_Arellano Contribution MASH Pinto Fund.pdf",
        fileTitle: "",
        documentTypeId: 0,
        fileTypeId: 0,
        categoryId: 0,
        institutionId: 0,
        geographicLocationId: 0
    },
]

export const primaryKeyName = "documentId"; // used in BasicTable.tsx

type GeographicDocument = {
    documentId: string
    documentTitle?: string
    fileTitle?: string
    uri?: string
    citation?: string
    documentTypeId: number
    fileTypeId: number
    categoryId: number
    institutionId: number
    geographicLocationId: number
    toGeographicLocations?: number[]
}

export type DocumentListResponseItem = {
    documentId: string
    documentTitle: string
}

export default GeographicDocument;
