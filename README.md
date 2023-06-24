# PhonePe-API
#### PhonePe API Sever side integration | Request payment & check status.


## Setup
<!-- tell to create an .env file with followining data : -->
.env file
```.env
PORT=5000
SALT=YOUR_SALT
MERCHANT_ID=YOUR_MERCHANT_ID
```

## install dependencies
```bash
npm install
```

## Run
```bash
npm start
```

## API Endpoints

### Request Payment
```bash
POST /request-payment
```
#### Request Body
```json
{
    "amount": "1",
    "mobileNumber": "9999999999",
},
```

#### Response body
```
{
    "url":"CHECKOUT_PAGE_URL",
    "transactionId":"TRANSACTION_ID",
    "merchantId":"MERCHANT_ID"
}
```


### Check Transaction Status
```bash
POST /payment-status
```

#### Request Body
```json
{
    "merchantId": "MERCHANT_ID",
    "merchantTransactionId": "TRANSACTION_ID"
}
```

#### Response Body
NB: for detialed information is available in the [PhonePe API Documentation](https://developer.phonepe.com/docs/phonepe-api/phonepe-api-references/phonepe-api-references-for-merchants#check-transaction-status) and you can find many felids in the response body for now we are only using the status field true.
```json
{
    true
}
```