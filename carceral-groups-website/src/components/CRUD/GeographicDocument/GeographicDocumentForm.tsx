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

    const [inputDocumentTitle, setInputDocumentTitle] = useState<string>(geographicDocument.documentTitle || '');
    const [inputDocumentUri, setInputDocumentUri] = useState<string>(geographicDocument.uri || '');
    const [inputFromLocationId, setInputFromLocationId] = useState<number>(geographicDocument.geographicLocationId);
    const [inputFromCategoryId, setInputFromCategoryId] = useState<number>(geographicDocument.categoryId);
    const [inputFromInstitutionId, setInputFromInstitutionId] = useState<number>(geographicDocument.institutionId);

    const handleDocumentTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputDocumentTitle(event.target.value);
    }

    const handleDocumentUriChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputDocumentUri(event.target.value);
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
                const locations = await getGeographicLocations();
                setGeographicLocations([...locations]);

                const categorys = await getGeographicCategorys();
                setGeographicCategorys([...categorys]);

                const institutions = await getInstitutions();
                setInstitutions([...institutions]);
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
        setInputFromLocationId(geographicDocument.geographicLocationId);
        setInputFromCategoryId(geographicDocument.categoryId);
        setInputFromInstitutionId(geographicDocument.institutionId);
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
                name="geographicDocumentTitle"
                label="Document Title"
                type="text"
                value={inputDocumentTitle}
                onChange={handleDocumentTitleChange}
                {...textProps}
            />
            <TextField
                fullWidth
                id="geographicDocumentUri"
                name="geographicDocumentUri"
                label="Document Link"
                type="text"
                value={inputDocumentUri}
                onChange={handleDocumentUriChange}
                {...textProps}
            />
            <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="fromGeographicLocationId-select-label">Location</InputLabel>
                <Select
                    id="fromGeographicLocationId-select"
                    name="fromGeographicLocationId"
                    label="Location"
                    value={inputFromLocationId.toString()}
                    onChange={handleFormLocationChange}
                    {...textProps}
                >
                    {locationMenuItems}
                </Select>
            </FormControl>
            <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="fromGeographicCategoryId-select-label">Category</InputLabel>
                <Select
                    id="fromGeographicCategoryId-select"
                    name="fromGeographicCategoryId"
                    label="Category"
                    value={inputFromCategoryId.toString()}
                    onChange={handleFormCategoryChange}
                    {...textProps}
                >
                    {categoryMenuItems}
                </Select>
            </FormControl>
            <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="fromInstitutionId-select-label">Institution</InputLabel>
                <Select
                    id="fromInstitutionId-select"
                    name="fromInstitutionId"
                    label="Institution"
                    value={inputFromInstitutionId.toString()}
                    onChange={handleFormInstitutionChange}
                    {...textProps}
                >
                    {institutionMenuItems}
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
