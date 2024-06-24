/* eslint-disable @typescript-eslint/no-explicit-any */
import localforage from "localforage"
import GeographicCategory from "../../models/GeographicCategory"

const localForageKey = "geo-category"
// defined in .env file
const backend_api_url = import.meta.env.VITE_BACKEND_API_URL

export async function createGeographicCategory() {
    const id = Date.now()
    const newGeographicCategory = {
        categoryId: id,
        name: "New Category",
    }
    let geographicCategorys = await getGeographicCategorys();
    geographicCategorys = [newGeographicCategory, ...geographicCategorys]
    await set(geographicCategorys);
    return newGeographicCategory;
}

export async function getGeographicCategorys() {
    try {
        const response = await fetch(`${backend_api_url}/Category`)
        const resJson = await response.json()
        const geographicDocument = resJson as GeographicCategory[]
        return geographicDocument
    }
    catch (error) {
        console.error('Error fetching geographic categories:', error);
        return [];
    }
}

export async function getGeographicCategory(id: string) {
    const geographicCategorys = await getGeographicCategorys();
    const geographicCategory = geographicCategorys.find(
        geographicCategory => geographicCategory.categoryId === parseInt(id)
    );
    return geographicCategory ?? null;
}

export async function updateGeographicCategory(id: string, updates: any) {
    let geographicCategorys = await getGeographicCategorys();
    const geographicCategory = geographicCategorys.find(
        geographicCategory => geographicCategory.categoryId === parseInt(id)
    );
    const updatedGeographicCategory = { ...geographicCategory, ...updates }
    geographicCategorys = geographicCategorys.map(
        geographicCategory => geographicCategory.categoryId === parseInt(id) ? updatedGeographicCategory : geographicCategory
    )
    await set(geographicCategorys);
    return updatedGeographicCategory;
}

export async function deleteGeographicCategory(id: string) {
    let geographicCategorys = await getGeographicCategorys();
    const index = geographicCategorys.findIndex(
        geographicCategory => geographicCategory.categoryId === parseInt(id)
    );
    if (index > -1) {
        geographicCategorys.splice(index, 1);
        geographicCategorys = [...geographicCategorys]
        await set(geographicCategorys);
        return true;
    }
    return false;
}

function set(geographicCategorys: GeographicCategory[]) {
    return localforage.setItem(localForageKey, geographicCategorys);
}
