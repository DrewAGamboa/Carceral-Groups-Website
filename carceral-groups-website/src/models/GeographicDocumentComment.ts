export const primaryKeyName = 'commentId';

type GeographicDocumentComment = {
    commentId: string
    fullName: string
    email: string
    commentText: string
    isApproved: boolean
    documentId: string
    documentTitle?: string
}

export default GeographicDocumentComment;