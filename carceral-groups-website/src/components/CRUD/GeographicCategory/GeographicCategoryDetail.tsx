import { Button, Stack } from "@mui/material";
import { Form, useLoaderData } from "react-router-dom";
import { getGeographicCategory } from "../../../api/services/GeographicCategoryService";
import GeographicCategory from "../../../models/GeographicCategory";
import GeographicCategoryForm from "./GeographicCategoryForm";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function loader({ params }: any) {
    const geographicCategory = await getGeographicCategory(params.id);
    return { geographicCategory }
}

const GeographicCategoryDetails = () => {
    const { geographicCategory } = useLoaderData() as { geographicCategory: GeographicCategory };

    return (
        <GeographicCategoryForm geographicCategory={geographicCategory}>
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
        </GeographicCategoryForm>
    )
}

export default GeographicCategoryDetails;