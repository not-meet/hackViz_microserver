# MedConnect API Documentation

This documentation provides information about all the available API endpoints, their functionality, and how to use them. The API is built with Next.js API routes and uses Prisma with a database for data management.

## Table of Contents

- [Overview](#overview)
- [Base URL](#base-url)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
  - [Users](#users)
  - [Medical Reports](#medical-reports)
  - [Medicine Requests](#medicine-requests)
  - [Sellers](#sellers)
- [Data Models](#data-models)
- [Error Handling](#error-handling)
- [Examples](#examples)

## Overview

The API provides endpoints to manage users, medical reports, medicine requests, and sellers in a healthcare application. It follows RESTful principles and returns responses in JSON format.

## Base URL

```
https://your-domain.com/api
```

## Authentication

Authentication details should be provided here. The current implementation does not show authentication middleware.

## API Endpoints

### Users

#### Get All Users

```
GET /api/users
```

Returns a list of all users in the system.

**Response:**
```json
{
  "success": true,
  "data": [/* array of user objects */]
}
```

**Example:**
```bash
curl -X GET https://your-domain.com/api/users
```

#### Create a New User

```
POST /api/users
```

Creates a new user in the system.

**Request Body:**
```json
{
  "name": "John Doe",
  "age": 35,
  "bloodGrp": "O+",
  "sex": "Male",
  "address": "123 Main St, Anytown, USA"
}
```

**Response:**
```json
{
  "success": true,
  "data": {/* created user object */}
}
```

**Example:**
```bash
curl -X POST https://your-domain.com/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","age":35,"bloodGrp":"O+","sex":"Male","address":"123 Main St, Anytown, USA"}'
```

#### Get User by ID

```
GET /api/users/[id]
```

Retrieves a specific user by their ID.

**Response:**
```json
{
  "success": true,
  "data": {/* user object */}
}
```

**Example:**
```bash
curl -X GET https://your-domain.com/api/users/user123
```

#### Update User

```
PUT /api/users/[id]
```

Updates a specific user's information.

**Request Body:**
```json
{
  "name": "John Smith",
  "age": 36
  // Include only fields you want to update
}
```

**Response:**
```json
{
  "success": true,
  "data": {/* updated user object */}
}
```

#### Delete User

```
DELETE /api/users/[id]
```

Removes a user from the system.

**Response:**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

### Medical Reports

#### Get All Medical Reports

```
GET /api/medical?userId=[userId]
```

Retrieves all medical reports for a specific user.

**Response:**
```json
{
  "success": true,
  "data": [/* array of medical report objects */]
}
```

#### Create a New Medical Report

```
POST /api/medical
```

Creates a new medical report.

**Request Body:**
```json
{
  "userId": "user123",
  "diagnosis": "Common Cold",
  "treatment": "Rest and fluids",
  "notes": "Follow up in one week if symptoms persist"
  // Other medical case fields
}
```

**Response:**
```json
{
  "success": true,
  "data": {/* created medical report object */}
}
```

**Example:**
```bash
curl -X POST https://your-domain.com/api/medical \
  -H "Content-Type: application/json" \
  -d '{"userId":"user123","diagnosis":"Common Cold","treatment":"Rest and fluids","notes":"Follow up in one week if symptoms persist"}'
```

#### Get Medical Report by ID

```
GET /api/medical/[id]
```

Retrieves a specific medical report by its ID.

**Response:**
```json
{
  "success": true,
  "data": {/* medical report object */}
}
```

#### Update Medical Report

```
PUT /api/medical/[id]
```

Updates a specific medical report.

**Request Body:**
```json
{
  "diagnosis": "Updated Diagnosis",
  "treatment": "Updated Treatment Plan"
  // Include only fields you want to update
}
```

**Response:**
```json
{
  "success": true,
  "data": {/* updated medical report object */}
}
```

### Medicine Requests

#### Create a New Medicine Request

```
POST /api/medicine-req
```

Creates a new medicine request.

**Request Body:**
```json
{
  "userId": "user123",
  "medicineName": "Amoxicillin",
  "quantity": 30,
  "urgency": "Medium"
  // Other medicine request fields
}
```

**Response:**
```json
{
  "success": true,
  "data": {/* created medicine request object */}
}
```

#### Get User's Medicine Requests

```
GET /api/medicine-req/[userId]
```

Retrieves all medicine requests for a specific user.

**Response:**
```json
{
  "success": true,
  "data": [/* array of medicine request objects with seller details */]
}
```

#### Delete Medicine Request

```
DELETE /api/medicine-req/[id]
```

Removes a medicine request from the system.

**Response:**
```json
{
  "success": true,
  "message": "Request deleted successfully"
}
```

#### Assign Seller to Medicine Request

```
PATCH /api/medicine-req/[id]/assign
```

Assigns a seller to fulfill a medicine request.

**Request Body:**
```json
{
  "sellerId": "seller123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {/* updated medicine request object with seller details */}
}
```

**Example:**
```bash
curl -X PATCH https://your-domain.com/api/medicine-req/req123/assign \
  -H "Content-Type: application/json" \
  -d '{"sellerId":"seller123"}'
```

### Sellers

#### Get All Sellers

```
GET /api/seller
```

Returns a list of all medicine sellers in the system.

**Response:**
```json
{
  "success": true,
  "data": [/* array of seller objects */]
}
```

#### Create a New Seller

```
POST /api/seller
```

Registers a new medicine seller in the system.

**Request Body:**
```json
{
  "name": "City Pharmacy",
  "address": "456 Oak St, Anytown, USA",
  "phone": "+1234567890",
  "email": "contact@citypharmacy.com"
  // Other seller fields
}
```

**Response:**
```json
{
  "success": true,
  "data": {/* created seller object */}
}
```

#### Update Seller

```
PATCH /api/seller/[id]
```

Updates a specific seller's information.

**Request Body:**
```json
{
  "name": "Updated Pharmacy Name",
  "phone": "+10987654321"
  // Include only fields you want to update
}
```

**Response:**
```json
{
  "success": true,
  "data": {/* updated seller object */}
}
```

#### Delete Seller

```
DELETE /api/seller/[id]
```

Removes a seller from the system.

**Response:**
```json
{
  "success": true,
  "message": "Seller deleted successfully"
}
```

## Data Models

### User
- `id`: String (unique identifier)
- `name`: String
- `age`: Integer
- `bloodGroup`: Enum (O_POS, O_NEG, A_POS, A_NEG, B_POS, B_NEG, AB_POS, AB_NEG)
- `sex`: Enum (Male, Female, Other)
- `address`: String

### Medical Case
- `id`: String (unique identifier)
- `userId`: String (reference to User)
- Other medical case fields (diagnosis, treatment, etc.)

### Medicine Request
- `id`: String (unique identifier)
- `userId`: String (reference to User)
- `sellerId`: String (reference to Seller, optional)
- `medicineName`: String
- `quantity`: Integer
- `urgency`: String
- `isPickedUp`: Boolean (default: false)

### Seller
- `id`: String (unique identifier)
- `name`: String
- `address`: String
- `phone`: String
- `email`: String

## Error Handling

All endpoints follow a consistent error response format:

```json
{
  "success": false,
  "error": "Error message describing the issue"
}
```

Common HTTP status codes:
- `200`: Successful operation
- `201`: Resource created successfully
- `400`: Bad request (invalid input)
- `404`: Resource not found
- `500`: Server error

## Examples

### Creating a User and Adding a Medical Report

```bash
# 1. Create a new user
curl -X POST https://your-domain.com/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Smith","age":42,"bloodGrp":"A+","sex":"Female","address":"789 Pine St, Anytown, USA"}'

# Save the returned user ID

# 2. Create a medical report for the user
curl -X POST https://your-domain.com/api/medical \
  -H "Content-Type: application/json" \
  -d '{"userId":"returned-user-id","diagnosis":"Hypertension","treatment":"Prescribed medication and lifestyle changes","notes":"Monthly blood pressure monitoring recommended"}'
```

### Requesting Medicine and Assigning a Seller

```bash
# 1. Create a medicine request
curl -X POST https://your-domain.com/api/medicine-req \
  -H "Content-Type: application/json" \
  -d '{"userId":"user123","medicineName":"Lisinopril","quantity":30,"urgency":"High"}'

# Save the returned request ID

# 2. Assign a seller to fulfill the request
curl -X PATCH https://your-domain.com/api/medicine-req/returned-request-id/assign \
  -H "Content-Type: application/json" \
  -d '{"sellerId":"seller123"}'
```
