const axios = require('axios');
require('dotenv').config();

async function testAuth0() {
    try {
        // Test 1: Verify Auth0 domain is accessible
        console.log('Testing Auth0 domain accessibility...');
        const domainResponse = await axios.get(`https://${process.env.AUTH0_DOMAIN}/`);
        console.log('✅ Auth0 domain is accessible');

        // Test 2: Try to get Auth0 configuration
        console.log('\nTesting Auth0 configuration...');
        const configResponse = await axios.get(`https://${process.env.AUTH0_DOMAIN}/.well-known/openid-configuration`);
        console.log('✅ Auth0 configuration is accessible');
        console.log('Available endpoints:', configResponse.data);

        // Test 3: Verify environment variables
        console.log('\nVerifying environment variables...');
        const requiredVars = [
            'AUTH0_DOMAIN',
            'AUTH0_AUDIENCE',
            'AUTH0_CLIENT_ID',
            'AUTH0_CLIENT_SECRET'
        ];

        const missingVars = requiredVars.filter(varName => !process.env[varName]);
        if (missingVars.length === 0) {
            console.log('✅ All required Auth0 environment variables are set');
        } else {
            console.log('❌ Missing environment variables:', missingVars);
        }

    } catch (error) {
        console.error('❌ Error testing Auth0:', error.message);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
    }
}

testAuth0(); 