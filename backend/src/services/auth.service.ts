import { userRepository } from '../repositories/user.repository.js';
import type { LoginInput, RegisterInput } from '../schemas/auth.schema.js';
import { toPublicUser, type PublicUser } from '../types/user.js';
import { ConflictError, UnauthorizedError } from '../utils/errors.js';
import { hashPassword, verifyPassword } from '../utils/password.js';
import { signToken } from './token.service.js';

export interface AuthResult {
  user: PublicUser;
  token: string;
}

export async function register(input: RegisterInput): Promise<AuthResult> {
  const existente = await userRepository.findByEmail(input.email);
  if (existente) {
    throw new ConflictError('Já existe uma conta com esse email.');
  }

  const senhaHash = await hashPassword(input.senha);
  const user = await userRepository.create({
    nome: input.nome,
    email: input.email,
    senhaHash,
  });

  return { user: toPublicUser(user), token: signToken({ sub: user.id, email: user.email }) };
}

export async function login(input: LoginInput): Promise<AuthResult> {
  const user = await userRepository.findByEmail(input.email);

  // Mensagem genérica nos dois casos para não revelar quais emails têm conta.
  const credenciaisInvalidas = new UnauthorizedError('Email ou senha incorretos.');
  if (!user) throw credenciaisInvalidas;

  const senhaConfere = await verifyPassword(input.senha, user.senhaHash);
  if (!senhaConfere) throw credenciaisInvalidas;

  return { user: toPublicUser(user), token: signToken({ sub: user.id, email: user.email }) };
}

export async function getUserById(id: string): Promise<PublicUser> {
  const user = await userRepository.findById(id);
  if (!user) throw new UnauthorizedError('Sessão inválida. Entre novamente.');
  return toPublicUser(user);
}
