import * as crypto from 'crypto';

const tokens: { [key: string]: string } = {};

export function generateToken(userId: string): string {
  const token = crypto.randomBytes(32).toString('hex');
  tokens[token] = userId;
  return token;
}

export function verifyToken(token: string): string | null {
  return tokens[token] || null;
}
