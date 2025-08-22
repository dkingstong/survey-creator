# Waterlily Backend API

A Node.js backend API built with Express, TypeScript, and PostgreSQL.

## Features

- ⚡ **Express.js** - Fast, unopinionated web framework
- 🔷 **TypeScript** - Type-safe development
- 🐘 **PostgreSQL** - Robust relational database
- 🔄 **TypeORM** - Object-Relational Mapping
- 🔐 **JWT Authentication** - Secure token-based auth
- 🛡️ **Security** - Helmet, CORS, rate limiting
- ✅ **Validation** - Request validation with express-validator
- 🔄 **Auto-reload** - Development with tsx watch
- 🐳 **Docker Ready** - Containerized deployment

## Quick Start

### Prerequisites

- Node.js 18+
- Docker and Docker Compose
- npm or yarn

### 1. Start Database

```bash
# Start PostgreSQL and pgAdmin
docker-compose up -d postgres pgadmin
```

### 2. Install Dependencies

```bash
cd Backend
npm install
```

### 3. Environment Setup

```bash
# Copy environment example
cp env.example .env

# Edit .env with your configuration
```

### 4. Start Development Server

```bash
npm run dev
```

The server will start on `http://localhost:3001`

## API Endpoints

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Users (Protected Routes)

#### Get All Users
```http
GET /api/users
Authorization: Bearer <token>
```

#### Get User by ID
```http
GET /api/users/:id
Authorization: Bearer <token>
```

#### Update User
```http
PUT /api/users/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Updated",
  "email": "john.updated@example.com"
}
```

#### Delete User
```http
DELETE /api/users/:id
Authorization: Bearer <token>
```

### Health Check

```http
GET /health
```

## Database Schema

### User Entity
```typescript
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date;
}
```

## Environment Variables

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=waterlily_db
DB_USER=postgres
DB_PASSWORD=password

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=24h

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## Available Scripts

- `npm run dev` - Start development server with auto-reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run type-check` - Check TypeScript types

## Docker

### Development
```bash
# Build and run backend in development mode
docker build --target development -t waterlily-backend-dev .
docker run -p 3001:3001 --env-file .env waterlily-backend-dev
```

### Production
```bash
# Build and run backend in production mode
docker build --target production -t waterlily-backend .
docker run -p 3001:3001 --env-file .env waterlily-backend
```

## Database Management

### pgAdmin Access
- URL: http://localhost:5050
- Email: admin@waterlily.com
- Password: admin123

### Direct Database Access
```bash
# Connect to PostgreSQL container
docker exec -it waterlily_postgres psql -U postgres -d waterlily_db
```

## Project Structure

```
Backend/
├── src/
│   ├── config/
│   │   └── database.ts      # TypeORM configuration
│   ├── entities/
│   │   └── User.ts          # User entity
│   ├── repositories/
│   │   └── UserRepository.ts # User repository
│   ├── middleware/
│   │   ├── auth.ts          # JWT authentication
│   │   ├── errorHandler.ts  # Error handling
│   │   └── notFound.ts      # 404 handler
│   ├── routes/
│   │   ├── auth.ts          # Authentication routes
│   │   └── users.ts         # User management routes
│   └── index.ts             # Main server file
├── init.sql                 # Additional database setup
├── Dockerfile               # Docker configuration
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript configuration
└── README.md                # This file
```

## Security Features

- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - Prevent abuse
- **JWT** - Secure authentication
- **Password Hashing** - bcrypt encryption
- **Input Validation** - Request sanitization

## Error Handling

The API uses a centralized error handling system that:
- Logs errors for debugging
- Returns appropriate HTTP status codes
- Provides meaningful error messages
- Includes stack traces in development

## Testing the API

### Using curl

```bash
# Register a user
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get users (with token)
curl -X GET http://localhost:3001/api/users \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT
