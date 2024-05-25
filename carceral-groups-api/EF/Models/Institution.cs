using System.ComponentModel.DataAnnotations;

namespace CarceralGroupsAPI
{
    public class Institution
    {
        public int InstitutionId { get; set; }

        [StringLength(maximumLength: 256)]
        public required string Name { get; set; }
    }
}