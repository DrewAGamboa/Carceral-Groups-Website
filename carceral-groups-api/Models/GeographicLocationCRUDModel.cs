using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace CarceralGroupsAPI
{
    public class GeographicLocationCRUDModel
    {
        public GeographicLocationCRUDModel(){}
        
        [SetsRequiredMembers]
        public GeographicLocationCRUDModel(GeographicLocation geographicLocation)
        {
            GeographicLocationId = geographicLocation.GeographicLocationId;
            GeographicLocationName = geographicLocation.GeographicLocationName;
            Latitude = geographicLocation.Latitude;
            Longitude = geographicLocation.Longitude;
        }

        [SetsRequiredMembers]
        public GeographicLocationCRUDModel(GeographicLocation geographicLocation, Category category, int documentCount)
        {
            GeographicLocationId = geographicLocation.GeographicLocationId;
            GeographicLocationName = geographicLocation.GeographicLocationName;
            Latitude = geographicLocation.Latitude;
            Longitude = geographicLocation.Longitude;
            Color = category?.Color;
            DocumentCount = documentCount;
        }

        public int GeographicLocationId { get; set; }
        
        [StringLength(maximumLength: 256)]
        public required string GeographicLocationName { get; set; }

        [StringLength(maximumLength: 32)]
        public required string Latitude { get; set; }

        [StringLength(maximumLength: 32)]
        public required string Longitude { get; set; }

        public int DocumentCount { get; set; }
        public string? Color { get; set; }
    }
}