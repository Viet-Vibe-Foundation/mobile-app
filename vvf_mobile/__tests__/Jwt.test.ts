import {verifyToken} from '../src/utils/jwtUtil';
test('JwtExpiredTest - should return true for expired token', () => {
  const expiredToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiY203dmN3NjdsMDAwMHYxM3drcjBwZDh6bSIsIm5hbWUiOiJUcnVuZyBMdW9uZyIsImVtYWlsIjoidHJ1bmcyMDAxc2dwQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsInBob25lIjoiMDkwODM2NTI0NyIsImFkZHJlc3MiOiJGNGMgVHLGsOG7nW5nIFPGoW4gcGjGsOG7nW5nIDE1IHF14bqtbiAxMCIsImVtYWlsVmVyaWZpZWQiOiIyMDI1LTAzLTA1VDAzOjI3OjA4LjYyMloifSwiaWF0IjoxNzQxNzk1NzgzLCJleHAiOjE3NDE4ODIxODN9.UqmqRyW2aM9_NVZZh4IqT1kC5KICF59RIydPsJyi498'; // Mock expired token
  expect(verifyToken(expiredToken)).toBe(true);
});

test('JwtExpiredTest - should return false for valid token', () => {
  const validToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiY203dmN3NjdsMDAwMHYxM3drcjBwZDh6bSIsIm5hbWUiOiJUcnVuZyBMdW9uZyIsImVtYWlsIjoidHJ1bmcyMDAxc2dwQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsInBob25lIjoiMDkwODM2NTI0NyIsImFkZHJlc3MiOiJGNGMgVHLGsOG7nW5nIFPGoW4gcGjGsOG7nW5nIDE1IHF14bqtbiAxMCIsImVtYWlsVmVyaWZpZWQiOiIyMDI1LTAzLTA1VDAzOjI3OjA4LjYyMloifSwiaWF0IjoxNzQxOTEzMjIwLCJleHAiOjE3NDE5OTk2MjB9.EuJmayMTQ-7d-DH4piVitTQ8GQO8IeuySPW_9Y_CrB0'; // Mock valid token
  expect(verifyToken(validToken)).toBe(false);
});

test('JwtExpiredTest - should return false for null token', () => {
  const validToken = ''; // Mock valid token
  expect(verifyToken(validToken)).toBe(false);
});
