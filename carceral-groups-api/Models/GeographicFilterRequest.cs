namespace CarceralGroupsAPI
{
    public class GeographicFilterRequest()
    {
        public required List<GeographicLocationFilter> Filters { get; set; }
    }

    public class GeographicLocationFilter()
    {
        public required int CategoryId { get; set; }

        public required int InstitutionId { get; set; }
    }
}