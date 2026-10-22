# Healthcare Backend API

A RESTful healthcare backend API built using **Node.js, Express.js, PostgreSQL, and Sequelize**. The application provides secure JWT-based authentication along with patient management, doctor management, and patient-doctor mapping APIs.

## Features

- User registration and login
- Password hashing using bcrypt
- JWT-based authentication
- Protected API routes
- Patient CRUD operations
- Doctor CRUD operations
- Assign doctors to patients
- View doctors assigned to a patient
- Remove doctors from patients
- Request validation using Express Validator
- Centralized validation error handling
- PostgreSQL database integration using Sequelize
- Environment variable configuration

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **ORM:** Sequelize
- **Authentication:** JWT
- **Password Security:** bcrypt
- **Validation:** express-validator
- **Testing:** Postman
- **Database Hosting:** Neon PostgreSQL

## Project Structure

```text
backend/
├── config/
│   └── database.js
├── controllers/
│   ├── authController.js
│   ├── patientController.js
│   ├── doctorController.js
│   └── patientDoctorController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── User.js
│   ├── Patient.js
│   ├── Doctor.js
│   └── PatientDoctor.js
├── routes/
│   ├── authRoutes.js
│   ├── patientRoutes.js
│   ├── doctorRoutes.js
│   └── patientDoctorRoutes.js
├── validators/
│   ├── patientValidator.js
│   ├── doctorValidator.js
│   └── validationMiddleware.js
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/rathoresuhani/WhatBytes_assignment
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=5000
DATABASE_URL=******
JWT_SECRET=healthcare_super_secret_key
```

Do not commit the `.env` file to GitHub.

### 4. Start the server

For development:

```bash
npm run dev
```

For production:

```bash
npm start
```

The server runs at:

```text
http://localhost:5000
```

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a user |
| POST | `/api/auth/login` | Login and receive JWT |

### Patients

All patient endpoints require a valid JWT token.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/patients` | Create a patient |
| GET | `/api/patients` | Get all patients |
| GET | `/api/patients/:id` | Get patient by ID |
| PUT | `/api/patients/:id` | Update patient |
| DELETE | `/api/patients/:id` | Delete patient |

### Doctors

All doctor endpoints require a valid JWT token.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/doctors` | Create a doctor |
| GET | `/api/doctors` | Get all doctors |
| GET | `/api/doctors/:id` | Get doctor by ID |
| PUT | `/api/doctors/:id` | Update doctor |
| DELETE | `/api/doctors/:id` | Delete doctor |

### Patient-Doctor Mapping

All mapping endpoints require a valid JWT token.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/mappings` | Assign a doctor to a patient |
| GET | `/api/mappings/patient/:patientId` | Get doctors assigned to a patient |
| DELETE | `/api/mappings/patient/:patientId/doctor/:doctorId` | Remove a doctor from a patient |

## Authentication

After successful login, the API returns a JWT token.

For protected endpoints, add the token in the request Authorization header:

```text
Authorization: Bearer <JWT_TOKEN>
```

In Postman, use:

```text
Authorization → Bearer Token
```

and paste the JWT token.

## Example Requests

### Register

```http
POST /api/auth/register
```

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login

```http
POST /api/auth/login
```

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Patient

```http
POST /api/patients
```

```json
{
  "name": "Rahul Sharma",
  "age": 25,
  "gender": "Male",
  "phone": "9876543210",
  "address": "Delhi"
}
```

### Create Doctor

```http
POST /api/doctors
```

```json
{
  "name": "Dr. Priya Sharma",
  "specialization": "Cardiologist",
  "phone": "9876543210",
  "email": "priya@example.com"
}
```

### Assign Doctor to Patient

```http
POST /api/mappings
```

```json
{
  "patientId": 1,
  "doctorId": 1
}
```

## Validation

The API validates incoming patient and doctor data.

Examples of validation rules include:

- Patient name is required
- Patient age must be between 1 and 120
- Phone number must contain 10 digits
- Doctor name is required
- Doctor specialization is required
- Doctor email must be valid

Invalid requests return a `400 Bad Request` response with validation errors.

## Error Handling

The API handles common errors such as:

- Missing required fields
- Invalid or expired JWT
- Invalid patient/doctor IDs
- Duplicate doctor email
- Duplicate patient-doctor mapping
- Resource not found
- Invalid request data
- Internal server errors

## Security

- Passwords are stored using bcrypt hashing.
- JWT is used to protect authenticated endpoints.
- Sensitive environment variables are stored in `.env`.
- `.env` is excluded from Git using `.gitignore`.

## Database

The project uses **PostgreSQL** with **Sequelize ORM**.

Database tables include:

- `users`
- `patients`
- `doctors`
- `patient_doctors`

Sequelize automatically synchronizes the defined models with the database when the application starts.

## Testing

The APIs were tested using **Postman**.

The testing flow includes:

1. Register a user
2. Login and obtain JWT
3. Use JWT for protected endpoints
4. Test Patient CRUD
5. Test Doctor CRUD
6. Test Patient-Doctor mapping
7. Test validation and error responses

## Environment Variables

Create a `.env` file using the following variables:

```env
PORT=5000
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret
```

Never commit your actual `.env` file or database credentials to GitHub.

## Author

**Suhani Rathore**

B.Tech Information Technology  
KIET Group of Institutions
