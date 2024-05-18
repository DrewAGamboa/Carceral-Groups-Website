import { Box, FormControl, InputLabel, MenuItem, Paper, TextField, Typography } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import GeographicDocument from "../../../models/GeographicDocument";
import { useEffect, useState } from "react";
import { getGeographicLocations } from "../../../api/services/GeographicLocationService";
import GeographicLocation from "../../../models/GeographicLocation";

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

    const [inputDocumentTitle, setInputDocumentTitle] = useState<string>(geographicDocument.geographicDocumentTitle || '');
    const [inputDocumentUri, setInputDocumentUri] = useState<string>(geographicDocument.geographicDocumentUri || '');
    const [inputFromLocationId, setInputFromLocationId] = useState<string>(geographicDocument.fromGeographicLocationId || '');

    const handleDocumentTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputDocumentTitle(event.target.value);
    }

    const handleDocumentUriChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputDocumentUri(event.target.value);
    }

    const handleFormLocationChange = (event: SelectChangeEvent) => {
        setInputFromLocationId(event.target.value);
    }

    const textProps = isEdit ? { required: true } : { disabled: true };

    useEffect(() => {
        const fetchData = async () => {
            try {
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
        setInputDocumentTitle(geographicDocument.geographicDocumentTitle);
        setInputDocumentUri(geographicDocument.geographicDocumentUri);
        setInputFromLocationId(geographicDocument.fromGeographicLocationId || '');
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
            <FormControl sx={{ m: 1, minWidth: 120 }}>
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
