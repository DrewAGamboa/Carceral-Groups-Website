import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "../components/Auth/SignInButton";
import { SignOutButton } from "../components/Auth/SignOutButton";

export default function Admin() {
    const isAuthenticated = useIsAuthenticated();

    return (
        <div>
            <h1>Admin Home Page</h1>
            {isAuthenticated ? <SignOutButton /> : <SignInButton />}
        </div>
    )
}