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
            GeographicLocationName = geographicLocation.GeographicLocationName;
            Latitude = geographicLocation.Latitude;
            Longitude = geographicLocation.Longitude;
        }
        
        [StringLength(maximumLength: 256)]
        public required string GeographicLocationName { get; set; }

        [StringLength(maximumLength: 32)]
        public required string Latitude { get; set; }

        [StringLength(maximumLength: 32)]
        public required string Longitude { get; set; }
    }
}