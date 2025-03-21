import uuid
from flask import Flask, request, jsonify
from flask_cors import CORS
import boto3

app = Flask(__name__)

# Allow only specific frontend origin (React frontend at localhost:3000)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Initialize DynamoDB
dynamodb = boto3.resource('dynamodb', region_name="us-east-1")
table = dynamodb.Table('UserSignups')

# Signup Route (Stores user details in DynamoDB)
@app.route('/submit', methods=['POST'])
def submit():
    data = request.json

    # Generate a unique Customer ID
    customer_id = str(uuid.uuid4())
    data["customerId"] = customer_id  # Add customerId to user data

    # Save to DynamoDB
    table.put_item(Item=data)

    return jsonify({"message": "Signup successful", "customerId": customer_id}), 201

# Login Route (Validates user credentials)
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    # ✅ Scan DynamoDB if email is NOT a primary key
    response = table.scan(
        FilterExpression="email = :email",
        ExpressionAttributeValues={":email": email}
    )

    # ✅ If email exists, check password
    if "Items" in response and len(response["Items"]) > 0:
        user = response["Items"][0]  # Get first matching item
        stored_password = user.get("password")

        if stored_password == password:
            return jsonify({"message": "Login successful", "customerId": user['customerId']}), 200
        else:
            return jsonify({"error": "Invalid password"}), 401
    else:
        return jsonify({"error": "User not found"}), 404
    
@app.route('/user', methods=['GET'])
def get_user():
    customer_id = request.args.get("customerId")  # Get customerId from query param
    if not customer_id:
        return jsonify({"error": "Customer ID is required"}), 400

    response = table.scan(
        FilterExpression="customerId = :customerId",
        ExpressionAttributeValues={":customerId": customer_id}
    )

    if "Items" in response and len(response["Items"]) > 0:
        user = response["Items"][0]
        return jsonify({"firstName": user["firstName"], "lastName": user["lastName"]})
    else:
        return jsonify({"error": "User not found"}), 404


# Run Flask App
if __name__ == "__main__":
    app.run(debug=True, port=5000)
