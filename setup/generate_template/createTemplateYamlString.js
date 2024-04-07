const { TABLE_NAME } = require("../../src/lambda/const");

exports.createTemplateYamlString = () => {
  return `AWSTemplateFormatVersion: 2010-09-09
Description: david-discord-bot

Transform:
  - AWS::Serverless-2016-10-31

Parameters:
  StageName:
    Type: String
    Description: Stage Name used in API GW
    Default: Prod

Globals:
  Function:
    Timeout: 10

Resources:
  apiGateway:
    Type: AWS::Serverless::Api
    Properties:
      StageName: Prod
      MethodSettings:
        - ResourcePath: /
          HttpMethod: ANY

  mainFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: src/lambda/
      Handler: main.handler
      Runtime: nodejs20.x
      Architectures:
        - x86_64
      MemorySize: 128
      Description: Main function
      Policies:
        - AWSLambdaBasicExecutionRole
      Events:
        ApiEvent:
          Type: Api
          Properties:
            Path: /
            Method: ANY
            RestApiId: !Ref apiGateway
      Policies:
        - AWSLambdaBasicExecutionRole
        - DynamoDBCrudPolicy:
            TableName: !Ref DataTable
      Environment:
        Variables:
          PUBLIC_KEY: ${process.env.PUBLIC_KEY}

  DataTable:
    Type: AWS::Serverless::SimpleTable
    Properties:
      PrimaryKey:
        Name: id
        Type: String
      TableName: ${TABLE_NAME}

Outputs:
  ProxyGWEndpoint:
    Description: API Gateway endpoint URL to pass to Discord Application Portal
    Value: !Sub >-
      https://\${apiGateway}.execute-api.\${AWS::Region}.amazonaws.com/\${StageName}/
`;
};
