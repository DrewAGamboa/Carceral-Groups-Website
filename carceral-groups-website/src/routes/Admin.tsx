import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "../components/Auth/SignInButton";
import { SignOutButton } from "../components/Auth/SignOutButton";
import { callMsGraph } from '../graph';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { useState } from "react";
import { loginRequest } from "../authConfig";
import { ProfileData } from "../components/Auth/ProfileData";
import { Button } from "@mui/material";

export default function Admin() {
    const isAuthenticated = useIsAuthenticated();

    return (
        <div>
            {isAuthenticated ? <SignOutButton /> : <SignInButton />}
            <h1>Admin Home Page</h1>
            <MainContent />
        </div>
    )
}

/**
* If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
*/
const MainContent = () => {
    return (
        <div className="App">
            <AuthenticatedTemplate>
                <ProfileContent />
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                <h5>
                    <center>
                        Please sign-in to see your profile information.
                    </center>
                </h5>
            </UnauthenticatedTemplate>
        </div>
    );
};


/**
* Renders information about the signed-in user or a button to retrieve data about the user
*/
const ProfileContent = () => {
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);

    function RequestProfileData() {
        // Silently acquires an access token which is then attached to a request for MS Graph data
        instance
            .acquireTokenSilent({
                ...loginRequest,
                account: accounts[0],
            })
            .then((response) => {
                callMsGraph(response.accessToken).then((response) => setGraphData(response));
            });
    }

    return (
        <>
            <h5 className="card-title">Welcome {accounts[0].name}</h5>
            <br/>
            {graphData ? (
                <ProfileData graphData={graphData} />
            ) : (
                <Button onClick={RequestProfileData}>
                    Request Profile Information
                </Button>
            )}
        </>
    );
};