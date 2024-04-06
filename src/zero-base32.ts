/**
 * References:
 *
 *   - Introduction: https://en.wikipedia.org/wiki/Base32
 *   - Base32 Examples: https://datatracker.ietf.org/doc/html/rfc4648#section-10
 *   - Cases: https://datatracker.ietf.org/doc/html/rfc4648#section-6
 *     - Contains documentation about 8-bits, 16-bits, 24-bits that you'll later see
 *       in the TOTP class via the following code:
 *
 *     ```ts
 *     const code =
 *       ((hmacResult[offset] & 0x7f) << 24) |
 *       ((hmacResult[offset + 1] & 0xff) << 16) |
 *       ((hmacResult[offset + 2] & 0xff) << 8) |
 *       (hmacResult[offset + 3] & 0xff);
 *     ```
 *
 */
export class Base32 {
  /**
   * It uses an alphabet of A–Z, followed by 2–7.
   * The digits 0, 1 and 8 are skipped due to their similarity with the letters O, I and B
   * (thus "2" has a decimal value of 26).
   *
   * Decimal <-> Encoding
   * 0 <-> A
   * 31 <-> 7
   *
   * (pad) =
   */
  public static readonly BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

  public static encode(buffer: Buffer): string {
    let binaryString = '';
    let encodedString = '';

    // Convert the input buffer to a binary string
    for (const byte of buffer) {
      binaryString += byte.toString(2).padStart(8, '0');
    }

    // Pad the binary string to make its length a multiple of 5
    while (binaryString.length % 5 !== 0) {
      binaryString += '0';
      /*
        This padding is necessary because Base32 encoding operates on groups of 5 bits.
    
        In the RFC 4648 specification for Base32,
        the input to be encoded must be padded with zeros to a length that is a multiple of 5 if necessary.
        
        This ensures that the binary data is divided into groups of 5 bits,
        which can then be mapped to the corresponding Base32 characters.
    
        By padding the binary string to a length that is a multiple of 5,
        we ensure that we have complete groups of 5 bits to encode.
        
        This helps maintain consistency and correctness in the encoding process.
      */
    }

    // Split the binary string into groups of 5 and encode each group
    for (let i = 0; i < binaryString.length; i += 5) {
      const chunk = binaryString.substring(i, i + 5);
      encodedString += Base32.BASE32_ALPHABET[parseInt(chunk, 2)];
    }

    // Pad the encoded string with '=' characters if necessary
    while (encodedString.length % 8 !== 0) {
      encodedString += '=';
      /*
        Add padding characters ('=') to the encoded string to ensure its length is a multiple of 8.

        In Base32 encoding, the output is represented as a series of 8-bit bytes (1 byte),
        which are then encoded using the Base32 alphabet. 
        
        However, the number of characters in the encoded string may not always be a multiple of 8, 
        especially if the original binary data length is not a multiple of 5 
        (since each 5 bits of input are encoded into a single Base32 character).

        According to the RFC 4648 specification, 
        if the number of encoded characters is not a multiple of 8, 
        padding characters ('=') should be added to the end of the encoded string to make it a multiple of 8. 
        This is necessary to properly align the encoded data and indicate the end of the encoded information.
      */
    }

    return encodedString;
  }

  public static decode(encodedString: string): Buffer {
    let binaryString = '';
    let buffer = Buffer.alloc(0);

    // Remove any padding characters from the encoded string
    encodedString = encodedString.replace(/=/g, '');

    // Convert each character of the encoded string to its binary representation
    for (const char of encodedString) {
      const charIndex = Base32.BASE32_ALPHABET.indexOf(char);
      binaryString += charIndex.toString(2).padStart(5, '0');
    }

    // Split the binary string into groups of 8 and convert each group to a byte
    for (let i = 0; i < binaryString.length; i += 8) {
      const byte = parseInt(binaryString.substring(i, i + 8), 2);
      buffer = Buffer.concat([buffer, Buffer.from([byte])]);
    }

    return buffer;
  }
}
