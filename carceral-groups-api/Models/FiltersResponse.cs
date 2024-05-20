namespace CarceralGroupsAPI
{
    public class FiltersResponse
    {
        public required List<FiltersResponseFilter> Filters { get; set; }
    }

    public class FiltersResponseFilter
    {
        public required string Category { get; set; }

        public List<string>? Institutions { get; set; }
    }
}