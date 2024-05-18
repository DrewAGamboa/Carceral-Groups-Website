import { Box, Paper, TextField, Typography } from "@mui/material";
import GeographicDocument from "../../../models/GeographicDocument";
import { useEffect, useState } from "react";


type GeographicDocumentFormProps = {
    geographicDocument: GeographicDocument
    children?: React.ReactNode;
    isEdit?: boolean;
}

const GeographicDocumentForm = (props: GeographicDocumentFormProps) => {
    const { geographicDocument, children, isEdit } = props;

    const [inputDocumentTitle, setInputDocumentTitle] = useState<string>(geographicDocument.geographicDocumentTitle || '');
    const [inputDocumentUri, setInputDocumentUri] = useState<string>(geographicDocument.geographicDocumentUri || '');

    const handleDocumentTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputDocumentTitle(event.target.value);
    }

    const handleDocumentUriChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputDocumentUri(event.target.value);
    }

    const textProps = isEdit ? { required: true } : { disabled: true };

    useEffect(() => {
        setInputDocumentTitle(geographicDocument.geographicDocumentTitle);
        setInputDocumentUri(geographicDocument.geographicDocumentUri);
    }, [geographicDocument])

    return (
        <Paper
            component="section"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                p: 2,
            }}>
            <Typography
                component="h1"
                variant="h4"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
            >
                Details
            </Typography>
            <TextField
                margin="dense"
                id="geographicDocumentTitle"
                name="geographicDocumentTitle"
                label="Document Title"
                type="text"
                value={inputDocumentTitle}
                onChange={handleDocumentTitleChange}
                {...textProps}
            />
            <TextField
                margin="dense"
                id="geographicDocumentUri"
                name="geographicDocumentUri"
                label="Document Link"
                type="text"
                value={inputDocumentUri}
                onChange={handleDocumentUriChange}
                {...textProps}
            />
            <Box
                display="flex"
                justifyContent={'flex-end'}
                sx={{ pt: 2 }}
            >
                {children}
            </Box>
        </Paper>
    )
}

export default GeographicDocumentForm;