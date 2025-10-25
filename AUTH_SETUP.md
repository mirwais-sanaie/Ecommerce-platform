# Authentication Setup Guide

## Overview

This e-commerce platform now has a complete authentication and authorization system implemented.

## Features Implemented

### 1. Authentication APIs

- **POST /api/auth/login** - User login with email/password
- **POST /api/auth/signup** - User registration
- **POST /api/auth/logout** - User logout
- **GET /api/auth/me** - Get current user info

### 2. Authentication Store (Zustand)

- Global authentication state management
- Persistent login state
- Automatic token validation
- Login/logout functionality

### 3. Route Protection

- **Middleware**: Server-side route protection for `/dashboard`, `/cart`
- **ProtectedRoute Component**: Client-side protection
- **Automatic redirects**: Unauthenticated users → login, authenticated users → dashboard

### 4. User Interface

- **Login Page**: Email/password authentication
- **Signup Page**: User registration with validation
- **Dashboard**: Protected user area
- **Navbar**: Dynamic navigation based on auth state
- **Logout functionality**: Clear session and redirect

## Security Features

### 1. Password Security

- Bcrypt hashing with salt rounds (12)
- Password strength validation (minimum 6 characters)
- Secure password comparison

### 2. JWT Tokens

- Secure token generation with expiration (1 day)
- HttpOnly cookies for token storage
- Token validation on protected routes
- Automatic token cleanup on logout

### 3. Route Protection

- Server-side middleware protection
- Client-side route guards
- Automatic redirects for unauthorized access
- Token expiration handling

## Environment Setup

Create a `.env.local` file in your project root:

```env
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=development
```

**Important**: Use a strong, unique JWT secret in production!

## Data Storage

User data is stored in `data/users.json` with the following structure:

```json
{
  "users": [
    {
      "id": "timestamp",
      "email": "user@example.com",
      "password": "hashed_password",
      "role": "user",
      "createdAt": "ISO_date_string"
    }
  ]
}
```

## Usage Examples

### Login

```typescript
const { login } = useAuthStore();
const result = await login(email, password);
if (result.success) {
  // User logged in successfully
}
```

### Check Authentication

```typescript
const { isAuthenticated, user } = useAuthStore();
if (isAuthenticated) {
  console.log(`Welcome, ${user?.email}`);
}
```

### Logout

```typescript
const { logout } = useAuthStore();
await logout();
```

## Protected Routes

Routes that require authentication:

- `/dashboard` - User dashboard
- `/cart` - Shopping cart

Routes that redirect if authenticated:

- `/login` - Login page
- `/signup` - Registration page

## Error Handling

The system includes comprehensive error handling for:

- Invalid credentials
- Network errors
- Token expiration
- Unauthorized access
- Server errors

## Next Steps

1. Set up your JWT secret in `.env.local`
2. Test the authentication flow
3. Customize the UI as needed
4. Add additional user fields if required
5. Implement role-based access control if needed

## Security Considerations

- Always use HTTPS in production
- Implement rate limiting for auth endpoints
- Consider adding email verification
- Add password reset functionality
- Implement session management
- Add audit logging for security events

