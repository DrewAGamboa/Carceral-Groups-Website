import { Box, TextField, Typography } from "@mui/material";
import GeographicCategory from "../../../models/GeographicCategory";
import { useEffect, useState } from "react";
import { MuiColorInput } from 'mui-color-input'

type GeographicCategoryFormProps = {
    geographicCategory: GeographicCategory
    children?: React.ReactNode;
    isEdit?: boolean;
}

const GeographicCategoryForm = (props: GeographicCategoryFormProps) => {
    const { geographicCategory, children, isEdit } = props;

    const [inputName, setInputName] = useState<string>(geographicCategory.name || '');
    const [inputColor, setInputColor] = useState<string>(geographicCategory.color || '');

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputName(event.target.value);
    }

    const handleColorChange = (value: string) => {
        setInputColor(value);
    }

    const textProps = isEdit ? { required: true } : { disabled: true };
    const notRequiredTextProps = isEdit ? {} : { disabled: true };

    useEffect(() => {
        setInputName(geographicCategory.name);
        setInputColor(geographicCategory.color || '');
    }, [geographicCategory])

    return (
        <Box
            component="section"
            sx={{
                '& .MuiTextField-root': { m: 1 },
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
                margin="dense"
                id="name"
                name="name"
                label="Category Name"
                type="text"
                value={inputName}
                onChange={handleNameChange}
                {...textProps}
            />
            <MuiColorInput
                fullWidth
                margin="dense"
                id="color"
                name="color"
                format="hex"
                value={inputColor}
                onChange={handleColorChange}
                label="Category Color"
                {...notRequiredTextProps}
            />
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

export default GeographicCategoryForm;