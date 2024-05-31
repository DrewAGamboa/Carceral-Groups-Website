using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace CarceralGroupsAPI
{
    public class DocumentCRUDModel
    {
        public DocumentCRUDModel(){}
        
        [SetsRequiredMembers]
        public DocumentCRUDModel(Document document)
        {
            DocumentTitle = document.DocumentTitle;
            FileTitle = document.FileTitle;
            URI = document.URI;
            DocumentTypeId = document.DocumentTypeId;
            CategoryId = document.CategoryId;
            InstitutionId = document.InstitutionId;
            GeographicLocationId = document.GeographicLocationId;
        }

        [StringLength(maximumLength: 256)]
        public required string DocumentTitle { get; set; }

        [StringLength(maximumLength: 256)]
        public string? FileTitle {get; set; }

        [StringLength(maximumLength: 512)]
        public required string URI { get; set; }

        public required int DocumentTypeId { get; set; }

        public required int CategoryId { get; set; }
        
        public required int InstitutionId { get; set; }

        public required int GeographicLocationId { get; set; }
    }
}