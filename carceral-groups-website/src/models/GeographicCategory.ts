export const DUMMY_GEOGRAPHIC_CATEGORY: GeographicCategory[] = [
    {
        categoryId: 1,
        name: "Federal",
    },
    {
        categoryId: 2,
        name: "Media",
    },
    {
        categoryId: 3,
        name: "Outside Community",
    },
    {
        categoryId: 4,
        name: "State",
    }
]

export const primaryKeyName = "categoryId"; // used in BasicTable.tsx

type GeographicCategory = {
    categoryId: number,
    name: string,
    color?: string
}

export default GeographicCategory;