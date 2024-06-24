import {
    Outlet,
    useLoaderData,
} from "react-router-dom"
import GeographicDocument from "../../../models/GeographicDocument";
import { Box, Button, Drawer, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { getGeographicDocuments } from "../../../api/services/GeographicDocumentService";
import BasicTable from "../../MaterialUI/BasicTable";
import Paper from '@mui/material/Paper';
import { useState } from "react";

export async function loader() {
    const geographicDocuments = await getGeographicDocuments();
    return { geographicDocuments }
}

const GeographicDocuments = () => {
    const { geographicDocuments } = useLoaderData() as { geographicDocuments: GeographicDocument[] };
    const tableHeaderInfo = [
        { name: "Id" },
        { name: "Document Title" },
        { name: "Document URI" },
        { name: "Location" },
        { name: "Category" },
        { name: "Institution" },
    ]
    const tableRows = geographicDocuments.map((geographicDocument) => {
        return {
            id: geographicDocument.geographicDocumentId,
            geographicDocumentTitle: geographicDocument.geographicDocumentTitle,
            geographicDocumentUri: geographicDocument.geographicDocumentUri,
            fromGeographicLocationId: geographicDocument.fromGeographicLocationId,
            fromGeographicCategoryId: geographicDocument.fromGeographicCategoryId,
            fromInstitutionId: geographicDocument.fromInstitutionId,
        }
    });
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const handleTableClick = (rowId: string) => {
        setOpen(true);
        navigate(`${rowId}`);
    }


    const handleNewClick = () => {
        setOpen(true);
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
                    <BasicTable tableHeaderInfo={tableHeaderInfo} rows={tableRows} handleTableRowClick={handleTableClick} />
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
