import { Base32 } from './zero-base32';

/** Generate secret that can be passed directly as Base 32 encoded */
export function generateSecret(length: number = 16): string {
  const characters = Base32.BASE32_ALPHABET;
  let secret = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    secret += characters[randomIndex];
  }
  return secret;
}
