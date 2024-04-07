create and attach this policy to the IAM user you're using on the CLI

The full list of permissions that should be rolled into a single policy, ideally is:
- IAMFullAccess
- CloudWatchEventsFullAccess
- AWSLambda_FullAccess
- AWSCodeDeployRoleForLambda
- AWSCloudFormationFullAccess
- AmazonSNSFullAccess
- AmazonS3FullAccess
- AmazonDynamoDBFullAccess
- AmazonAPIGatewayAdministrator