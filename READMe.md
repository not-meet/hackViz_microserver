# MedConnect Database Architecture

This document outlines the database architecture for the MedConnect application, including tables, relationships, and field details.

## Database Overview

The MedConnect application uses PostgreSQL as the database, managed through Prisma ORM. The database consists of four main tables:

1. Users (Patients)
2. Medical Cases (Lab Reports & Medical Issues)
3. Medicine Requests
4. Sellers (Pharmacies, Blood Banks)

## Database Schema Diagram

```
┌─────────────────────┐      ┌─────────────────────┐
│       users         │      │   medical_cases     │
├─────────────────────┤      ├─────────────────────┤
│ id (PK)             │      │ id (PK)             │
│ name                │      │ userId (FK)         │
│ age                 │      │ problemDesc         │
│ bloodGroup          │      │ problemDate         │
│ sex                 │      │ labReportName       │
│ address             │      └─────────────────────┘
│ metadata            │              ▲
│ createdAt           │              │
└─────────────────────┘              │
         ▲                           │
         │                           │
         │         ┌─────────────────│
         │         │                 │
         │         │                 │
┌────────┴──────────┐      ┌─────────┴─────────┐
│ medicine_requests │      │     sellers       │
├───────────────────┤      ├───────────────────┤
│ id (PK)           │      │ id (PK)           │
│ userId (FK)       │      │ name              │
│ requestedMedicine │      │ location          │
│ requestTime       │      │ shopAddress       │
│ isPickedUp        │      │ createdAt         │
│ sellerId (FK)     │──────│                   │
└───────────────────┘      └───────────────────┘
```

## Table Structures

### 1. Users Table

Stores information about patients in the system.

| Column     | Type      | Description                          | Constraints       |
|------------|-----------|--------------------------------------|-------------------|
| id         | UUID      | Unique identifier for the user       | Primary Key       |
| name       | String    | Full name of the user                | Required          |
| age        | Integer   | Age of the user                      | Required          |
| bloodGroup | Enum      | Blood group (O+, O-, etc.)           | Required          |
| sex        | Enum      | Gender (Male, Female, Other)         | Required          |
| address    | String    | Physical address                     | Required          |
| metadata   | JSON      | Additional flexible data             | Optional          |
| createdAt  | DateTime  | When the record was created          | Default: now()    |

**Enum Values:**
- Blood Group: O_POS (O+), O_NEG (O-), A_POS (A+), A_NEG (A-), B_POS (B+), B_NEG (B-), AB_POS (AB+), AB_NEG (AB-)
- Gender: Male, Female, Other

### 2. Medical Cases Table

Stores medical cases, lab reports, and health issues.

| Column        | Type      | Description                          | Constraints                    |
|---------------|-----------|--------------------------------------|--------------------------------|
| id            | UUID      | Unique identifier for the case       | Primary Key                    |
| userId        | UUID      | Reference to the patient             | Foreign Key, Required          |
| problemDesc   | String    | Description of the medical problem   | Required                       |
| problemDate   | DateTime  | When the problem was reported        | Default: now()                 |
| labReportName | String    | Name of the lab report, if any       | Optional                       |

**Relationships:**
- Many-to-one with Users (A user can have many medical cases)

### 3. Medicine Requests Table

Tracks medicine requests from patients, which can be fulfilled by sellers.

| Column            | Type      | Description                          | Constraints                    |
|-------------------|-----------|--------------------------------------|--------------------------------|
| id                | UUID      | Unique identifier for the request    | Primary Key                    |
| userId            | UUID      | Reference to the requesting patient  | Foreign Key, Required          |
| requestedMedicine | String    | Name of the requested medicine       | Required                       |
| requestTime       | DateTime  | When the request was made            | Default: now()                 |
| isPickedUp        | Boolean   | Whether the request has been fulfilled| Default: false                |
| sellerId          | UUID      | Reference to the fulfilling seller   | Foreign Key, Optional          |

**Relationships:**
- Many-to-one with Users (A user can have many medicine requests)
- Many-to-one with Sellers (A seller can fulfill many medicine requests)

### 4. Sellers Table

Stores information about medicine sellers, pharmacies, or blood banks.

| Column      | Type      | Description                          | Constraints            |
|-------------|-----------|--------------------------------------|-----------------------|
| id          | UUID      | Unique identifier for the seller     | Primary Key            |
| name        | String    | Name of the pharmacy or seller       | Required               |
| location    | String    | Geographic location                  | Required               |
| shopAddress | String    | Physical address of the shop         | Required               |
| createdAt   | DateTime  | When the record was created          | Default: now()         |

**Relationships:**
- One-to-many with Medicine Requests (A seller can have many medicine requests)

## Key Database Features

1. **UUID Primary Keys**: All tables use UUID for primary keys, providing better security and distribution.

2. **Referential Integrity**: Foreign key constraints ensure data consistency:
   - When a user is deleted, all related medical cases and medicine requests are automatically deleted (Cascade).
   - When a seller is deleted, the sellerId in medicine requests becomes null.

3. **Enums**: The schema uses enumerated types for blood groups and gender to ensure data consistency.

4. **Timestamps**: Creation timestamps are automatically recorded for tracking purposes.

5. **Flexible Metadata**: The users table includes a JSON field for storing additional flexible data without schema changes.

## Database Connection

The database connection is configured using environment variables:
- `DATABASE_URL`: Connection string for Prisma to connect to the PostgreSQL database
- `DIRECT_URL`: Direct connection string for use with serverless environments

## Prisma Setup

The application uses Prisma ORM with the PostgreSQL provider:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```
