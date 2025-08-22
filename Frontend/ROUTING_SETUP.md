# React Router Setup

This document describes the routing structure implemented in the survey application.

## Routes

### Public Routes
- `/login` - Login page for existing users
- `/signup` - Registration page for new users

### Protected Routes
- `/` - Home page with survey functionality (requires authentication)

## Components

### Authentication Components
- `Login.tsx` - Login form with email and password
- `Signup.tsx` - Registration form with first name, last name, email, and password
- `ProtectedRoute.tsx` - Wrapper component that checks authentication and redirects to login if not authenticated

### Main Components
- `Home.tsx` - Main application page with header and survey container
- `SurveyContainer.tsx` - Survey functionality (existing component)

## Features

### Authentication Flow
1. Users must register or login to access the application
2. Authentication state is managed using localStorage
3. Protected routes automatically redirect to login if user is not authenticated
4. Logout functionality clears authentication data and redirects to login

### Navigation
- React Router handles client-side navigation
- Automatic redirects for unauthenticated users
- Clean URL structure

## Usage

1. Start the development server: `npm run dev`
2. Navigate to `http://localhost:5173`
3. You will be redirected to `/login` if not authenticated
4. Register a new account or login with existing credentials
5. After successful authentication, you'll be redirected to the home page

## File Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── index.ts
│   ├── Home.tsx
│   └── surveyContainer.tsx
├── App.tsx (updated with routing)
└── vite-env.d.ts (added for TypeScript support)
```
