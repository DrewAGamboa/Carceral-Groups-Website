namespace CarceralGroupsAPI
{
    public class DocumentListResponse
    {
        public required List<DocumentListResponseItem> Documents { get; set; }
    }

    public class DocumentListResponseItem
    {
        public required int DocumentId { get; set; }

        public required string DocumentTitle { get; set; }
    }
}