import {
    Outlet,
    useLoaderData,
    Form,
    redirect,
} from "react-router-dom"
import GeographicLocation, { primaryKeyName } from "../../../models/GeographicLocation";
import { Box, Button, Drawer, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { createGeographicLocation, getGeographicLocations } from "../../../api/services/GeographicLocationService";
import BasicTable from "../../MaterialUI/BasicTable";
import Paper from '@mui/material/Paper';
import { useState } from "react";

export async function loader() {
    const geographicLocations = await getGeographicLocations();
    return { geographicLocations }
}

export async function action() {
    const geographicLocation = await createGeographicLocation();
    return redirect(`/admin/geographicLocations/${geographicLocation.geographicLocationId}/edit`);
}

const GeographicLocations = () => {
    const { geographicLocations } = useLoaderData() as { geographicLocations: GeographicLocation[] };
    const tableHeaderInfo = [{ name: "Id" }, { name: "Name" }, { name: "Latitude" }, { name: "Long" }]
    const tableRows = geographicLocations
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
                    Geographic Locations
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
                    <BasicTable tableHeaderInfo={tableHeaderInfo} rows={tableRows} primaryKeyName={"geographicLocationId"} handleTableRowClick={handleTableClick} />
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

export default GeographicLocations;
