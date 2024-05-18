import { Box, TextField, Typography } from "@mui/material";
import GeographicLocation from "../../../models/GeographicLocation";
import { useEffect, useState } from "react";


type GeographicLocationFormProps = {
    geographicLocation: GeographicLocation
    children?: React.ReactNode;
    isEdit?: boolean;
}

const GeographicLocationForm = (props: GeographicLocationFormProps) => {
    const { geographicLocation, children, isEdit } = props;

    const [inputName, setInputName] = useState<string>(geographicLocation.geographicLocationName || '');
    const [inputLatitude, setInputLatitude] = useState<string>(geographicLocation.geographicLocationLat || '');
    const [inputLongitude, setInputLongitude] = useState<string>(geographicLocation.geographicLocationLong || '');

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputName(event.target.value);
    }

    const handleLatitudeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputLatitude(event.target.value);
    }

    const handleLongitudeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputLongitude(event.target.value);
    }

    const textProps = isEdit ? { required: true } : { disabled: true };

    useEffect(() => {
        setInputName(geographicLocation.geographicLocationName);
        setInputLatitude(geographicLocation.geographicLocationLat);
    }, [geographicLocation])

    return (
        <Box
            component="section"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}>
            <Typography
                component="h1"
                variant="h2"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
            >
                Details
            </Typography>
            <Box
                display="flex"
                justifyContent={'flex-end'}
                sx={{ pt: 2 }}
            >
                {children}
            </Box>

            <TextField
                margin="dense"
                id="name"
                name="geographicLocationName"
                label="Name"
                type="text"
                value={inputName}
                onChange={handleNameChange}
                {...textProps}
            />
            <TextField
                margin="dense"
                id="latitude"
                name="geographicLocationLat"
                label="Latitude"
                type="text"
                value={inputLatitude}
                onChange={handleLatitudeChange}
                {...textProps}
            />
            <TextField
                margin="dense"
                id="longitude"
                name="geographicLocationLong"
                label="Longitude"
                type="text"
                value={inputLongitude}
                onChange={handleLongitudeChange}
                {...textProps}
            />
        </Box>
    )
}

export default GeographicLocationForm;