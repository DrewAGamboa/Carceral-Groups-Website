export const DUMMY_FILTERS: FiltersResponseFilter[] = [
    {
        Category: "Federal",
        Institutions: [
            "Washington Corrections Center",
        ]
    },
    {
        Category: "State",
        Institutions: [
            "Evergreen Newsroom, Murrow Center",
            "La Escuelita, Granger, WA"
        ]
    },
]

type FiltersResponseFilter = {
    Category: string,
    Institutions?: string[],
}

export type FilterOption = {
    prefix: string,
    label: string,
    level: number,
    checked: boolean
    indeterminate: boolean
}


export default FiltersResponseFilter