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
    const updatedGeographicDocument = formatFormDataToGeographicDocument(updates);
    await updateGeographicDocument(params.id, updatedGeographicDocument);
    return redirect(`/admin/geographicDocuments/${params.id}`);
}

const newGeographicLocationWithJustId = (geographicLocationId: string) => ({ geographicLocationId, latitude: "", longitude: "", geographicLocationName: ""});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formatFormDataToGeographicDocument = (geographicDocumentForm: any) => {
    const toGeographicLocations = []
    if(geographicDocumentForm.toGeographicLocations)
    {
        const geographicLocations = geographicDocumentForm.toGeographicLocations.split(",");
        const toGeographicLocationFormatted = geographicLocations.map((geographicLocationId: string) => newGeographicLocationWithJustId(geographicLocationId));
        toGeographicLocations.push(...toGeographicLocationFormatted)
    }
    return { ...geographicDocumentForm, toGeographicLocations };
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