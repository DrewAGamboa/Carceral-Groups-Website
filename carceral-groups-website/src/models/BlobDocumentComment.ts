export type BlobDocumentComment = {
    id: string;
    image: BlobDocumentCommentImage,
    title: string,
    from: string,
    content: string
}

export type BlobDocumentCommentImage = {
    url: string;
    alt: string;
}