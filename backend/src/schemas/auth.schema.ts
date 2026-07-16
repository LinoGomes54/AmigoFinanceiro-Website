import { z } from 'zod';

export const registerSchema = z.object({
  nome: z
    .string({ required_error: 'Informe seu nome.' })
    .trim()
    .min(2, 'Informe seu nome completo.')
    .max(120, 'Nome muito longo.'),
  email: z
    .string({ required_error: 'Informe seu email.' })
    .trim()
    .email('Email inválido.')
    .max(254, 'Email muito longo.'),
  senha: z
    .string({ required_error: 'Informe uma senha.' })
    .min(8, 'A senha precisa de ao menos 8 caracteres.')
    .max(128, 'Senha muito longa.'),
});

export const loginSchema = z.object({
  email: z.string({ required_error: 'Informe seu email.' }).trim().email('Email inválido.'),
  senha: z.string({ required_error: 'Informe sua senha.' }).min(1, 'Informe sua senha.'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
