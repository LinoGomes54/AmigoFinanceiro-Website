import { request } from './api.ts';

export interface User {
  id: string;
  nome: string;
  email: string;
  plano: 'premium';
  criadoEm: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export function register(input: { nome: string; email: string; senha: string }): Promise<AuthResponse> {
  return request<AuthResponse>('/auth/register', { method: 'POST', body: input });
}

export function login(input: { email: string; senha: string }): Promise<AuthResponse> {
  return request<AuthResponse>('/auth/login', { method: 'POST', body: input });
}

export function me(): Promise<{ user: User }> {
  return request<{ user: User }>('/auth/me', { auth: true });
}
