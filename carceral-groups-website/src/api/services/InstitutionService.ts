/* eslint-disable @typescript-eslint/no-explicit-any */
import localforage from "localforage"
import Institution from "../../models/Institution"

const localForageKey = "geo-sub-category"
// defined in .env file
const backend_api_url = import.meta.env.VITE_BACKEND_API_URL

export async function createInstitution() {
    const id = Date.now()
    const newGeographicSubCategory = {
        institutionId: id,
        name: "New Institution",
    }
    let geographicSubCategorys = await getInstitutions();
    geographicSubCategorys = [newGeographicSubCategory, ...geographicSubCategorys]
    await set(geographicSubCategorys);
    return newGeographicSubCategory;
}

export async function getInstitutions() {
    try {
        const response = await fetch(`${backend_api_url}/Institution`)
        const resJson = await response.json()
        const institutions = resJson as Institution[]
        return institutions
    }
    catch (error) {
        console.error('Error fetching institutions:', error);
        return [];
    }
}

export async function getInstitution(id: string) {
    try {
        const response = await fetch(`${backend_api_url}/Institution/${id}`)
        const resJson = await response.json()
        const institution = resJson as Institution
        console.info('Get Response institution:', response, resJson)
        return institution
    }
    catch (error) {
        console.error('Error fetching institution:', error);
        return null;
    }
}

export async function updateInstitution(id: string, updates: any) {
    let geographicSubCategorys = await getInstitutions();
    const geographicSubCategory = geographicSubCategorys.find(
        geographicSubCategory => geographicSubCategory.institutionId === parseInt(id)
    );
    const updatedGeographicSubCategory = { ...geographicSubCategory, ...updates }
    geographicSubCategorys = geographicSubCategorys.map(
        geographicSubCategory => geographicSubCategory.institutionId === parseInt(id) ? updatedGeographicSubCategory : geographicSubCategory
    )
    await set(geographicSubCategorys);
    return updatedGeographicSubCategory;
}

export async function deleteInstitution(id: string) {
    let geographicSubCategorys = await getInstitutions();
    const index = geographicSubCategorys.findIndex(
        geographicSubCategory => geographicSubCategory.institutionId === parseInt(id)
    );
    if (index > -1) {
        geographicSubCategorys.splice(index, 1);
        geographicSubCategorys = [...geographicSubCategorys]
        await set(geographicSubCategorys);
        return true;
    }
    return false;
}

function set(geographicSubCategorys: Institution[]) {
    return localforage.setItem(localForageKey, geographicSubCategorys);
}
