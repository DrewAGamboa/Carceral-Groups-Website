import {
    useLoaderData,
} from "react-router-dom"
import GeographicDocumentComment, { primaryKeyName } from "../../../models/GeographicDocumentComment";
import { Box, Typography } from "@mui/material";
import { getUnapprovedComments } from "../../../api/services/GeographicDocumentCommentService";
import BasicTable from "../../MaterialUI/BasicTable";
import Paper from '@mui/material/Paper';

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

    const handleTableClick = (rowId: string) => {
        console.log("TODO: Approve Comment id ",rowId);
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
        </>
    )
}

export default GeographicDocumentComments;
