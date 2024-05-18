import { Form, useLoaderData, redirect, useNavigate, } from "react-router-dom";
import GeographicLocation from "../../../models/GeographicLocation";
import { getGeographicLocation, updateGeographicLocation } from "../../../api/services/GeographicLocationService";
import { Button, Stack } from "@mui/material";
import GeographicLocationForm from "./GeographicLocationForm";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function loader({ params }: any) {
    const geographicLocation = await getGeographicLocation(params.id);
    return { geographicLocation }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function action({ request, params }: any) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateGeographicLocation(params.id, updates);
    return redirect(`/admin/geographicLocations/${params.id}`);
}

export default function GeographicLocationEdit() {
    const { geographicLocation } = useLoaderData() as { geographicLocation: GeographicLocation };
    const navigate = useNavigate();

    return (
        <Form method="post" id="geographicLocation-form">
            <GeographicLocationForm geographicLocation={geographicLocation} isEdit>
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
            </GeographicLocationForm>
        </Form >
    );
}