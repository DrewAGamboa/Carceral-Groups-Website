namespace CarceralGroupsAPI
{
    /// <summary>
    /// Represents a statistical record of document counts for a specific geographic location, category, and institution.
    /// The Primary key is a composite key of CategoryId, InstitutionId, and GeographicLocationId.
    /// </summary>
    public class LocationDocumentStat
    {
        /// <summary>
        /// Gets or sets the ID of the category associated with the document count.
        /// </summary>
        public required int CategoryId { get; set; }

        /// <summary>
        /// Gets or sets the category associated with the document count.
        /// </summary>
        public Category? Category { get; set; }

        /// <summary>
        /// Gets or sets the ID of the institution associated with the document count.
        /// </summary>
        public required int InstitutionId { get; set; }

        /// <summary>
        /// Gets or sets the institution associated with the document count.
        /// </summary>
        public Institution? Institution { get; set; }

        /// <summary>
        /// Gets or sets the ID of the geographic location associated with the document count.
        /// </summary>
        public required int GeographicLocationId { get; set; }

        /// <summary>
        /// Gets or sets the geographic location associated with the document count.
        /// </summary>
        public GeographicLocation? GeographicLocation { get; set; }

        /// <summary>
        /// Gets or sets the count of documents for the specific geographic location, category, and institution.
        /// </summary>
        public required int DocumentCount { get; set; }

        /// <summary>
        /// Gets or sets the date and time when the document count was last updated.
        /// </summary>
        public DateTime LastUpdated { get; set; }
    }
}