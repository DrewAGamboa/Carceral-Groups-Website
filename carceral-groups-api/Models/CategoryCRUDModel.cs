using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace CarceralGroupsAPI
{
    public class CategoryCRUDModel
    {
        public CategoryCRUDModel(){}

        [SetsRequiredMembers]
        public CategoryCRUDModel(Category category)
        {
            CategoryId = category.CategoryId;
            Name = category.Name;
            Color = category.Color;
        }

        public int CategoryId { get; set; }

        [StringLength(maximumLength: 256)]
        public required string Name { get; set; }

        [StringLength(maximumLength: 256)]
        public string? Color { get; set; }
    }
}