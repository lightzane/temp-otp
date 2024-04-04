export function generateSecret(length: number = 10): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let secret = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    secret += characters[randomIndex];
  }
  return secret;
}
