let AWS = require('aws-sdk')
let ECS = new AWS.ECS()

exports.handler = async (event, context) => {
  event.Records.forEach((record) => {
    console.log(JSON.stringify(record))
  })
  const record = event.Records[0]
  if (record.eventName === 'INSERT') {
    const params = {
      cluster: 'DevCluster',
      taskDefinition: 'Judge',
      networkConfiguration: {
        awsvpcConfiguration: {
          subnets: ['subnet-ecf06287', 'subnet-c7e820ba', 'subnet-87c8f8cb'],
          assignPublicIp: 'ENABLED'
        }
      },
      overrides: {
        containerOverrides: [
          {
            name: 'Judger',
            environment: [{ name: 'SUBMISSIONID', value: record.dynamodb.Keys.id.S }]
          }
        ]
      },
      count: 1
    }

    const result = await ECS.runTask(params, function (err, data) {
      if (err) console.log(err, err.stack)
      else console.log(JSON.stringify(data))
    }).promise()
    console.log(result)
    console.log('end')
  }
  context.done(null, 'Successfully processed.')
}
