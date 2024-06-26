using System.ComponentModel.DataAnnotations;

namespace CarceralGroupsAPI
{
    public class CommentCreateRequest
    {
        [StringLength(maximumLength: 128)]
        public required string FullName {get; set; }

        [StringLength(maximumLength: 128)]
        public required string Email {get; set; }

        [StringLength(maximumLength: 3048)]
        public required string CommentText {get; set; }

        public required int DocumentId { get; set; }
    }
}