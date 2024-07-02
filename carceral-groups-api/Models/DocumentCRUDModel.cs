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
            DocumentId = document.DocumentId;
            DocumentTitle = document.DocumentTitle;
            FileTitle = document.FileTitle;
            URI = document.URI;
            Citation = document.Citation;
            DocumentTypeId = document.DocumentTypeId;
            FileTypeId = document.FileTypeId;
            CategoryId = document.CategoryId;
            InstitutionId = document.InstitutionId;
            GeographicLocationId = document.GeographicLocationId;
            ToGeographicLocations = document.ToGeographicLocations ?? new List<GeographicLocation>();
            DocumentTypeName = document.DocumentType?.Name;
            FileTypeName = document.FileType?.Name;
            CategoryName = document.Category?.Name;
            InstitutionName = document.Institution?.Name;
            GeographicLocationName = document.GeographicLocation?.GeographicLocationName;
        }

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
        public string? DocumentTypeName { get; set; }

        public required int FileTypeId { get; set; }
        public string? FileTypeName { get; set; }

        public required int CategoryId { get; set; }
        public string? CategoryName { get; set; }
        
        public required int InstitutionId { get; set; }
        public string? InstitutionName { get; set; }

        public required int GeographicLocationId { get; set; }
        public string? GeographicLocationName { get; set; }

        public required ICollection<GeographicLocation> ToGeographicLocations { get; set; }
    }
}