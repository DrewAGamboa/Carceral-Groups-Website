import {
    Outlet,
    useLoaderData,
    Form,
    redirect,
} from "react-router-dom"
import GeographicLocation from "../../../models/GeographicLocation";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { createGeographicLocation, getGeographicLocations } from "../../../api/services/GeographicLocationService";
import BasicTable from "../../MaterialUI/BasicTable";

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
    const tableHeaderInfo = [{ name: "Id"}, { name: "Name"}, { name: "Latitude"}, { name: "Long"}]
    const tableRows = geographicLocations.map((geographicLocation) => {
        return {
            id: geographicLocation.geographicLocationId,
            geographicLocationName: geographicLocation.geographicLocationName,
            geographicLocationLat: geographicLocation.geographicLocationLat,
            geographicLocationLong: geographicLocation.geographicLocationLong,
        }
    });
    const navigate = useNavigate();

    const handleTableClick = (rowId: string) => {
        navigate(`${rowId}`);
    }

    return (
        <>
            <Box sx={{ m: 2 }}>
                <Typography
                    component="h1"
                    variant="h2"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                >
                    Geographic Locations
                </Typography>
                <Box>
                    <Form method="post">
                        <Button type="submit" variant="contained" color="success">New</Button>
                    </Form>
                </Box>
                <Box sx={{ my: 2 }}>
                    <BasicTable tableHeaderInfo={tableHeaderInfo} rows={tableRows} handleTableRowClick={handleTableClick} />
                </Box>
                <Box>
                    <Outlet />
                </Box>
            </Box>

        </>
    )
}

export default GeographicLocations;
