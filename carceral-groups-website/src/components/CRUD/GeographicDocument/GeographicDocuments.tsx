import {
    Outlet,
    useLoaderData,
    Form,
    redirect,
} from "react-router-dom"
import GeographicDocument from "../../../models/GeographicDocument";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { createGeographicDocument, getGeographicDocuments } from "../../../api/services/GeographicDocumentService";
import BasicTable from "../../MaterialUI/BasicTable";
import Paper from '@mui/material/Paper';

export async function loader() {
    const geographicDocuments = await getGeographicDocuments();
    return { geographicDocuments }
}

export async function action() {
    const geographicDocument = await createGeographicDocument();
    return redirect(`/admin/geographicDocuments/${geographicDocument.geographicDocumentId}/edit`);
}

const GeographicDocuments = () => {
    const { geographicDocuments } = useLoaderData() as { geographicDocuments: GeographicDocument[] };
    const tableHeaderInfo = [{ name: "Id" }, { name: "Document Title" }, { name: "Document URI" }, { name: "Location" }]
    const tableRows = geographicDocuments.map((geographicDocument) => {
        return {
            id: geographicDocument.geographicDocumentId,
            geographicDocumentTitle: geographicDocument.geographicDocumentTitle,
            geographicDocumentUri: geographicDocument.geographicDocumentUri,
            fromGeographicLocationId: geographicDocument.fromGeographicLocationId,
        }
    });
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

export default GeographicDocuments;
