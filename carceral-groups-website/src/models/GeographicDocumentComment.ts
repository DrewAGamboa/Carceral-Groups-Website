export const primaryKeyName = 'commentId';

type GeographicDocumentComment = {
    commentId: string
    fullName: string
    email: string
    commentText: string
    isApproved: boolean
    documentId: string
}

export default GeographicDocumentComment;