/** Erro vindo da API, já com a mensagem pronta para exibir ao usuário. */
export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  /** Erros por campo, quando a API devolve 422. Ex: { email: 'Email inválido.' } */
  readonly fieldErrors: Record<string, string>;

  constructor(message: string, status: number, code: string, fieldErrors: Record<string, string> = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.fieldErrors = fieldErrors;
  }
}

interface ApiErrorBody {
  error?: {
    code?: string;
    message?: string;
    details?: Array<{ field?: string; message?: string }>;
  };
}

const BASE_URL = '/api';

const TOKEN_KEY = 'af-token';

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  auth?: boolean;
}

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, auth = false } = options;

  const headers: Record<string, string> = {};
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let response: Response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    });
  } catch {
    throw new ApiError('Não foi possível conectar ao servidor. Tente novamente.', 0, 'NETWORK_ERROR');
  }

  if (response.status === 204) return undefined as T;

  let data: unknown;
  try {
    data = await response.json();
  } catch {
    if (response.ok) return undefined as T;
    throw new ApiError('Resposta inválida do servidor.', response.status, 'INVALID_RESPONSE');
  }

  if (!response.ok) {
    const { error } = (data ?? {}) as ApiErrorBody;
    const fieldErrors: Record<string, string> = {};
    for (const detail of error?.details ?? []) {
      if (detail.field && detail.message) fieldErrors[detail.field] = detail.message;
    }
    throw new ApiError(
      error?.message ?? 'Erro inesperado. Tente novamente.',
      response.status,
      error?.code ?? 'UNKNOWN',
      fieldErrors,
    );
  }

  return data as T;
}
