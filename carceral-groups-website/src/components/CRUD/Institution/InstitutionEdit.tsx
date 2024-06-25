import { Form, useLoaderData, redirect, useNavigate, } from "react-router-dom";
import Institution from "../../../models/Institution";
import { getInstitution, updateInstitution } from "../../../api/services/InstitutionService";
import { Button, Stack } from "@mui/material";
import InstitutionForm from "./InstitutionForm";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function loader({ params }: any) {
    const institution = await getInstitution(params.id);
    return { institution }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function action({ request, params }: any) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateInstitution(params.id, updates);
    return redirect(`/admin/institutions/${params.id}`);
}

export default function InstitutionEdit() {
    const { institution } = useLoaderData() as { institution: Institution };
    const navigate = useNavigate();

    return (
        <Form method="post" id="institution-form">
            <InstitutionForm institution={institution} isEdit>
                <Stack spacing={2} direction={"row"}>
                    <Button type="submit" variant="contained" color="success">Save</Button>
                    <Button
                        type="button"
                        onClick={() => {
                            navigate(-1);
                        }}
                        variant="contained"
                    >
                        Cancel
                    </Button>
                </Stack>
            </InstitutionForm>
        </Form >
    );
}