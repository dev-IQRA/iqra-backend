# Anggota
- Aldi Pramudya - G6401231003 - Backend
- Muhammad Fauzan Akbar - G6401231045 - Backend
- Cokorda Gd. Satria Widnyana Putra - G6401231064 - Frontend
- Johanna Davina Habeahan - G6401231087 - UX/UI
- Ghanianda Wafiqarifah -  G6401231126 - Frontend
# IQRA

A Node.js-based application for managing students authentication, registration, and role-based access control using Express, Prisma, and JWT.

## Features

- **Authentication**: Secure login with JWT-based authentication.
- **Role-Based Access Control**: Admin, teacher (`guru`), and student (`siswa`) roles.
- **Validation**: Input validation using Joi.
- **Rate Limiting**: Protects against abuse with request rate limiting.
- **Security**: Implements security best practices with Helmet and CORS.
- **Database**: PostgreSQL integration with Prisma ORM.

## Prerequisites

- Node.js (v16+)
- PostgreSQL
- npm (v7+)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and configure the following:
   ```env
   DATABASE_URL=your_database_url
   JWT_TOKEN_SECRET=your_jwt_secret
   SECRET_KEY_SESSION=your_cookie_secret
   CORS_ORIGIN=http://localhost:3000
   ```

4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

## Usage

### Development
Start the development server:
```bash
npm run dev
```

### Production
Build and start the application:
```bash
npm run build
npm start
```

## API Endpoints

### Authentication
- **POST** `/api/auth/login`: User login.
- **POST** `/api/admin/register`: Admin registration (requires admin privileges).

### Protected Routes
- Use the `Authorization: Bearer <token>` header for accessing protected routes.

## Project Structure

```
src/
├── app.js                 # Main application file
├── routes/                # API route definitions
├── controllers/           # Route handlers
├── middleware/            # Custom middleware (e.g., auth, rate limiter)
├── validators/            # Input validation schemas
├── strategies/            # Passport strategies
├── utils/                 # Utility functions
└── prisma/                # Prisma schema and migrations
```

## Technologies

- **Backend**: Node.js, Express
- **Database**: PostgreSQL, Prisma
- **Authentication**: JWT, Passport.js
- **Validation**: Joi
- **Security**: Helmet, CORS
- **Rate Limiting**: `express-rate-limit`

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
