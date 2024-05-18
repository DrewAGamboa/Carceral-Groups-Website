/* eslint-disable @typescript-eslint/no-explicit-any */
import localforage from "localforage"
import GeographicCategory, { DUMMY_GEOGRAPHIC_CATEGORY } from "../../models/GeographicCategory"

const localForageKey = "geo-category"

export async function createGeographicCategory() {
    const id = Date.now().toString()
    const newGeographicCategory = {
        id: id,
        name: "New Category",
    }
    let geographicCategorys = await getGeographicCategorys();
    geographicCategorys = [newGeographicCategory, ...geographicCategorys]
    await set(geographicCategorys);
    return newGeographicCategory;
}

export async function getGeographicCategorys() {
    let geographicCategorys = await localforage.getItem(localForageKey) as GeographicCategory[];
    if (!geographicCategorys) geographicCategorys = DUMMY_GEOGRAPHIC_CATEGORY;
    return geographicCategorys
}

export async function getGeographicCategory(id: string) {
    const geographicCategorys = await getGeographicCategorys();
    const geographicCategory = geographicCategorys.find(
        geographicCategory => geographicCategory.id === id
    );
    return geographicCategory ?? null;
}

export async function updateGeographicCategory(id: string, updates: any) {
    let geographicCategorys = await getGeographicCategorys();
    const geographicCategory = geographicCategorys.find(
        geographicCategory => geographicCategory.id === id
    );
    const updatedGeographicCategory = { ...geographicCategory, ...updates }
    geographicCategorys = geographicCategorys.map(
        geographicCategory => geographicCategory.id === id ? updatedGeographicCategory : geographicCategory
    )
    await set(geographicCategorys);
    return updatedGeographicCategory;
}

export async function deleteGeographicCategory(id: string) {
    let geographicCategorys = await getGeographicCategorys();
    const index = geographicCategorys.findIndex(
        geographicCategory => geographicCategory.id === id
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
