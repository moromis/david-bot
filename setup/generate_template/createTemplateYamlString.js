const { TABLE_NAME } = require("../../src/main/const");

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
    Timeout: 120

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
      CodeUri: src/main/
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

  Weekly:
    Type: AWS::Serverless::Function
    Properties:
      Description: cron-scheduled weekly function - makes a new primary message and stores its ID
      CodeUri: src/
      Handler: weekly/weekly.handler
      Runtime: nodejs20.x
      Architectures:
        - arm64
      MemorySize: 128
      Policies:
        - AWSLambdaBasicExecutionRole
        - DynamoDBCrudPolicy:
            TableName: !Ref DataTable
      Environment:
        Variables:
          CHANNEL_ID: ${process.env.CHANNEL_ID}
          BOT_TOKEN: ${process.env.BOT_TOKEN}
          GUILD_ID: ${process.env.GUILD_ID}

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
