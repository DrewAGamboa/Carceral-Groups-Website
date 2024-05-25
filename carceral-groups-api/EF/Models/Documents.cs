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
        public required string FileTitle {get; set; }

        [StringLength(maximumLength: 512)]
        public required string    URI { get; set; }

        public int DocumentTypeId { get; set; }
        public required DocumentType DocumentType { get; set; }

        public int CategoryId { get; set; }
        public required Category Category { get; set; }
        
        public int InstitutionId { get; set; }
        public required Institution Institution { get; set; }

        public int GeographicLocationId { get; set; }
        public required GeographicLocation GeographicLocation { get; set; }
    }
}