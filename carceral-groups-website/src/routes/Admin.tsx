import { useIsAuthenticated } from "@azure/msal-react";
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";

import ResponsiveAppBar from "../components/MaterialUI/ResponsiveAppBar";

export default function Admin() {
    const isAuthenticated = useIsAuthenticated();

    return (
        <>
            <ResponsiveAppBar isAuthenticated={isAuthenticated} />
            <MainContent />
        </>
    )
}

/**
* If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
*/
const MainContent = () => {
    return (
        <Box
            component="main"
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
            }}
        >
            <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
                <AuthenticatedTemplate>
                    <Outlet />
                </AuthenticatedTemplate>

                <UnauthenticatedTemplate>
                    <h5>
                        <center>
                            Please sign-in.
                        </center>
                    </h5>
                </UnauthenticatedTemplate>
            </Container>
        </Box>
    );
};
