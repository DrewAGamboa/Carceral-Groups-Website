type FiltersResponseFilter = {
    categoryId: string
    category: string,
    institutions?: {institutionId: string, institution: string}[],
}

export default FiltersResponseFilter