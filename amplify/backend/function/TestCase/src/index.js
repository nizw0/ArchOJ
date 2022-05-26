/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require('aws-sdk')
const DynamoDB = new AWS.DynamoDB.DocumentClient()

let tableName = 'TestCases'
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
    const id = event.queryStringParameters.testCaseId
    const problemId = event.queryStringParameters.problemId
    body = (await get(id, problemId))?.Items
  } else if (method === 'POST') {
    const props = JSON.parse(event.body)
    const testCase = {
      testCaseId: props.testCaseId,
      problemId: props.problemId,
      input: props.input,
      output: props.output
    }
    await post({ testCase })
  } else if (method === 'PUT') {
    const props = JSON.parse(event.body)
    const testCase = {
      testCaseId: props.testCaseId,
      problemId: props.problemId,
      input: props.input,
      output: props.output
    }
    await put({ testCase })
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

async function get(testCaseId, problemId) {
  if (!testCaseId || !problemId) {
    return
  }
  const filterExpression = 'id = :id AND problem_id = :problem_id'
  const expressionAttributeValues = {
    ':id': testCaseId,
    ':problem_id': problemId
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
      id: props.testCase.testCaseId,
      problem_id: props.testCase.problemId,
      input: props.testCase.input,
      output: props.testCase.output
    }
  }
  return await DynamoDB.put(params, function (err, data) {
    if (err) console.log(err)
    else console.log(data)
  }).promise()
}

async function put(props) {
  console.log(props)
  const params = {
    TableName: tableName,
    Key: {
      id: props.testCase.testCaseId,
      problem_id: props.testCase.problemId
    },
    UpdateExpression: 'set #input = :input, #output = :output',
    ExpressionAttributeNames: {
      '#input': 'input',
      '#output': 'output'
    },
    ExpressionAttributeValues: {
      ':input': props.testCase.input,
      ':output': props.testCase.output
    },
    ReturnValues: 'UPDATED_NEW'
  }
  return await DynamoDB.update(params, function (err, data) {
    if (err) console.log(err)
    else console.log(data)
  }).promise()
}
