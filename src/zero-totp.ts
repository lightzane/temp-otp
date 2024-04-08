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
    // Calculate the counter based on the current time
    // Calculates how many 30-second intervals have passed since the Unix epoch began.
    const counter = Math.floor(Date.now() / (timeStep * 1000));

    // Convert the counter to a buffer
    const counterBuffer = Buffer.alloc(8);
    counterBuffer.writeBigInt64BE(BigInt(counter), 0);

    // Decode the secret from Base32
    const secretBuffer = Base32.decode(secret);

    // Create an HMAC-SHA1 hash object with the secret
    const hmac = crypto.createHmac('sha1', secretBuffer);

    // Update the HMAC object with the counter
    hmac.update(counterBuffer);

    // Calculate the HMAC digest
    const hmacResult = hmac.digest();

    // Extract the 31-bit dynamic binary code from the HMAC result
    const offset = hmacResult[hmacResult.length - 1] & 0x0f;
    const code =
      ((hmacResult[offset] & 0x7f) << 24) |
      ((hmacResult[offset + 1] & 0xff) << 16) |
      ((hmacResult[offset + 2] & 0xff) << 8) |
      (hmacResult[offset + 3] & 0xff);

    // Calculate the token by taking modulo
    const token = code % Math.pow(10, digits);

    // Pad the token to the specified number of digits
    return token.toString().padStart(digits, '0');
  }
}
