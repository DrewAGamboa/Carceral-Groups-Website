/* eslint-disable @typescript-eslint/no-explicit-any */
import FileType from "../../models/FileType"

// defined in .env file
const backend_api_url = import.meta.env.VITE_BACKEND_API_URL

export async function getFileTypes() {
    try {
        const response = await fetch(`${backend_api_url}/FileType`)
        const resJson = await response.json()
        const fileTypes = resJson as FileType[]
        return fileTypes
    }
    catch (error) {
        console.error('Error fetching fileTypes:', error);
        return [];
    }
}
