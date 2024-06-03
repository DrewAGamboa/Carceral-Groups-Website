using System.Diagnostics.CodeAnalysis;

namespace CarceralGroupsAPI
{
    public class CommentCreateResponse: CommentCRUDModel
    {
        [SetsRequiredMembers]
        public CommentCreateResponse(Comment comment): base(comment)
        {
            CommentId = comment.CommentId;
        }

        public required int CommentId {get; set; }
    }
}