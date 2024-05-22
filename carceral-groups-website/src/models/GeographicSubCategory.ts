export const DUMMY_GEOGRAPHIC_SUB_CATEGORY: GeographicSubCategory[] = [
    { id: '1', name: 'Daily Evergreen' },
    { id: '2', name: 'Union Bulletin' },
    { id: '3', name: 'Seattle Post Intelligencer' },
    { id: '4', name: 'American Civil Liberties Union (ACLU)' },
    { id: '5', name: 'Black Panther Party Seattle Chapter' },
    { id: '6', name: 'Cons Unlimited' },
    { id: '7', name: 'UW MECHA' },
    { id: '8', name: 'Tacoma Urban League' },
    { id: '9', name: 'Asian Pacific Islander Cultural Awareness Group (APICAG)' },
    { id: '10', name: 'Chicano Carnalism y Cultura' },
    { id: '11', name: 'United Chicanos' },
]

type GeographicSubCategory = {
    id: string,
    name: string
}

export default GeographicSubCategory;