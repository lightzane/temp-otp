import crypto from 'crypto';
import { Base32 } from './zero-base32';

// Define a class to handle TOTP generation
export class TOTP {
  // Define a static method to generate TOTP
  public static generate(
    secret: string,
    timeStep: number = 30,
    digits: number = 6,
  ): string {
    const counter = Math.floor(Date.now() / (timeStep * 1000));
    const counterBuffer = Buffer.alloc(8);
    counterBuffer.writeBigInt64BE(BigInt(counter), 0);

    const secretBuffer = Base32.decode(secret);
    const hmac = crypto.createHmac('sha1', secretBuffer);
    hmac.update(counterBuffer);
    const hmacResult = hmac.digest();

    const offset = hmacResult[hmacResult.length - 1] & 0x0f;
    const code =
      ((hmacResult[offset] & 0x7f) << 24) |
      ((hmacResult[offset + 1] & 0xff) << 16) |
      ((hmacResult[offset + 2] & 0xff) << 8) |
      (hmacResult[offset + 3] & 0xff);

    const token = code % Math.pow(10, digits);
    return token.toString().padStart(digits, '0');
  }
}
