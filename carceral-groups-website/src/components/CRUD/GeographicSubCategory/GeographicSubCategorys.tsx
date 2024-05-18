import {
    Outlet,
    useLoaderData,
    Form,
    redirect,
} from "react-router-dom"
import GeographicSubCategory from "../../../models/GeographicSubCategory";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { createGeographicSubCategory, getGeographicSubCategorys } from "../../../api/services/GeographicSubCategoryService";
import BasicTable from "../../MaterialUI/BasicTable";
import Paper from '@mui/material/Paper';

export async function loader() {
    const geographicSubCategorys = await getGeographicSubCategorys();
    return { geographicSubCategorys }
}

export async function action() {
    const geographicSubCategory = await createGeographicSubCategory();
    return redirect(`/admin/geographicSubCategorys/${geographicSubCategory.id}/edit`);
}

const GeographicSubCategorys = () => {
    const { geographicSubCategorys } = useLoaderData() as { geographicSubCategorys: GeographicSubCategory[] };
    const tableHeaderInfo = [{ name: "Id" }, { name: "Sub Category" }]
    const tableRows = geographicSubCategorys
    const navigate = useNavigate();

    const handleTableClick = (rowId: string) => {
        navigate(`${rowId}`);
    }

    return (
        <>
            <Paper
                sx={{ p: 2, my: 4 }}
            >
                <Typography
                    component="h1"
                    variant="h4"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                >
                    Sub Categories
                </Typography>
                <Box
                    display="flex"
                    justifyContent={'flex-end'}
                >
                    <Form method="post">
                        <Button type="submit" variant="contained" color="success">New</Button>
                    </Form>
                </Box>
                <Box sx={{ my: 2 }}>
                    <BasicTable tableHeaderInfo={tableHeaderInfo} rows={tableRows} handleTableRowClick={handleTableClick} />
                </Box>
            </Paper>
            <Outlet />
        </>
    )
}

export default GeographicSubCategorys;