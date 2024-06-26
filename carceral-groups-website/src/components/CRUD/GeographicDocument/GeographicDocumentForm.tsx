import { Box, FormControl, InputLabel, MenuItem, TextField, Typography } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import GeographicDocument from "../../../models/GeographicDocument";
import { useEffect, useState } from "react";
import { getGeographicLocations } from "../../../api/services/GeographicLocationService";
import GeographicLocation from "../../../models/GeographicLocation";
import GeographicCategory from "../../../models/GeographicCategory";
import Institution from "../../../models/Institution";
import { getGeographicCategorys } from "../../../api/services/GeographicCategoryService";
import { getInstitutions } from "../../../api/services/InstitutionService";
import { getDocumentTypes } from "../../../api/services/DocumentTypeService";
import { getFileTypes } from "../../../api/services/FileTypeService";
import GeographicDocumentType from "../../../models/GeographicDocumentType";
import FileType from "../../../models/FileType";

type GeographicDocumentFormProps = {
    geographicDocument: GeographicDocument
    children?: React.ReactNode;
    isEdit?: boolean;
}

const GeographicDocumentForm = (props: GeographicDocumentFormProps) => {
    const { geographicDocument, children, isEdit } = props;
    const [geographicLocations, setGeographicLocations] = useState<readonly GeographicLocation[]>([]);
    const locationMenuItems = geographicLocations.map((location: GeographicLocation) => {
        return <MenuItem key={location.geographicLocationId} value={location.geographicLocationId}>{location.geographicLocationName}</MenuItem>
    });

    const [geographicCategorys, setGeographicCategorys] = useState<readonly GeographicCategory[]>([]);
    const categoryMenuItems = geographicCategorys.map((category: GeographicCategory) => {
        return <MenuItem key={category.categoryId} value={category.categoryId}>{category.name}</MenuItem>
    });

    const [institutions, setInstitutions] = useState<readonly Institution[]>([]);
    const institutionMenuItems = institutions.map((institution: Institution) => {
        return <MenuItem key={institution.institutionId} value={institution.institutionId}>{institution.name}</MenuItem>
    });

    const [documentTypes, setDocumentTypes] = useState<readonly GeographicDocumentType[]>([]);
    const documentTypeMenuItems = documentTypes.map((documentType: GeographicDocumentType) => {
        return <MenuItem key={documentType.documentTypeId} value={documentType.documentTypeId}>{documentType.name}</MenuItem>
    });

    const [fileTypes, setFileTypes] = useState<readonly FileType[]>([]);
    const fileTypeMenuItems = fileTypes.map((fileType: FileType) => {
        return <MenuItem key={fileType.fileTypeId} value={fileType.fileTypeId}>{fileType.name}</MenuItem>
    });

    const [inputDocumentTitle, setInputDocumentTitle] = useState<string>(geographicDocument.documentTitle || '');
    const [inputDocumentUri, setInputDocumentUri] = useState<string>(geographicDocument.uri || '');
    const [inputDocumentCitation, setInputDocumentCitation] = useState<string>(geographicDocument.citation || '');
    const [inputFromDocumentTypeId, setInputFromDocumentTypeId] = useState<number>(geographicDocument.documentTypeId);
    const [inputFromFileTypeId, setInputFromFileTypeId] = useState<number>(geographicDocument.fileTypeId);
    const [inputFromLocationId, setInputFromLocationId] = useState<number>(geographicDocument.geographicLocationId);
    const [inputFromCategoryId, setInputFromCategoryId] = useState<number>(geographicDocument.categoryId);
    const [inputFromInstitutionId, setInputFromInstitutionId] = useState<number>(geographicDocument.institutionId);

    const handleDocumentTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputDocumentTitle(event.target.value);
    }

    const handleDocumentUriChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputDocumentUri(event.target.value);
    }

    const handleDocumentCitationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputDocumentCitation(event.target.value);
    }

    const handleFormDocumentTypeChange = (event: SelectChangeEvent) => {
        const newdocumentTypeId = parseInt(event.target.value);
        setInputFromDocumentTypeId(newdocumentTypeId);
    }

    const handleFormFileTypeChange = (event: SelectChangeEvent) => {
        const newfileTypeId = parseInt(event.target.value);
        setInputFromFileTypeId(newfileTypeId);
    }

    const handleFormLocationChange = (event: SelectChangeEvent) => {
        const newlocationId = parseInt(event.target.value);
        setInputFromLocationId(newlocationId);
    }

    const handleFormCategoryChange = (event: SelectChangeEvent) => {
        const newCategoryId = parseInt(event.target.value);
        setInputFromCategoryId(newCategoryId);
    }

    const handleFormInstitutionChange = (event: SelectChangeEvent) => {
        const newInstitutionId = parseInt(event.target.value);
        setInputFromInstitutionId(newInstitutionId);
    }

    const textProps = isEdit ? { required: true } : { disabled: true };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const documentTypes = await getDocumentTypes();
                setDocumentTypes([...documentTypes]);

                const fileTypes = await getFileTypes();
                setFileTypes([...fileTypes]);

                const categorys = await getGeographicCategorys();
                setGeographicCategorys([...categorys]);

                const institutions = await getInstitutions();
                setInstitutions([...institutions]);

                const locations = await getGeographicLocations();
                setGeographicLocations([...locations]);
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [])

    useEffect(() => {
        setInputDocumentTitle(geographicDocument.documentTitle || '');
        setInputDocumentUri(geographicDocument.uri || '');
        setInputDocumentCitation(geographicDocument.citation || '');
        setInputFromDocumentTypeId(geographicDocument.documentTypeId);
        setInputFromFileTypeId(geographicDocument.fileTypeId);
        setInputFromCategoryId(geographicDocument.categoryId);
        setInputFromInstitutionId(geographicDocument.institutionId);
        setInputFromLocationId(geographicDocument.geographicLocationId);
    }, [geographicDocument])

    return (
        <Box
            component="section"
            sx={{
                '& .MuiTextField-root': { m: 1},
                p: 2,
                m: 2,
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
                fullWidth
                id="geographicDocumentTitle"
                name="documentTitle"
                label="Document Title"
                type="text"
                value={inputDocumentTitle}
                onChange={handleDocumentTitleChange}
                {...textProps}
            />
            <TextField
                fullWidth
                id="geographicDocumentUri"
                name="uri"
                label="Document Link"
                type="text"
                value={inputDocumentUri}
                onChange={handleDocumentUriChange}
                {...textProps}
            />
            <TextField
                fullWidth
                id="geographicDocumentCitation"
                name="citation"
                label="Document Citation"
                type="text"
                value={inputDocumentCitation}
                onChange={handleDocumentCitationChange}
                {...textProps}
            />
            <FormControl fullWidth sx={{ m: 1, minWidth: 120 }} {...textProps}>
                <InputLabel id="fromDocumentTypeId-select-label">Document Type</InputLabel>
                <Select
                    id="fromDocumentTypeId-select"
                    name="documentTypeId"
                    label="DocumentType *"
                    value={inputFromDocumentTypeId < 1 ? undefined : inputFromDocumentTypeId.toString()}
                    onChange={handleFormDocumentTypeChange}
                    {...textProps}
                >
                    {documentTypeMenuItems}
                </Select>
            </FormControl>
            <FormControl fullWidth sx={{ m: 1, minWidth: 120 }} {...textProps}>
                <InputLabel id="fromFileTypeId-select-label">File Type</InputLabel>
                <Select
                    id="fromFileTypeId-select"
                    name="fileTypeId"
                    label="FileType *"
                    value={inputFromFileTypeId < 1 ? undefined : inputFromFileTypeId.toString()}
                    onChange={handleFormFileTypeChange}
                    {...textProps}
                >
                    {fileTypeMenuItems}
                </Select>
            </FormControl>
            <FormControl fullWidth sx={{ m: 1, minWidth: 120 }} {...textProps}>
                <InputLabel id="categoryId-select-label">Category</InputLabel>
                <Select
                    id="categoryId-select"
                    name="categoryId"
                    label="Category *"
                    value={inputFromCategoryId < 1 ? undefined : inputFromCategoryId.toString()}
                    onChange={handleFormCategoryChange}
                    {...textProps}
                >
                    {categoryMenuItems}
                </Select>
            </FormControl>
            <FormControl fullWidth sx={{ m: 1, minWidth: 120 }} {...textProps}>
                <InputLabel id="institutionId-select-label">Institution</InputLabel>
                <Select
                    id="institutionId-select"
                    name="institutionId"
                    label="Institution *"
                    value={inputFromInstitutionId < 1 ? undefined : inputFromInstitutionId.toString()}
                    onChange={handleFormInstitutionChange}
                    {...textProps}
                >
                    {institutionMenuItems}
                </Select>
            </FormControl>
            <FormControl fullWidth sx={{ m: 1, minWidth: 120 }} {...textProps}>
                <InputLabel id="geographicLocationId-select-label">Location</InputLabel>
                <Select
                    id="geographicLocationId-select"
                    name="geographicLocationId"
                    label="Location *"
                    value={inputFromLocationId < 1 ? undefined : inputFromLocationId.toString()}
                    onChange={handleFormLocationChange}
                    {...textProps}
                >
                    {locationMenuItems}
                </Select>
            </FormControl>
            <Box
                display="flex"
                justifyContent={'flex-end'}
                sx={{ pt: 2 }}
            >
                {children}
            </Box>
        </Box>
    )
}

export default GeographicDocumentForm;
