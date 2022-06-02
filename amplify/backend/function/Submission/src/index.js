/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require('aws-sdk')
const DynamoDB = new AWS.DynamoDB.DocumentClient()

let tableName = 'Submissions'
if (process.env.ENV && process.env.ENV !== 'NONE') {
  tableName = tableName + '-' + process.env.ENV
}

exports.handler = async (event) => {
  const method = event.requestContext.httpMethod
  let body = {}
  let statusCode = 200
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*'
  }

  if (method === 'GET') {
    const submissionId = event.queryStringParameters.submissionId
    body = (await get(submissionId))?.Items
  } else if (method === 'POST') {
    const props = JSON.parse(event.body)
    const submission = {
      id: props.submissionId,
      code: props.code,
      language: props.language
    }
    await post({ submission })
  } else {
    statusCode = 400
  }

  return {
    statusCode,
    headers,
    body: JSON.stringify(body),
    isBase64Encoded: false
  }
}

async function get(submissionId) {
  if (!submissionId) {
    return
  }
  const filterExpression = 'id = :id'
  const expressionAttributeValues = {
    ':id': submissionId
  }
  const params = {
    TableName: tableName,
    FilterExpression: filterExpression,
    ExpressionAttributeValues: expressionAttributeValues
  }
  return await DynamoDB.scan(params, function (err, data) {
    if (err) console.log(err)
    else console.log(data)
  }).promise()
}

async function post(props) {
  console.log(props)
  const params = {
    TableName: tableName,
    Item: {
      id: props.submission.id,
      code: props.submission.code,
      language: props.submission.language
    }
  }
  return await DynamoDB.put(params, function (err, data) {
    if (err) console.log(err)
    else console.log(data)
  }).promise()
}
