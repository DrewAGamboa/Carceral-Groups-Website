import { Box, FormControl, InputLabel, MenuItem, TextField, Typography } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import GeographicDocument from "../../../models/GeographicDocument";
import { useEffect, useState } from "react";
import { getGeographicLocations } from "../../../api/services/GeographicLocationService";
import GeographicLocation from "../../../models/GeographicLocation";
import GeographicCategory from "../../../models/GeographicCategory";
import GeographicSubCategory from "../../../models/GeographicSubCategory";
import { getGeographicCategorys } from "../../../api/services/GeographicCategoryService";
import { getGeographicSubCategorys } from "../../../api/services/GeographicSubCategoryService";

type GeographicDocumentFormProps = {
    geographicDocument: GeographicDocument
    children?: React.ReactNode;
    isEdit?: boolean;
}

const GeographicDocumentForm = (props: GeographicDocumentFormProps) => {
    const { geographicDocument, children, isEdit } = props;
    const [geographicLocations, setGeographicLocations] = useState<readonly GeographicLocation[]>([]);
    const locationMenuItems = geographicLocations.map((location: GeographicLocation) => {
        return <MenuItem key={location.GeographicLocationId} value={location.GeographicLocationId}>{location.GeographicLocationName}</MenuItem>
    });

    const [geographicCategorys, setGeographicCategorys] = useState<readonly GeographicCategory[]>([]);
    const categoryMenuItems = geographicCategorys.map((category: GeographicCategory) => {
        return <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
    });

    const [geographicSubCategorys, setGeographicSubCategorys] = useState<readonly GeographicSubCategory[]>([]);
    const subCategoryMenuItems = geographicSubCategorys.map((subCategory: GeographicSubCategory) => {
        return <MenuItem key={subCategory.id} value={subCategory.id}>{subCategory.name}</MenuItem>
    });

    const [inputDocumentTitle, setInputDocumentTitle] = useState<string>(geographicDocument.geographicDocumentTitle || '');
    const [inputDocumentUri, setInputDocumentUri] = useState<string>(geographicDocument.geographicDocumentUri || '');
    const [inputFromLocationId, setInputFromLocationId] = useState<string>(geographicDocument.fromGeographicLocationId || '');
    const [inputFromCategoryId, setInputFromCategoryId] = useState<string>(geographicDocument.fromGeographicCategoryId || '');
    const [inputFromSubCategoryId, setInputFromSubCategoryId] = useState<string>(geographicDocument.fromGeographicSubCategoryId || '');

    const handleDocumentTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputDocumentTitle(event.target.value);
    }

    const handleDocumentUriChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputDocumentUri(event.target.value);
    }

    const handleFormLocationChange = (event: SelectChangeEvent) => {
        setInputFromLocationId(event.target.value);
    }

    const handleFormCategoryChange = (event: SelectChangeEvent) => {
        setInputFromCategoryId(event.target.value);
    }

    const handleFormSubCategoryChange = (event: SelectChangeEvent) => {
        setInputFromSubCategoryId(event.target.value);
    }

    const textProps = isEdit ? { required: true } : { disabled: true };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const locations = await getGeographicLocations();
                setGeographicLocations([...locations]);

                const categorys = await getGeographicCategorys();
                setGeographicCategorys([...categorys]);

                const subCategorys = await getGeographicSubCategorys();
                setGeographicSubCategorys([...subCategorys]);
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [])

    useEffect(() => {
        setInputDocumentTitle(geographicDocument.geographicDocumentTitle);
        setInputDocumentUri(geographicDocument.geographicDocumentUri);
        setInputFromLocationId(geographicDocument.fromGeographicLocationId || '');
        setInputFromCategoryId(geographicDocument.fromGeographicCategoryId || '');
        setInputFromSubCategoryId(geographicDocument.fromGeographicSubCategoryId || '');
    }, [geographicDocument])

    return (
        <Box
            component="section"
            sx={{
                '& .MuiTextField-root': { m: 1},
                p: 2,
                m:4,
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
                    value={inputFromLocationId}
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
                    value={inputFromCategoryId}
                    onChange={handleFormCategoryChange}
                    {...textProps}
                >
                    {categoryMenuItems}
                </Select>
            </FormControl>
            <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="fromGeographicSubCategoryId-select-label">SubCategory</InputLabel>
                <Select
                    id="fromGeographicSubCategoryId-select"
                    name="fromGeographicSubCategoryId"
                    label="SubCategory"
                    value={inputFromSubCategoryId}
                    onChange={handleFormSubCategoryChange}
                    {...textProps}
                >
                    {subCategoryMenuItems}
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
