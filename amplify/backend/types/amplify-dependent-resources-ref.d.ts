export type AmplifyDependentResourcesAttributes = {
    "api": {
        "users": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        },
        "problems": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        },
        "submissions": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        },
        "workspaces": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        },
        "statistics": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        }
    },
    "auth": {
        "archojb72b727e": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        }
    },
    "function": {
        "PathCheck": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    }
}