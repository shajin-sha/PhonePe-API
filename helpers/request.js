const axios = require('axios');
const crypto = require('crypto');
const { base64Encode, calculateXVerify } = require('./generators/payment_hasing');
const { PAYMENT_REQUEST } = require('../const/endpoints');
require('dotenv').config();
const generateTransactionId = require('./generators/transaction_id');

function makePayment(amount, mobileNumber) {
  return new Promise((resolve, reject) => {

    const payload = {
      merchantId: process.env.MERCHANT_ID,
      merchantTransactionId: generateTransactionId(),
      merchantUserId: 'MUID139',
      amount: amount,
      redirectUrl: 'https://webhook.site/redirect-url',
      redirectMode: 'POST',
      callbackUrl: 'https://webhook.site/callback-url',
      mobileNumber: mobileNumber,
      paymentInstrument: {type: 'PAY_PAGE'}
    };

    const xVerify = calculateXVerify(payload, process.env.SALT, 1);

    const options = {
      method: 'POST',
      url: PAYMENT_REQUEST,
      headers: {'Content-Type': 'application/json','X-VERIFY': xVerify},
      data: {request: base64Encode(payload)}
    };

    axios.request(options).then(function (response) {
        resolve(response.data);
      }).catch(function (error) {
        reject(error);
      });
  });
}

module.exports = { makePayment };
