cd src
rm dev-lambda.zip
cd lambda
zip -q -r ../dev-lambda.zip *
cd ..
aws lambda update-function-code --no-cli-pager \
    --function-name bot \
    --zip-file fileb://./dev-lambda.zip \
    --profile david-bot-dev
cd ../register_commands
DEV=true node register.js