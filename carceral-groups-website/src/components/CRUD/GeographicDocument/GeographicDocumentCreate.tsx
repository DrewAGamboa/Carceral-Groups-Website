import { Form, redirect, useNavigate, } from "react-router-dom";
import { createGeographicDocument, uploadFile } from "../../../api/services/GeographicDocumentService";
import { Box, Button, Stack, styled } from "@mui/material";
import GeographicDocumentForm from "./GeographicDocumentForm";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { FormEvent, useState } from "react";
import GeographicDocument from "../../../models/GeographicDocument";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function action({ request }: any) {
    const formData = await request.formData();
    const newDocument = Object.fromEntries(formData) as GeographicDocument;
    try {
        const geographicDocument = await createGeographicDocument(newDocument);
        if (!geographicDocument) {
            console.log("Error creating geographic document")
            return redirect('/admin/geographicDocuments');
        }
        return redirect(`/admin/geographicDocuments/${geographicDocument.documentId}`);
    } catch (error) {
        console.error("Error creating geographic document:", error);
        return redirect("/admin/geographicDocuments");
    }
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});


export default function GeographicDocumentCreate() {
    const navigate = useNavigate();
    const [uploadedFile, setUploadedFile] = useState(false);
    const [geographicDocument, setGeographicDocument] = useState<GeographicDocument>({
        documentId: "",
        documentTypeId: 0,
        fileTypeId: 0,
        categoryId: 0,
        institutionId: 0,
        geographicLocationId: 0,
    });

    const handleFileUploadSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget)
        const newFile = Object.fromEntries(formData.entries()) as { fileToUpload: File };

        // handle upload file
        try{
            console.info("Start Uploading New Document:", newFile)
            const documentUri = await uploadFile(newFile);
            const newDocument: GeographicDocument = {
                ...geographicDocument,
                documentTitle: newFile.fileToUpload.name,
                fileTitle: newFile.fileToUpload.name,
                uri: documentUri
            };
            console.info("Finished Uploaded New Document:", newDocument);
            setGeographicDocument(newDocument);
            setUploadedFile(true);
        }
        catch (error) {
            console.error("Error uploading file:", error);
            return;
        }
    }

    return (
        <>
            {!uploadedFile &&
                <Form onSubmit={handleFileUploadSubmit}>
                    <Box
                        display="flex"
                        sx={{ p: 2 }}
                    >
                        <Stack spacing={2} direction={"row"}>
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload file
                                <VisuallyHiddenInput type="file" name="fileToUpload" />
                            </Button>
                            <Button type="submit" variant="contained" color="success">Submit</Button>
                        </Stack>
                    </Box>
                </Form>
            }
            {uploadedFile &&
                <Form method="post" id="newDocumentForm" encType="multipart/form-data">
                    <GeographicDocumentForm isEdit geographicDocument={geographicDocument}>
                        <Stack spacing={2} direction={"row"}>
                            <Button type="submit" variant="contained" color="success">Save</Button>
                            <Button
                                type="button"
                                onClick={() => {
                                    navigate(-1);
                                }}
                                variant="contained"
                            >
                                Cancel
                            </Button>
                        </Stack>
                    </GeographicDocumentForm>
                </Form >
            }
        </>
    );
}