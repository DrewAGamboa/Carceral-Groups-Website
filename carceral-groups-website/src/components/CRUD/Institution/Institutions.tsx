import {
    Outlet,
    useLoaderData,
    Form,
    redirect,
} from "react-router-dom"
import Institution, { primaryKeyName }  from "../../../models/Institution";
import { Box, Button, Drawer, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { createInstitution, getInstitutions } from "../../../api/services/InstitutionService";
import BasicTable from "../../MaterialUI/BasicTable";
import Paper from '@mui/material/Paper';
import { useState } from "react";

export async function loader() {
    const institutions = await getInstitutions();
    return { institutions }
}

export async function action() {
    const institution = await createInstitution();
    if (institution === null) {
        return redirect('/admin/institutions');
    }
    return redirect(`/admin/institutions/${institution.institutionId}/edit`);
}

const Institutions = () => {
    const { institutions } = useLoaderData() as { institutions: Institution[] };
    const tableHeaderInfo = [{ name: "Id" }, { name: "Institution" }]
    const tableRows = institutions
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const handleTableClick = (rowId: string) => {
        setOpen(true);
        navigate(`${rowId}`);
    }

    return (
        <>
            <Paper
                sx={{ p: 2, my: 4 }}
            >
                <Typography
                    component="h1"
                    variant="h4"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                >
                    Institutions
                </Typography>
                <Box
                    display="flex"
                    justifyContent={'flex-end'}
                >
                    <Form method="post">
                        <Button type="submit" variant="contained" color="success">New</Button>
                    </Form>
                </Box>
                <Box sx={{ my: 2 }}>
                    <BasicTable tableHeaderInfo={tableHeaderInfo} rows={tableRows} primaryKeyName={primaryKeyName} handleTableRowClick={handleTableClick} />
                </Box>
            </Paper>
            <Drawer
                anchor="right"
                open={open}
                onClose={() => setOpen(false)}
                sx={{
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '25%' },
                }}
            >
                <Outlet />
            </Drawer>
        </>
    )
}

export default Institutions;
