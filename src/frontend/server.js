cat << 'EOF' > src/frontend/server.js
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';

app.get('/', async (req, res) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/billing/status`);
        res.send(`<h1>TTSL Telecom Billing Dashboard</h1><h3>Backend Status: ${response.data.status}</h3>`);
    } catch (error) {
        res.status(500).send(`<h1>TTSL Dashboard Error</h1><p>Cannot connect to Billing Backend.</p>`);
    }
});

app.listen(PORT, () => console.log(`Frontend running on port ${PORT}`));
EOF
