import { Button, Stack } from "@mui/material";
import { Form, useLoaderData } from "react-router-dom";
import { getGeographicDocument } from "../../../api/services/GeographicDocumentService";
import GeographicDocument from "../../../models/GeographicDocument";
import GeographicDocumentForm from "./GeographicDocumentForm";
import AccordionGeographicDocumentComments from "./AccordionGeographicDocumentComments";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function loader({ params }: any) {
    const geographicDocument = await getGeographicDocument(params.id);
    return { geographicDocument }
}

const GeographicDocumentDetails = () => {
    const { geographicDocument } = useLoaderData() as { geographicDocument: GeographicDocument };

    return (
        <>
            <GeographicDocumentForm geographicDocument={geographicDocument}>
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
            </GeographicDocumentForm>
            <AccordionGeographicDocumentComments geographicDocument={geographicDocument} />
        </>
    )
}

export default GeographicDocumentDetails;