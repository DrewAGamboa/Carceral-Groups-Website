import {
    Outlet,
    useLoaderData,
    Form,
    redirect,
} from "react-router-dom"
import GeographicCategory from "../../../models/GeographicCategory";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { createGeographicCategory, getGeographicCategorys } from "../../../api/services/GeographicCategoryService";
import BasicTable from "../../MaterialUI/BasicTable";
import Paper from '@mui/material/Paper';

export async function loader() {
    const geographicCategorys = await getGeographicCategorys();
    return { geographicCategorys }
}

export async function action() {
    const geographicCategory = await createGeographicCategory();
    return redirect(`/admin/geographicCategorys/${geographicCategory.id}/edit`);
}

const GeographicCategorys = () => {
    const { geographicCategorys } = useLoaderData() as { geographicCategorys: GeographicCategory[] };
    const tableHeaderInfo = [{ name: "Id" }, { name: "Category Name" }]
    const tableRows = geographicCategorys
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
                    Documents
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

export default GeographicCategorys;
