import { Form, useLoaderData, redirect, useNavigate, } from "react-router-dom";
import GeographicCategory from "../../../models/GeographicCategory";
import { getGeographicCategory, updateGeographicCategory } from "../../../api/services/GeographicCategoryService";
import { Button, Stack } from "@mui/material";
import GeographicCategoryForm from "./GeographicCategoryForm";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function loader({ params }: any) {
    const geographicCategory = await getGeographicCategory(params.id);
    return { geographicCategory }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function action({ request, params }: any) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateGeographicCategory(params.id, updates);
    return redirect(`/admin/geographicCategorys/${params.id}`);
}

export default function GeographicCategoryEdit() {
    const { geographicCategory } = useLoaderData() as { geographicCategory: GeographicCategory };
    const navigate = useNavigate();

    return (
        <Form method="post" id="geographicCategory-form">
            <GeographicCategoryForm geographicCategory={geographicCategory} isEdit>
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
            </GeographicCategoryForm>
        </Form >
    );
}