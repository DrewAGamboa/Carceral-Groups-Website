import { redirect, } from "react-router-dom";
import { deleteInstitution } from "../../../api/services/InstitutionService";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function action({ params }: any) {
    await deleteInstitution(params.id);
    return redirect(`/admin/institutions`);
}
