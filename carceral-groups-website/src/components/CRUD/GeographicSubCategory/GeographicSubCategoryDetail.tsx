import { Button, Stack } from "@mui/material";
import { Form, useLoaderData } from "react-router-dom";
import { getGeographicSubCategory } from "../../../api/services/GeographicSubCategoryService";
import GeographicSubCategory from "../../../models/GeographicSubCategory";
import GeographicSubCategoryForm from "./GeographicSubCategoryForm";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function loader({ params }: any) {
    const geographicSubCategory = await getGeographicSubCategory(params.id);
    return { geographicSubCategory }
}

const GeographicSubCategoryDetails = () => {
    const { geographicSubCategory } = useLoaderData() as { geographicSubCategory: GeographicSubCategory };

    return (
        <GeographicSubCategoryForm geographicSubCategory={geographicSubCategory}>
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
        </GeographicSubCategoryForm>
    )
}

export default GeographicSubCategoryDetails;