export const DUMMY_GEOGRAPHIC_SUB_CATEGORY: GeographicSubCategory[] = [
    {
        id: "1",
        name: "Mexican American Self Help (MASH)",
    },
    {
        id: "2",
        name: "Seattle Post Intelligencer",
    },
    {
        id: "3",
        name: "Asian Pacific Islander Cultural Awareness Group (APICAG)",
    },
    {
        id: "4",
        name: "United Chicanos",
    }
]

type GeographicSubCategory = {
    id: string,
    name: string
}

export default GeographicSubCategory;