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

async function safeFetchJson<T>(url: string, options: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(url, options);
  } catch (err: any) {
    throw new AuthApiError(
      'Không thể kết nối tới máy chủ xác thực. Vui lòng kiểm tra mạng hoặc thử lại sau.',
      undefined,
      undefined,
      0
    );
  }

  let data: any;
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    try {
      data = await res.json();
    } catch {
      data = null;
    }
  } else {
    try {
      const text = await res.text();
      data = { message: text };
    } catch {
      data = null;
    }
  }

  if (!res.ok) {
    const defaultMsg =
      res.status === 401
        ? 'Email / Mã độc giả hoặc mật khẩu không chính xác'
        : res.status === 409
        ? 'Dữ liệu đã tồn tại trong hệ thống'
        : res.status >= 500
        ? 'Lỗi hệ thống máy chủ, vui lòng thử lại sau'
        : 'Yêu cầu xác thực không thành công';

    throw new AuthApiError(
      data?.message || defaultMsg,
      data?.field,
      data?.errors,
      res.status
    );
  }

  return data as T;
}

export async function registerApi(payload: RegisterPayload): Promise<AuthResponse> {
  return safeFetchJson<AuthResponse>(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}

export async function loginApi(payload: LoginPayload): Promise<AuthResponse> {
  return safeFetchJson<AuthResponse>(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}

export async function getMeApi(token: string): Promise<{ statusCode: number; data: UserProfile }> {
  return safeFetchJson<{ statusCode: number; data: UserProfile }>(`${API_BASE_URL}/auth/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
}
