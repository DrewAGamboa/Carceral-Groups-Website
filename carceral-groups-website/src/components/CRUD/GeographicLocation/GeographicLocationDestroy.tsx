import { redirect, } from "react-router-dom";
import { deleteGeographicLocation } from "../../../api/services/GeographicLocationService";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function action({ params }: any) {
    await deleteGeographicLocation(params.id);
    return redirect(`/admin/geographicLocations`);
}
