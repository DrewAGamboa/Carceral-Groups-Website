using System.ComponentModel.DataAnnotations;

namespace CarceralGroupsAPI
{
    public class DocumentType
    {
        public int DocumentTypeId { get; set; }

        [StringLength(maximumLength: 64)]
        public required string Name { get; set; }
    }
}