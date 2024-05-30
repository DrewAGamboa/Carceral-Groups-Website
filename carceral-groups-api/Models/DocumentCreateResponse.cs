using System.Diagnostics.CodeAnalysis;

namespace CarceralGroupsAPI
{
    public class DocumentCreateResponse: DocumentCRUDModel
    {
        [SetsRequiredMembers]
        public DocumentCreateResponse(Document document): base(document)
        {
            DocumentId = document.DocumentId;
        }
        public required int DocumentId { get; set; }
    }
}