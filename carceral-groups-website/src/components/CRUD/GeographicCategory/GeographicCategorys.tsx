import {
    Outlet,
    useLoaderData,
    Form,
    redirect,
} from "react-router-dom"
import GeographicCategory, { primaryKeyName } from "../../../models/GeographicCategory";
import { Box, Button, Drawer, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { createGeographicCategory, getGeographicCategorys } from "../../../api/services/GeographicCategoryService";
import BasicTable from "../../MaterialUI/BasicTable";
import Paper from '@mui/material/Paper';
import { useState } from "react";

export async function loader() {
    const geographicCategorys = await getGeographicCategorys();
    return { geographicCategorys }
}

export async function action() {
    const geographicCategory = await createGeographicCategory();
    if (geographicCategory === null) {
        return redirect('/admin/geographicCategorys');
    }
    return redirect(`/admin/geographicCategorys/${geographicCategory.categoryId}/edit`);
}

const GeographicCategorys = () => {
    const { geographicCategorys } = useLoaderData() as { geographicCategorys: GeographicCategory[] };
    const tableHeaderInfo = [{ name: "Id" }, { name: "Category Name" }]
    const tableRows = geographicCategorys
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const handleTableClick = (rowId: string) => {
        setOpen(true);
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
                    Categories
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
                    <BasicTable tableHeaderInfo={tableHeaderInfo} rows={tableRows} primaryKeyName={primaryKeyName} handleTableRowClick={handleTableClick} />
                </Box>
            </Paper>
            <Drawer
                anchor="right"
                open={open}
                onClose={() => setOpen(false)}
                sx={{
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '25%' },
                }}
            >
                <Outlet />
            </Drawer>
        </>
    )
}

export default GeographicCategorys;
