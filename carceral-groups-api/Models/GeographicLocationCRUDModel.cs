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

        public int GeographicLocationId { get; set; }
        
        [StringLength(maximumLength: 256)]
        public required string GeographicLocationName { get; set; }

        [StringLength(maximumLength: 32)]
        public required string Latitude { get; set; }

        [StringLength(maximumLength: 32)]
        public required string Longitude { get; set; }
    }
}