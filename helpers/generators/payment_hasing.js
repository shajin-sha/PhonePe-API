const crypto = require('crypto');

function base64Encode(payload) {
    const buffer = Buffer.from(JSON.stringify(payload));
    return buffer.toString('base64');
}

// Function to calculate X-VERIFY header
function calculateXVerify(payload, saltKey, saltIndex) {
    const encodedPayload = base64Encode(payload);
    const hash = crypto.createHash('sha256');
    hash.update(encodedPayload + "/pg/v1/pay" + saltKey);
    const checksum = hash.digest('hex');
    const xVerify = checksum + '###' + saltIndex;
    return xVerify;
}



// Generate X-VERIFY header
function generateXVerifyHeader(merchantId, merchantTransactionId, saltKey, saltIndex) {
    const path = `/pg/v1/status/${merchantId}/${merchantTransactionId}`;
    const hash = crypto.createHash('sha256').update(path + saltKey).digest('hex');
    return `${hash}###${saltIndex}`;
  }
  

module.exports = { calculateXVerify, base64Encode, generateXVerifyHeader };