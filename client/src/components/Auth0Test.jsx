import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Auth0Test = () => {
    const { isAuthenticated, loginWithRedirect, logout, user, getAccessTokenSilently } = useAuth0();
    const [accessToken, setAccessToken] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getToken = async () => {
            try {
                const token = await getAccessTokenSilently();
                setAccessToken(token);
            } catch (err) {
                setError(err.message);
            }
        };

        if (isAuthenticated) {
            getToken();
        }
    }, [isAuthenticated, getAccessTokenSilently]);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Auth0 Configuration Test</h2>
            
            <div className="mb-4">
                <h3 className="text-lg font-semibold">Environment Variables:</h3>
                <pre className="bg-gray-100 p-2 rounded">
                    {`Domain: ${process.env.REACT_APP_AUTH0_DOMAIN}
Client ID: ${process.env.REACT_APP_AUTH0_CLIENT_ID}
Audience: ${process.env.REACT_APP_AUTH0_AUDIENCE}`}
                </pre>
            </div>

            <div className="mb-4">
                <h3 className="text-lg font-semibold">Authentication Status:</h3>
                <p>Is Authenticated: {isAuthenticated ? '✅ Yes' : '❌ No'}</p>
            </div>

            {isAuthenticated && (
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">User Info:</h3>
                    <pre className="bg-gray-100 p-2 rounded">
                        {JSON.stringify(user, null, 2)}
                    </pre>
                </div>
            )}

            {accessToken && (
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Access Token:</h3>
                    <p className="text-sm break-all">{accessToken}</p>
                </div>
            )}

            {error && (
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-red-600">Error:</h3>
                    <p className="text-red-600">{error}</p>
                </div>
            )}

            <div className="space-x-4">
                {!isAuthenticated ? (
                    <button
                        onClick={() => loginWithRedirect()}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Login
                    </button>
                ) : (
                    <button
                        onClick={() => logout({ returnTo: window.location.origin })}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                )}
            </div>
        </div>
    );
};

export default Auth0Test; 