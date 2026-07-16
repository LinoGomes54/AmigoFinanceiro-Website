import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const scrypt = promisify(scryptCallback) as (
  password: string,
  salt: Buffer,
  keylen: number,
) => Promise<Buffer>;

const SALT_BYTES = 16;
const KEY_BYTES = 64;

/** Formato do hash armazenado: scrypt$<salt-hex>$<hash-hex> */
export async function hashPassword(senha: string): Promise<string> {
  const salt = randomBytes(SALT_BYTES);
  const derived = await scrypt(senha, salt, KEY_BYTES);
  return `scrypt$${salt.toString('hex')}$${derived.toString('hex')}`;
}

export async function verifyPassword(senha: string, stored: string): Promise<boolean> {
  const [algo, saltHex, hashHex] = stored.split('$');
  if (algo !== 'scrypt' || !saltHex || !hashHex) return false;

  const expected = Buffer.from(hashHex, 'hex');
  const derived = await scrypt(senha, Buffer.from(saltHex, 'hex'), expected.length);

  // timingSafeEqual exige buffers do mesmo tamanho.
  if (derived.length !== expected.length) return false;
  return timingSafeEqual(derived, expected);
}
