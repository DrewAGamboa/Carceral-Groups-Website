import { Box, Paper, TextField, Typography } from "@mui/material";
import GeographicSubCategory from "../../../models/GeographicSubCategory";
import { useEffect, useState } from "react";


type GeographicSubCategoryFormProps = {
    geographicSubCategory: GeographicSubCategory
    children?: React.ReactNode;
    isEdit?: boolean;
}

const GeographicSubCategoryForm = (props: GeographicSubCategoryFormProps) => {
    const { geographicSubCategory, children, isEdit } = props;

    const [inputName, setInputName] = useState<string>(geographicSubCategory.name || '');

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputName(event.target.value);
    }

    const textProps = isEdit ? { required: true } : { disabled: true };

    useEffect(() => {
        setInputName(geographicSubCategory.name);
    }, [geographicSubCategory])

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
                label="Sub Category Name"
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

export default GeographicSubCategoryForm;