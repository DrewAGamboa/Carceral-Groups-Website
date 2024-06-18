// represents one category that has institutions
type FiltersResponseFilter = {
    categoryId: string
    category: string,
    institutions?: {institutionId: string, institution: string}[],
    color?: string
}

export default FiltersResponseFilter