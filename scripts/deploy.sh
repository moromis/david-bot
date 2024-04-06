cd src
rm lambda.zip
cd lambda
zip -q -r ../lambda.zip *
cd ..
aws lambda update-function-code --no-cli-pager \
    --function-name bot \
    --zip-file fileb://../lambda.zip
cd ../register_commands
node register.js