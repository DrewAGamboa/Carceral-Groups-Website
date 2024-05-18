import { Button, Stack } from "@mui/material";
import { Form, useLoaderData } from "react-router-dom";
import { getGeographicLocation } from "../../../api/services/GeographicLocationService";
import GeographicLocation from "../../../models/GeographicLocation";
import GeographicLocationForm from "./GeographicLocationForm";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function loader({ params }: any) {
    const geographicLocation = await getGeographicLocation(params.id);
    return { geographicLocation }
}

const GeographicLocationDetails = () => {
    const { geographicLocation } = useLoaderData() as { geographicLocation: GeographicLocation };

    return (
        <GeographicLocationForm geographicLocation={geographicLocation}>
            <Stack spacing={2} direction={"row"}>
                <Form action="edit">
                    <Button type="submit" variant="contained">Edit</Button>
                </Form>
                <Form
                    method="post"
                    action="destroy"
                    onSubmit={(event) => {
                        if (
                            !confirm(
                                "Please confirm you want to delete this record."
                            )
                        ) {
                            event.preventDefault();
                        }
                    }}
                >
                    <Button type="submit" variant="contained" color="error">Delete</Button>
                </Form>
            </Stack>
        </GeographicLocationForm>
    )
}

export default GeographicLocationDetails;