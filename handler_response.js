'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');
AWS.config.setPromisesDependency(require('bluebird'));
const dynamoDb = new AWS.DynamoDB.DocumentClient();

/* POST /responses/accept */
module.exports.submitResponse = async (event) => {
  const requestBody = JSON.parse(event.body);
  const {
    fullName,
    phoneNumber,
    city,
    treatmentType
  } = requestBody;

  if (typeof fullName !== 'string' ||
    typeof phoneNumber !== 'string' ||
    typeof city !== 'string' ||
    typeof treatmentType !== 'string') {
    return buildResponse(400, 'Validation failed. Invalid input type(s)')
  }

  const response = buildResponseItem(fullName, phoneNumber, city, treatmentType);

  await putResponse(response);
  return buildResponse(200, response)
}

/* Puts response in dynamo table */
const putResponse = async function putResponseInDynamo(response) {
  const responseItem = {
    TableName: process.env.RESPONSES_TABLE,
    Item: response,
  }

  await dynamoDb.put(responseItem).promise();
  return response;
}

/* Creates response item */
const buildResponseItem = function buildResponseItemDynamoModel(fullName, phoneNumber, city, treatmentType) {
  let timestamp = new Date().toLocaleString();
  return {
    id: uuid.v1(),
    'fullName': fullName,
    'phoneNumber': phoneNumber,
    'city': city,
    'treatmentType': treatmentType,
    'timestamp': timestamp,
  };
}

/* GET /responses */
module.exports.listResponses = async (event) => {
  let params = {
    TableName: process.env.RESPONSES_TABLE,
    ExpressionAttributeNames: { "#t": "timestamp" },
    ProjectionExpression: 'id, fullName, phoneNumber, city, treatmentType, #t'
  };

  const data = await dynamoDb.scan(params).promise();
  return buildResponse(200, data.Items)
}

const buildResponse = function buildHttpResponse(statusCode, message) {
  return {
    statusCode: statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    },
    body: JSON.stringify({
      message: message
    })
  }
}