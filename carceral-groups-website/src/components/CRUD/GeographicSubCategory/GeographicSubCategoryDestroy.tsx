import { redirect, } from "react-router-dom";
import { deleteGeographicSubCategory } from "../../../api/services/GeographicSubCategoryService";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function action({ params }: any) {
    await deleteGeographicSubCategory(params.id);
    return redirect(`/admin/geographicSubCategorys`);
}
