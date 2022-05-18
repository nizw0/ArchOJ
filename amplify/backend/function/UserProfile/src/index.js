/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require('aws-sdk')
const DynamoDB = new AWS.DynamoDB.DocumentClient()

let tableName = 'UserProfile'
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
    const userId = event.queryStringParameters.userId
    body = (await get(userId))?.Item
  } else if (method === 'PUT') {
    console.log('PUT EVENT')
    const props = JSON.parse(event.body)
    const profile = {
      id: props.userId,
      name: props.name,
      phone: props.phone
    }
    const res = await put({ profile })
    console.log('res', res)
    console.log('FINISH')
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

async function get(userId) {
  const params = {
    TableName: tableName,
    Key: {
      id: userId
    }
  }
  return await DynamoDB.get(params, function (err, data) {
    if (err) console.log(err)
    else console.log(data)
  }).promise()
}

async function put(props) {
  console.log(props)
  const params = {
    TableName: tableName,
    Key: {
      id: props.profile.id
    },
    UpdateExpression: 'set #name = :name, phone = :phone',
    ExpressionAttributeNames: {
      '#name': 'name'
    },
    ExpressionAttributeValues: {
      ':name': props.profile.name,
      ':phone': props.profile.phone
    },
    ReturnValues: 'UPDATED_NEW'
  }
  return await DynamoDB.update(params, function (err, data) {
    if (err) console.log(err)
    else console.log(data)
  }).promise()
}
