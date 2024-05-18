import { Form, useLoaderData, redirect, useNavigate, } from "react-router-dom";
import GeographicDocument from "../../../models/GeographicDocument";
import { getGeographicDocument, updateGeographicDocument } from "../../../api/services/GeographicDocumentService";
import { Button, Stack } from "@mui/material";
import GeographicDocumentForm from "./GeographicDocumentForm";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function loader({ params }: any) {
    const geographicDocument = await getGeographicDocument(params.id);
    return { geographicDocument }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function action({ request, params }: any) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateGeographicDocument(params.id, updates);
    return redirect(`/admin/geographicDocuments/${params.id}`);
}

export default function GeographicDocumentEdit() {
    const { geographicDocument } = useLoaderData() as { geographicDocument: GeographicDocument };
    const navigate = useNavigate();

    return (
        <Form method="post" id="geographicDocument-form">
            <GeographicDocumentForm geographicDocument={geographicDocument} isEdit>
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
            </GeographicDocumentForm>
        </Form >
    );
}