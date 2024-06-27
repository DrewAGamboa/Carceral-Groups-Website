import {
    useLoaderData,
    useNavigate,
} from "react-router-dom"
import GeographicDocumentComment, { primaryKeyName } from "../../../models/GeographicDocumentComment";
import { Box, Typography } from "@mui/material";
import { getUnapprovedComments, updateGeographicDocumentComment } from "../../../api/services/GeographicDocumentCommentService";
import BasicTable from "../../MaterialUI/BasicTable";
import Paper from '@mui/material/Paper';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';


export async function loader() {
    const geographicDocumentComments = await getUnapprovedComments();
    return { geographicDocumentComments }
}

const GeographicDocumentComments = () => {
    const { geographicDocumentComments } = useLoaderData() as { geographicDocumentComments: GeographicDocumentComment[] };
    const navigate = useNavigate();

    const tableHeaderInfo = [
        { name: "Id" },
        { name: "Full Name" },
        { name: "Email" },
        { name: "Comment" },
        { name: "Document" },
        { name: "Document" },
    ]
    const tableRows = geographicDocumentComments.map((geographicDocumentComment) => {
        return {
            commentId: geographicDocumentComment.commentId,
            fullName: geographicDocumentComment.fullName,
            email: geographicDocumentComment.email,
            commentText: geographicDocumentComment.commentText,
            documentId: geographicDocumentComment.documentId,
            documentTitle: <Link component={RouterLink} to={`/admin/geographicDocuments/${geographicDocumentComment.commentId}`}>{geographicDocumentComment.documentTitle ?? geographicDocumentComment.documentId}</Link>,
        }
    });

    const approveComment = async (commentId: string) => {
        const comment = geographicDocumentComments.find(comment => comment.commentId == commentId);
        if(comment){
            // Approve Comment
            const updatedComment: GeographicDocumentComment = {...comment, isApproved: true }
            // Update the comment in the backend
            await updateGeographicDocumentComment(updatedComment.commentId, updatedComment);
            navigate(".", { replace: true })
        }
    }

    const handleTableClick = (rowId: string) => {
        if(confirm("Approve Comment?")){
            approveComment(rowId);
        }
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
