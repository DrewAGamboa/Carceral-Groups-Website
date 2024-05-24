export const DUMMY_FILTERS: Filter[] = [
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

type Filter = {
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


export default Filter