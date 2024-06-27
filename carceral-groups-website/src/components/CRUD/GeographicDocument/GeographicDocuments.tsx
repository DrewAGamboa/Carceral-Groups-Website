import {
    Outlet,
    useLoaderData,
    useLocation,
    useMatch,
} from "react-router-dom"
import GeographicDocument, { primaryKeyName } from "../../../models/GeographicDocument";
import { Box, Button, Drawer, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { getGeographicDocuments } from "../../../api/services/GeographicDocumentService";
import BasicTable from "../../MaterialUI/BasicTable";
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react";

export async function loader() {
    const geographicDocuments = await getGeographicDocuments();
    return { geographicDocuments }
}

const GeographicDocuments = () => {
    const { geographicDocuments } = useLoaderData() as { geographicDocuments: GeographicDocument[] };
    const tableHeaderInfo = [
        { name: "Id" },
        { name: "Document Title" },
        { name: "File Title" },
        { name: "URI" },
        { name: "Citation" },
        { name: "Document Type" },
        { name: "File Type" },
        { name: "Category" },
        { name: "Institution" },
        { name: "Location" },
    ]
    const tableRows = geographicDocuments;
    const navigate = useNavigate();
    const location = useLocation();
    const match = useMatch("/admin/geographicDocuments/*");

    const [open, setOpen] = useState(false);

    useEffect(() => {
        // Check if the current location is a child of the parent path
        if (match) {
            setOpen(location.pathname !== match.pathnameBase);
        } else {
            setOpen(false);
        }
    }, [location, match]);

    const handleTableClick = (rowId: string) => {
        navigate(`${rowId}`);
    }

    const handleNewClick = () => {
        navigate(`new`);
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
                    <Button onClick={handleNewClick} variant="contained" color="success">
                        New
                    </Button>
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

export default GeographicDocuments;
