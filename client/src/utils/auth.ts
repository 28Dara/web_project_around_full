import type { AuthFormData, AuthUser } from '../interfaces/AuthData';

const authBaseUrl = 'https://se-register-api.en.tripleten-services.com/v1';

type UserResponse = {
  data: AuthUser;
};

type TokenResponse = {
  token: string;
};

async function handleResponse<T>(res: Response): Promise<T> {
  if (res.ok) {
    return res.json();
  }
  throw new Error(`Error: ${res.status}`);
}

export async function registerUser(data: AuthFormData): Promise<AuthUser> {
  const res = await fetch(`${authBaseUrl}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const body = await handleResponse<UserResponse>(res);
  return body.data;
}

export async function loginUser(data: AuthFormData): Promise<string> {
  const res = await fetch(`${authBaseUrl}/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const body = await handleResponse<TokenResponse>(res);
  return body.token;
}

export async function checkToken(token: string): Promise<AuthUser> {
  const res = await fetch(`${authBaseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const body = await handleResponse<UserResponse>(res);
  return body.data;
}
