import {
    Outlet,
    useLoaderData,
} from "react-router-dom"
import GeographicDocumentComment, { primaryKeyName } from "../../../models/GeographicDocumentComment";
import { Box, Drawer, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { getUnapprovedComments } from "../../../api/services/GeographicDocumentCommentService";
import BasicTable from "../../MaterialUI/BasicTable";
import Paper from '@mui/material/Paper';
import { useState } from "react";

export async function loader() {
    const geographicDocumentComments = await getUnapprovedComments();
    return { geographicDocumentComments }
}

const GeographicDocumentComments = () => {
    const { geographicDocumentComments } = useLoaderData() as { geographicDocumentComments: GeographicDocumentComment[] };
    const tableHeaderInfo = [
        { name: "Id" },
        { name: "Full Name" },
        { name: "Email" },
        { name: "Comment" },
        { name: "Document" },
    ]
    const tableRows = geographicDocumentComments.map((geographicDocumentComment) => {
        return {
            commentId: geographicDocumentComment.commentId,
            fullName: geographicDocumentComment.fullName,
            email: geographicDocumentComment.email,
            commentText: geographicDocumentComment.commentText,
            documentId: geographicDocumentComment.documentId,
        }
    });
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
                    Unapproved Comments
                </Typography>
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

export default GeographicDocumentComments;
