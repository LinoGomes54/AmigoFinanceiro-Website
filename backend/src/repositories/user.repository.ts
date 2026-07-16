import { randomUUID } from 'node:crypto';
import type { CreateUserInput, User } from '../types/user.js';

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(input: CreateUserInput): Promise<User>;
}

/** Normaliza o email para que a busca e a checagem de duplicado não dependam de caixa. */
function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/**
 * Implementação em memória. Os dados vivem enquanto o processo vive — reiniciar o
 * servidor apaga todos os usuários. Trocar por um banco significa criar outra
 * implementação de UserRepository e substituir a instância exportada abaixo; nem os
 * services nem as rotas mudam.
 */
export class InMemoryUserRepository implements UserRepository {
  private readonly usersById = new Map<string, User>();
  private readonly idsByEmail = new Map<string, string>();

  async findById(id: string): Promise<User | null> {
    return this.usersById.get(id) ?? null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const id = this.idsByEmail.get(normalizeEmail(email));
    if (!id) return null;
    return this.usersById.get(id) ?? null;
  }

  async create(input: CreateUserInput): Promise<User> {
    const email = normalizeEmail(input.email);
    const user: User = {
      id: randomUUID(),
      nome: input.nome.trim(),
      email,
      senhaHash: input.senhaHash,
      plano: 'premium',
      criadoEm: new Date(),
    };

    this.usersById.set(user.id, user);
    this.idsByEmail.set(email, user.id);

    return user;
  }
}

export const userRepository: UserRepository = new InMemoryUserRepository();
