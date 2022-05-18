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
    "function": {
        "PathCheck": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    }
}