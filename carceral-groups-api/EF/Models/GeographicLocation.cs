using System.ComponentModel.DataAnnotations;

namespace CarceralGroupsAPI
{
    public class GeographicLocation
    {
        public int GeographicLocationId { get; set; }

        [StringLength(maximumLength: 256)]
        public required string GeographicLocationName { get; set; }

        [StringLength(maximumLength: 32)]
        public required string Latitude { get; set; }
        [StringLength(maximumLength: 32)]
        public required string Longitude { get; set; }
    }
}