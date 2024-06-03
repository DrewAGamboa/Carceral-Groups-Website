namespace CarceralGroupsAPI
{
    public class FiltersResponse
    {
        public required List<FiltersResponseFilter> Filters { get; set; }
    }

    public class FiltersResponseFilter
    {
        public required int CategoryId { get; set; }
        public required string Category { get; set; }

        public List<FiltersResponseFilterInstitution>? Institutions { get; set; }
    }

    public record FiltersResponseFilterInstitution(int InstitutionId, string Institution);
}