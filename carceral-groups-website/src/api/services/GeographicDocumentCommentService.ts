/* eslint-disable @typescript-eslint/no-explicit-any */
import localforage from "localforage"
import GeographicDocumentComment from "../../models/GeographicDocumentComment"

const localForageKey = "geo-docs-comments"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function createGeographicDocumentComment(newComment: GeographicDocumentComment) {
    const id = Date.now().toString()
    const newGeographicDocumentComment = {
        ...newComment,
        commentId: id
    }
    let geographicDocumentComments = await localforage.getItem(localForageKey) as GeographicDocumentComment[];
    if (!geographicDocumentComments) geographicDocumentComments = [];
    geographicDocumentComments = [newGeographicDocumentComment, ...geographicDocumentComments]
    await set(geographicDocumentComments);
    return newGeographicDocumentComment;
}

export async function getGeographicDocumentComments(documentId: string) {
    let geographicDocumentComments = await localforage.getItem(localForageKey) as GeographicDocumentComment[];
    if (!geographicDocumentComments) geographicDocumentComments = [];
    geographicDocumentComments = geographicDocumentComments.filter((comment) => comment.geographicDocumentId === documentId && comment.isApproved)
    return geographicDocumentComments
}

export async function getGeographicDocumentComment(id: string) {
    const geographicDocumentComments = await localforage.getItem(localForageKey) as GeographicDocumentComment[];
    const geographicDocumentComment = geographicDocumentComments.find(
        geographicDocumentComment => geographicDocumentComment.commentId === id
    );
    return geographicDocumentComment ?? null;
}

export async function updateGeographicDocumentComment(id: string, updates: any) {
    let geographicDocumentComments = await localforage.getItem(localForageKey) as GeographicDocumentComment[];
    const geographicDocumentComment = geographicDocumentComments.find(
        geographicDocumentComment => geographicDocumentComment.commentId === id
    );
    const updatedGeographicDocumentComment = { ...geographicDocumentComment, ...updates }
    geographicDocumentComments = geographicDocumentComments.map(
        geographicDocumentComment => geographicDocumentComment.commentId === id ? updatedGeographicDocumentComment : geographicDocumentComment
    )
    await set(geographicDocumentComments);
    return updatedGeographicDocumentComment;
}

export async function deleteGeographicDocumentComment(id: string) {
    let geographicDocumentComments = await localforage.getItem(localForageKey) as GeographicDocumentComment[];
    const index = geographicDocumentComments.findIndex(
        geographicDocumentComment => geographicDocumentComment.commentId === id
    );
    if (index > -1) {
        geographicDocumentComments.splice(index, 1);
        geographicDocumentComments = [...geographicDocumentComments]
        await set(geographicDocumentComments);
        return true;
    }
    return false;
}

function set(geographicDocumentComments: GeographicDocumentComment[]) {
    return localforage.setItem(localForageKey, geographicDocumentComments);
}
