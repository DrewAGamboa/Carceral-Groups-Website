export const primaryKeyName = "documentTypeId"; // used in BasicTable.tsx

// Must use GeographicDocumentType. Trying to use DocumentType will clash with https://developer.mozilla.org/en-US/docs/Web/API/DocumentType
type GeographicDocumentType = {
    documentTypeId: string,
    name: string,
}

export default GeographicDocumentType;