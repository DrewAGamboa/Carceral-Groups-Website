using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace CarceralGroupsAPI
{
    public class CommentCRUDModel
    {
        public CommentCRUDModel() {}

        [SetsRequiredMembers]
        public CommentCRUDModel(Comment comment)
        {
            FullName = comment.FullName;
            Email = comment.Email;
            CommentText = comment.CommentText;
            IsApproved = comment.IsApproved;
            DocumentId = comment.DocumentId;
        }

        [StringLength(maximumLength: 128)]
        public required string FullName {get; set; }

        [StringLength(maximumLength: 128)]
        public required string Email {get; set; }

        [StringLength(maximumLength: 256)]
        public required string CommentText {get; set; }

        public required bool IsApproved { get; set; }

        public required int DocumentId { get; set; }
    }
}