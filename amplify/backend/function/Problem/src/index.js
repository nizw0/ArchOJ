/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require('aws-sdk')
const DynamoDB = new AWS.DynamoDB.DocumentClient()

let tableName = 'Problems'
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
    const id = event.queryStringParameters.problemId
    body = (await get(id))?.Item
  } else if (method === 'PUT') {
    console.log('PUT EVENT')
    const props = JSON.parse(event.body)
    const problem = {
      id: props.id,
      description: props.description
    }
    const res = await put({ problem })
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

async function get(problemId) {
  const params = {
    TableName: tableName,
    Key: {
      id: problemId
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
      id: props.problem.id
    },
    UpdateExpression: 'set description = :description',
    ExpressionAttributeValues: {
      ':description': props.profile.description
    },
    ReturnValues: 'UPDATED_NEW'
  }
  return await DynamoDB.update(params, function (err, data) {
    if (err) console.log(err)
    else console.log(data)
  }).promise()
}
