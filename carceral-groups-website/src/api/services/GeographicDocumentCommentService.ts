/* eslint-disable @typescript-eslint/no-explicit-any */
import localforage from "localforage"
import GeographicDocumentComment from "../../models/GeographicDocumentComment"
import axios from 'axios';

// defined in .env file
const backend_api_url = import.meta.env.VITE_BACKEND_API_URL

const localForageKey = "geo-docs-comments"


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function createGeographicDocumentComment(newComment: GeographicDocumentComment) {
    try{
        const newGeographicDocumentComment = {...newComment}
        const response = await axios.post(`${backend_api_url}/comment/`, newGeographicDocumentComment)

        if(response.status >= 200 && response.status < 300)
            return response.data as GeographicDocumentComment;
        else
            return null;
    }
    catch(error){
        console.error('Error creating comment: ', error);
    }
}

export async function getGeographicDocumentComments(documentId: string) {
    try{
        const params = { documentId: documentId}
        const response = await axios.get(`${backend_api_url}/comments/`, { params })

        if(response.status >= 200 && response.status < 300)
            return response.data as GeographicDocumentComment[];
        else
            return null;
    }
    catch(error){
        console.error('Error fetching comments: ', error);
    }
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
