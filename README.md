
# Demo Wallet API
The Wallet Service API is a RESTful API designed to provide wallet functionality for users. The API allows users to create an account, fund their account, transfer funds to another user's account, and withdraw funds from their account.

# Getting Started
To get started with the Wallet Service API, follow these steps:
1. Clone the repository: git clone 
2. Install dependencies: npm install or yarn install
3. Start the server: npm start or yarn start

# API Endpoints
The Wallet Service API provides the following endpoints:

- POST /users: Create a new user
- POST /fund-account: Fund a user account
- POST /transfer-funds: Transfer funds to another user's account
- POST /withdraw-funds: Withdraw funds from a user account

# Authentication
The Wallet Service API uses a faux token-based authentication system. When a user creates an account, a token is generated and returned in the response. This token must be included in the Authorization header of all subsequent requests.

# Request Headers
The following request headers are required for all API requests:

- Content-Type: application/json
- Authorization: Bearer <token>

# Error Handling
The Wallet Service API uses standard HTTP error codes to indicate the outcome of a request. The following error codes are used:

- 400 Bad Request: The request was invalid or cannot be processed.
- 401 Unauthorized: The request requires authentication or the provided credentials are invalid.
- 404 Not Found: The requested resource cannot be found.
- 500 Internal Server Error: An unexpected error occurred while processing the request.


![Entity relationship diagram for demo wallet] (er.jpg)
Wallet App Entity Relationship Diagram 
