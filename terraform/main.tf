provider "aws" {
  region = var.aws_region
}

# Create IAM Role for Lambda
resource "aws_iam_role" "lambda_role" {
  name = "lambda_execution_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }]
  })
}

# Attach Policy to IAM Role
resource "aws_iam_policy" "lambda_policy" {
  name        = "lambda_dynamodb_policy"
  description = "IAM policy for Lambda to access DynamoDB"
  
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = [
          "dynamodb:PutItem",
          "dynamodb:GetItem",
          "dynamodb:Scan"
        ]
        Resource = aws_dynamodb_table.users.arn
      },
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "arn:aws:logs:*:*:*"
      }
    ]
  })
}

# Attach IAM Policy to IAM Role
resource "aws_iam_role_policy_attachment" "lambda_role_attach" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = aws_iam_policy.lambda_policy.arn
}

# Create a DynamoDB Table
resource "aws_dynamodb_table" "users" {
  name         = "UserSignups"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "customerId"  

  attribute {
    name = "customerId"
    type = "S"
  }
}


# AWS Lambda Function
resource "aws_lambda_function" "signup_lambda" {
  filename      = "lambda.zip"
  function_name = "SignupHandler"
  role          = aws_iam_role.lambda_role.arn  # Now correctly referencing IAM role
  handler       = "app.lambda_handler"
  runtime       = "python3.8"
}

# API Gateway
resource "aws_api_gateway_rest_api" "signup_api" {
  name = "SignupAPI"
}

resource "aws_api_gateway_resource" "signup_resource" {
  rest_api_id = aws_api_gateway_rest_api.signup_api.id
  parent_id   = aws_api_gateway_rest_api.signup_api.root_resource_id
  path_part   = "submit"
}

resource "aws_api_gateway_method" "signup_method" {
  rest_api_id   = aws_api_gateway_rest_api.signup_api.id
  resource_id   = aws_api_gateway_resource.signup_resource.id
  http_method   = "POST"
  authorization = "NONE"
}

resource "aws_lambda_permission" "apigw_lambda" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.signup_lambda.function_name
  principal     = "apigateway.amazonaws.com"
}
