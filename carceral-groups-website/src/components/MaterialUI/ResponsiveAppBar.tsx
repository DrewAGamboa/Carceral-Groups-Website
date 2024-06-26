import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { SignOutButton } from '../Auth/SignOutButton';
import { SignInButton } from '../Auth/SignInButton';
import { AuthenticatedTemplate } from '@azure/msal-react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

const pages = [
    {name:'Geographic Location', link:'geographicLocations'},
    {name:'Documents', link:'geographicDocuments'},
    {name:'Category', link:'geographicCategorys'},
    {name:'Institution', link:'institutions'},
    {name:'Comments', link:'comments'},
];

type ResponsiveAppBarProps = {
    isAuthenticated: boolean;
};

function ResponsiveAppBar(props: ResponsiveAppBarProps) {
    const { isAuthenticated } = props;
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="fixed">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/admin"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        ADMIN
                    </Typography>
                    <AuthenticatedTemplate>
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                        {/* <Typography textAlign="center">{page}</Typography> */}
                                        <Link component={RouterLink} to={page.link}>{page.name}</Link>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </AuthenticatedTemplate>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/admin"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        ADMIN
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <AuthenticatedTemplate>
                            {pages.map((page) => (
                                <Button
                                    key={page.name}
                                    component={RouterLink}
                                    // onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                    to={page.link}
                                >
                                    {page.name}
                                </Button>
                            ))}
                        </AuthenticatedTemplate>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        {isAuthenticated ? <SignOutButton /> : <SignInButton />}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
