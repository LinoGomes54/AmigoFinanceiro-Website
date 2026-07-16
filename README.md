# Amigo Financeiro — Website

Site institucional e área de conta do Amigo Financeiro: landing page, download do app
desktop e cadastro/login da conta Premium.

## Estrutura

```
backend/    API REST em Node + Express + TypeScript
frontend/   SPA em Vite + React + TypeScript
```

## Requisitos

- Node.js 20 ou superior
- npm 10 ou superior

## Rodando o projeto

O backend e o frontend rodam em processos separados. Abra dois terminais.

**Backend** (porta 3333):

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

**Frontend** (porta 5173):

```bash
cd frontend
npm install
npm run dev
```

O Vite faz proxy de `/api` para o backend em desenvolvimento, então não é preciso
configurar CORS nem URL absoluta no cliente.

## Estado atual

A base ainda não tem banco de dados nem integrações externas. Os usuários ficam em um
repositório em memória (`backend/src/repositories/user.repository.ts`) e **são perdidos
ao reiniciar o servidor**. A troca por um banco real acontece só nesse arquivo, sem
tocar em rotas nem services.
