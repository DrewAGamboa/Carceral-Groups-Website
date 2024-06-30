namespace CarceralGroupsAPI
{
    public class LocationDocumentStat
    {
        public required int CategoryId { get; set; }
        public Category? Category { get; set; }
        
        public required int InstitutionId { get; set; }
        public Institution? Institution { get; set; }

        public required int GeographicLocationId { get; set; }
        public GeographicLocation? GeographicLocation { get; set; }

        public required int DocumentCount { get; set; }

        public DateTime LastUpdated { get; set; }
    }
}