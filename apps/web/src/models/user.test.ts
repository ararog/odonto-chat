import { it, expect } from 'vitest';
import { User, LoginResponse } from './user';

it('should create a valid user object', () => {
  const user: User = {
    id: '123',
    username: 'testuser',
    email: 'test@example.com',
    emailVerified: true
  };

  expect(user.id).toBe('123');
  expect(user.username).toBe('testuser');
  expect(user.email).toBe('test@example.com');
  expect(user.emailVerified).toBe(true);
});

it('should allow emailVerified to be optional', () => {
  const user: User = {
    id: '123',
    username: 'testuser',
    email: 'test@example.com'
  };

  expect(user.emailVerified).toBeUndefined();
});

it('should enforce required properties', () => {
  // @ts-expect-error - Testing missing required properties
  const invalidUser: User = {
    username: 'testuser',
    email: 'test@example.com'
  };

  // This is just to avoid unused variable warnings
  expect(invalidUser).toBeDefined();
});

it('should create a valid login response object', () => {
  const loginResponse: LoginResponse = {
    user: {
      id: '123',
      username: 'testuser',
      email: 'test@example.com'
    },
    token: 'jwt-token-123'
  };

  expect(loginResponse.user).toBeDefined();
  expect(loginResponse.user.id).toBe('123');
  expect(loginResponse.token).toBe('jwt-token-123');
});
