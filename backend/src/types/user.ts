/** Usuário como ele existe no repositório, com o hash da senha. Nunca sai da camada de service. */
export interface User {
  id: string;
  nome: string;
  email: string;
  senhaHash: string;
  plano: 'premium';
  criadoEm: Date;
}

/** Recorte seguro do usuário — é isto que a API devolve. */
export interface PublicUser {
  id: string;
  nome: string;
  email: string;
  plano: 'premium';
  criadoEm: string;
}

export interface CreateUserInput {
  nome: string;
  email: string;
  senhaHash: string;
}

export function toPublicUser(user: User): PublicUser {
  return {
    id: user.id,
    nome: user.nome,
    email: user.email,
    plano: user.plano,
    criadoEm: user.criadoEm.toISOString(),
  };
}
