export const DUMMY_GEO_DOCS: GeographicDocument[] = [
    {
        geographicDocumentId: "1",
        geographicDocumentTitle: "1969.05.05, Letter | Armando Mendoza to Tomas Ybarra Frausto",
        geographicDocumentUri: "https://vialekhnstore.blob.core.windows.net/documents/All/Federal/Mexican American Self Help (MASH)/1971.07.21_Arellano Contribution MASH Pinto Fund.pdf",
    },
    {
        geographicDocumentId: "2",
        geographicDocumentTitle: "1969.09.14, Photograph(s) | Unidentified Meeting",
        geographicDocumentUri: "https://vialekhnstore.blob.core.windows.net/documents/All/Federal/Mexican American Self Help (MASH)/1971.07.21_Arellano Contribution MASH Pinto Fund.pdf",
    },
    {
        geographicDocumentId: "3",
        geographicDocumentTitle: "2024.02.19, Ralph Dunuan 1",
        geographicDocumentUri: "https://vialekhnstore.blob.core.windows.net/documents/All/Federal/Mexican American Self Help (MASH)/1971.07.21_Arellano Contribution MASH Pinto Fund.pdf",
    },
]

type GeographicDocument = {
    geographicDocumentId: string
    geographicDocumentTitle: string
    geographicDocumentUri: string
    fromGeographicLocationId?: string
    fromGeographicCategoryId?: string
    fromGeographicSubCategoryId?: string
}

export type GeographicDocumentResponse = {
    geographicDocumentId: string
    geographicDocumentTitle: string
}

export default GeographicDocument;