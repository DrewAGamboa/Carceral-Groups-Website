import { Form, useLoaderData, redirect, useNavigate, } from "react-router-dom";
import GeographicSubCategory from "../../../models/GeographicSubCategory";
import { getGeographicSubCategory, updateGeographicSubCategory } from "../../../api/services/GeographicSubCategoryService";
import { Button, Stack } from "@mui/material";
import GeographicSubCategoryForm from "./GeographicSubCategoryForm";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function loader({ params }: any) {
    const geographicSubCategory = await getGeographicSubCategory(params.id);
    return { geographicSubCategory }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function action({ request, params }: any) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateGeographicSubCategory(params.id, updates);
    return redirect(`/admin/geographicSubCategorys/${params.id}`);
}

export default function GeographicSubCategoryEdit() {
    const { geographicSubCategory } = useLoaderData() as { geographicSubCategory: GeographicSubCategory };
    const navigate = useNavigate();

    return (
        <Form method="post" id="geographicSubCategory-form">
            <GeographicSubCategoryForm geographicSubCategory={geographicSubCategory} isEdit>
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
            </GeographicSubCategoryForm>
        </Form >
    );
}