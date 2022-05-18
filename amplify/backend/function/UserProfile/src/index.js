/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

async function get(userId) {
  const AWS = require('aws-sdk')
  const dynamodb = new AWS.DynamoDB.DocumentClient()

  let tableName = 'UserProfile'
  if (process.env.ENV && process.env.ENV !== 'NONE') {
    tableName = tableName + '-' + process.env.ENV
  }

  const params = {
    TableName: tableName,
    Key: {
      id: userId
    }
  }

  let data = {}
  await dynamodb
    .get(params)
    .promise()
    .then((res) => {
      data = res
    })
    .catch((err) => {
      console.log(err)
    })
  console.log(data)
  return data
}

exports.handler = async (event) => {
  const userId = event.queryStringParameters.userId
  const body = JSON.stringify([(await get(userId))?.Item])
  const statusCode = 200
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*'
  }

  return {
    statusCode,
    headers,
    body,
    isBase64Encoded: false
  }
}
