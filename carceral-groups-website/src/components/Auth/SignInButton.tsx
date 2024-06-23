import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";
import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

/**
 * Renders a drop down button with child buttons for logging in with a popup or redirect
 * Note the [useMsal] package 
 */

export const SignInButton = () => {
    const { instance } = useMsal();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleLogin = (loginType: any) => {
        if (loginType === "popup") {
            instance
                .loginPopup(loginRequest)
                .then((response) => { instance.setActiveAccount(response.account)})
                .catch((e) => {
                    console.log(e);
                });
        } else if (loginType === "redirect") {
            instance
                .loginRedirect(loginRequest)
                .catch((e) => {
                    console.log(e);
                });
        }
    };
    return (
        <div>
            <Button
                onClick={(event) => setAnchorEl(event.currentTarget)}
                color="inherit"
            >
                Login
            </Button>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem onClick={() => handleLogin("popup")} key="loginPopup">Sign in using Popup</MenuItem>
                <MenuItem onClick={() => handleLogin("redirect")} key="loginRedirect">Sign in using Redirect</MenuItem>
            </Menu>
        </div>
    );
};