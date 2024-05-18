import { redirect, } from "react-router-dom";
import { deleteGeographicCategory } from "../../../api/services/GeographicCategoryService";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function action({ params }: any) {
    await deleteGeographicCategory(params.id);
    return redirect(`/admin/geographicCategorys`);
}
