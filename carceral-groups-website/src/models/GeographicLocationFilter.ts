
type GeographicLocationFilter = {
    Category: string,
    Institution: string,
    // clarify whether to track id or name to pass to api
    CategoryId?: string,
    InstitutionId?: string,
}

export default GeographicLocationFilter