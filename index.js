const express = require('express');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser')

// Helper functions.
const makePayment = require('./helpers/request');
const getPaymentStatus = require('./helpers/status');

// Load environment variables.
require('dotenv').config();

// Define ex
const app = express();

// Use json body parser.
app.use(bodyParser.json());
app.use(cors());

// Certificate for https server.
var privateKey = fs.readFileSync("/etc/letsencrypt/live/screl.com/privkey.pem", "utf8");
var certificate = fs.readFileSync("/etc/letsencrypt/live/screl.com/fullchain.pem","utf8");

var credentials = { key: privateKey, cert: certificate };

// Request payment, and return response. 
// This will retrun url for payment page.
// Then show webview of this url in your app or in web open this url in browser.
app.post('/request-payment', (req, res) => {
    const { amount, mobileNumber } = req.body;
    console.log(req.body);
    makePayment.makePayment(amount, mobileNumber).then((response) => {
        console.log(response);
        res.status(200).json({
            "url": response.data.instrumentResponse.redirectInfo.url,
            "transactionId": response.data.merchantTransactionId,
            "merchantId": response.data.merchantId
        });
    }).catch((error) => {
        console.log(error);
        res.status(500).json(error);
    });
});

// This will return payment status of given transactio id.
// Call this in every 2 seconds is recommended by phonepe, (see : https://developer.phonepe.com/docs/phonepe-api/payment-status)
app.get('/payment-status', (req, res) => {
    const { merchantId, merchantTransactionId} = req.query;
    console.log(req.query);
    getPaymentStatus.getPaymentStatus(merchantId, merchantTransactionId).then((response) => {
        res.status(200).json(response);
    }).catch((error) => {
        res.status(500).json(error);
    });
});

// Start server on given port.
var httpsServer = https.createServer(credentials, app);
httpsServer.listen(process.env.PORT, () => {
    console.log(`Secured server listening on port ${process.env.PORT} `);
});
