using System.ComponentModel.DataAnnotations;

namespace CarceralGroupsAPI
{
    public class Category
    {
        public int CategoryId { get; set; }

        [StringLength(maximumLength: 256)]
        public required string Name { get; set; }
    }
}