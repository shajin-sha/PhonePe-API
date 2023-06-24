const uuid = require('uuid');

function generateTransactionId() {
    // Max 30 characters, no special characters.
    return uuid.v4().replace(/-/g, '').substring(0, 30);
}


// Default export
module.exports = generateTransactionId;