using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarceralGroupsAPI
{
    public class Document
    {
        public int DocumentId { get; set; }

        [StringLength(maximumLength: 256)]
        public required string DocumentTitle { get; set; }

        [StringLength(maximumLength: 256)]
        public string? FileTitle {get; set; }

        [StringLength(maximumLength: 512)]
        public required string URI { get; set; }

        [StringLength(maximumLength: 1024)]
        public required string Citation { get; set; }

        public required int DocumentTypeId { get; set; }
        public DocumentType? DocumentType { get; set; }

        public required int CategoryId { get; set; }
        public Category? Category { get; set; }
        
        public required int InstitutionId { get; set; }
        public Institution? Institution { get; set; }

        public required int GeographicLocationId { get; set; }
        public GeographicLocation? GeographicLocation { get; set; }

        public ICollection<Comment>? Comments { get; set; }
    }
}