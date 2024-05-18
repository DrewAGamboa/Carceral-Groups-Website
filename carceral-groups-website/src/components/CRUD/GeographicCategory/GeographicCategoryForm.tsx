import { Box, Paper, TextField, Typography } from "@mui/material";
import GeographicCategory from "../../../models/GeographicCategory";
import { useEffect, useState } from "react";


type GeographicCategoryFormProps = {
    geographicCategory: GeographicCategory
    children?: React.ReactNode;
    isEdit?: boolean;
}

const GeographicCategoryForm = (props: GeographicCategoryFormProps) => {
    const { geographicCategory, children, isEdit } = props;

    const [inputName, setInputName] = useState<string>(geographicCategory.name || '');

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputName(event.target.value);
    }

    const textProps = isEdit ? { required: true } : { disabled: true };

    useEffect(() => {
        setInputName(geographicCategory.name);
    }, [geographicCategory])

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
                id="name"
                name="name"
                label="Category Name"
                type="text"
                value={inputName}
                onChange={handleNameChange}
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

export default GeographicCategoryForm;