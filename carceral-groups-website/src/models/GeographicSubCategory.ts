export const DUMMY_GEOGRAPHIC_SUB_CATEGORY: GeographicSubCategory[] = [
    { institutionId: 1, name: 'Daily Evergreen' },
    { institutionId: 2, name: 'Union Bulletin' },
    { institutionId: 3, name: 'Seattle Post Intelligencer' },
    { institutionId: 4, name: 'American Civil Liberties Union (ACLU)' },
    { institutionId: 5, name: 'Black Panther Party Seattle Chapter' },
    { institutionId: 6, name: 'Cons Unlimited' },
    { institutionId: 7, name: 'UW MECHA' },
    { institutionId: 8, name: 'Tacoma Urban League' },
    { institutionId: 9, name: 'Asian Pacific Islander Cultural Awareness Group (APICAG)' },
    { institutionId: 10, name: 'Chicano Carnalism y Cultura' },
    { institutionId: 11, name: 'United Chicanos' },
]

export const primaryKeyName = "institutionId"; // used in BasicTable.tsx

type GeographicSubCategory = {
    institutionId: number,
    name: string
}

export default GeographicSubCategory;