import { redirect, } from "react-router-dom";
import { deleteGeographicDocument } from "../../../api/services/GeographicDocumentService";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function action({ params }: any) {
    await deleteGeographicDocument(params.id);
    return redirect(`/admin/geographicDocuments`);
}
