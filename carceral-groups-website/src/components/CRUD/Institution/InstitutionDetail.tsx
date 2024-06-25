import { Button, Stack } from "@mui/material";
import { Form, useLoaderData } from "react-router-dom";
import { getInstitution } from "../../../api/services/InstitutionService";
import Institution from "../../../models/Institution";
import InstitutionForm from "./InstitutionForm";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function loader({ params }: any) {
    const institution = await getInstitution(params.id);
    return { institution }
}

const InstitutionDetails = () => {
    const { institution } = useLoaderData() as { institution: Institution };

    return (
        <InstitutionForm institution={institution}>
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
        </InstitutionForm>
    )
}

export default InstitutionDetails;