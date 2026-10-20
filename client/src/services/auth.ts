export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export class AuthApiError extends Error {
  field?: string;
  errors?: string[];
  statusCode?: number;

  constructor(message: string, field?: string, errors?: string[], statusCode?: number) {
    super(message);
    this.name = 'AuthApiError';
    this.field = field;
    this.errors = errors;
    this.statusCode = statusCode;
  }
}

export interface UserProfile {
  id: string;
  email: string;
  code: string;
  name: string;
  role: string;
  avatar?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  statusCode: number;
  message: string;
  field?: string;
  errors?: string[];
  data: {
    user: UserProfile;
    accessToken: string;
  };
}

export interface RegisterPayload {
  name: string;
  code: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  identifier: string;
  password: string;
}

export async function registerApi(payload: RegisterPayload): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new AuthApiError(data.message || 'Đăng ký không thành công', data.field, data.errors, res.status);
  }

  return data;
}

export async function loginApi(payload: LoginPayload): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new AuthApiError(data.message || 'Đăng nhập không thành công', data.field, data.errors, res.status);
  }

  return data;
}

export async function getMeApi(token: string): Promise<{ statusCode: number; data: UserProfile }> {
  const res = await fetch(`${API_BASE_URL}/auth/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new AuthApiError(data.message || 'Phiên đăng nhập hết hạn', data.field, data.errors, res.status);
  }

  return data;
}
