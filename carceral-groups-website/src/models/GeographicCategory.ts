export const DUMMY_GEOGRAPHIC_CATEGORY: GeographicCategory[] = [
    {
        id: "1",
        name: "Federal",
    },
    {
        id: "2",
        name: "Media",
    },
    {
        id: "3",
        name: "Outside Community",
    },
    {
        id: "4",
        name: "State",
    }
]

type GeographicCategory = {
    id: string,
    name: string
}

export default GeographicCategory;