const axios = require('axios');
const {PAYMENT_STATUS} = require('../const/endpoints')
require('dotenv').config();
const {generateXVerifyHeader} = require('./generators/payment_hasing');

function getPaymentStatus(merchantId, merchantTransactionId) {
  const saltKey = process.env.SALT;
  const saltIndex = 1;
  return new Promise((resolve, reject) => {
    const xVerify = generateXVerifyHeader(merchantId, merchantTransactionId, saltKey, saltIndex);

    const options = {
      method: 'GET',
      url: `${PAYMENT_STATUS}/${merchantId}/${merchantTransactionId}`,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'X-VERIFY': xVerify,
        'X-MERCHANT-ID': merchantId
      }
    };

    axios.request(options).then(function (response) {
        try {
          console.log(response.data);
          resolve(response.data.code == "PAYMENT_SUCCESS");
        } catch (error) {
          resolve(false);
        }
      }).catch(function (error) {
        reject(false);
      });
  });
}

module.exports = { getPaymentStatus };
