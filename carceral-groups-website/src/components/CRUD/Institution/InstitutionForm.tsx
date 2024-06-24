import { Box, TextField, Typography } from "@mui/material";
import Institution from "../../../models/Institution";
import { useEffect, useState } from "react";


type InstitutionFormProps = {
    institution: Institution
    children?: React.ReactNode;
    isEdit?: boolean;
}

const InstitutionForm = (props: InstitutionFormProps) => {
    const { institution, children, isEdit } = props;

    const [inputName, setInputName] = useState<string>(institution.name || '');

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputName(event.target.value);
    }

    const textProps = isEdit ? { required: true } : { disabled: true };

    useEffect(() => {
        setInputName(institution.name);
    }, [institution])

    return (
        <Box
            component="section"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
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
                margin="dense"
                id="name"
                name="name"
                label="Institution Name"
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
        </Box>
    )
}

export default InstitutionForm;