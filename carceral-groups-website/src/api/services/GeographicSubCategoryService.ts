/* eslint-disable @typescript-eslint/no-explicit-any */
import localforage from "localforage"
import GeographicSubCategory, { DUMMY_GEOGRAPHIC_SUB_CATEGORY} from "../../models/GeographicSubCategory"

const localForageKey = "geo-sub-category"

export async function createGeographicSubCategory() {
    const id = Date.now().toString()
    const newGeographicSubCategory = {
        id: id,
        name: "New Sub Category",
    }
    let geographicSubCategorys = await getGeographicSubCategorys();
    geographicSubCategorys = [newGeographicSubCategory, ...geographicSubCategorys]
    await set(geographicSubCategorys);
    return newGeographicSubCategory;
}

export async function getGeographicSubCategorys() {
    let geographicSubCategorys = await localforage.getItem(localForageKey) as GeographicSubCategory[];
    if (!geographicSubCategorys) geographicSubCategorys = DUMMY_GEOGRAPHIC_SUB_CATEGORY;
    return geographicSubCategorys
}

export async function getGeographicSubCategory(id: string) {
    const geographicSubCategorys = await getGeographicSubCategorys();
    const geographicSubCategory = geographicSubCategorys.find(
        geographicSubCategory => geographicSubCategory.id === id
    );
    return geographicSubCategory ?? null;
}

export async function updateGeographicSubCategory(id: string, updates: any) {
    let geographicSubCategorys = await getGeographicSubCategorys();
    const geographicSubCategory = geographicSubCategorys.find(
        geographicSubCategory => geographicSubCategory.id === id
    );
    const updatedGeographicSubCategory = { ...geographicSubCategory, ...updates }
    geographicSubCategorys = geographicSubCategorys.map(
        geographicSubCategory => geographicSubCategory.id === id ? updatedGeographicSubCategory : geographicSubCategory
    )
    await set(geographicSubCategorys);
    return updatedGeographicSubCategory;
}

export async function deleteGeographicSubCategory(id: string) {
    let geographicSubCategorys = await getGeographicSubCategorys();
    const index = geographicSubCategorys.findIndex(
        geographicSubCategory => geographicSubCategory.id === id
    );
    if (index > -1) {
        geographicSubCategorys.splice(index, 1);
        geographicSubCategorys = [...geographicSubCategorys]
        await set(geographicSubCategorys);
        return true;
    }
    return false;
}

function set(geographicSubCategorys: GeographicSubCategory[]) {
    return localforage.setItem(localForageKey, geographicSubCategorys);
}
