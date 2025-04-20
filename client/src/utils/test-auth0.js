const axios = require('axios');

async function testClientAuth0() {
    try {
        // Test 1: Verify environment variables
        console.log('Verifying client environment variables...');
        const requiredVars = [
            'REACT_APP_AUTH0_DOMAIN',
            'REACT_APP_AUTH0_CLIENT_ID',
            'REACT_APP_AUTH0_AUDIENCE'
        ];

        const missingVars = requiredVars.filter(varName => !process.env[varName]);
        if (missingVars.length === 0) {
            console.log('✅ All required Auth0 environment variables are set');
        } else {
            console.log('❌ Missing environment variables:', missingVars);
            return;
        }

        // Test 2: Verify Auth0 domain is accessible
        console.log('\nTesting Auth0 domain accessibility...');
        const domainResponse = await axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/`);
        console.log('✅ Auth0 domain is accessible');

        // Test 3: Try to get Auth0 configuration
        console.log('\nTesting Auth0 configuration...');
        const configResponse = await axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/openid-configuration`);
        console.log('✅ Auth0 configuration is accessible');
        console.log('Available endpoints:', configResponse.data);

        // Test 4: Verify client configuration
        console.log('\nVerifying client configuration...');
        console.log('Domain:', process.env.REACT_APP_AUTH0_DOMAIN);
        console.log('Client ID:', process.env.REACT_APP_AUTH0_CLIENT_ID);
        console.log('Audience:', process.env.REACT_APP_AUTH0_AUDIENCE);

    } catch (error) {
        console.error('❌ Error testing Auth0:', error.message);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
    }
}

testClientAuth0(); 