import uuid  # Import UUID module
from flask import Flask, request, jsonify
from flask_cors import CORS
import boto3

app = Flask(__name__)
CORS(app)

dynamodb = boto3.resource('dynamodb', region_name="us-east-1")
table = dynamodb.Table('UserSignups')

@app.route('/submit', methods=['POST'])
def submit():
    data = request.json

    # Generate a unique Customer ID using UUID
    customer_id = str(uuid.uuid4())  # Example: "550e8400-e29b-41d4-a716-446655440000"
    data["customerId"] = customer_id  # Add it to the data before saving

    #Save to DynamoDB
    response = table.put_item(Item=data)

    return jsonify({"message": "Signup successful", "customerId": customer_id, "response": response})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
