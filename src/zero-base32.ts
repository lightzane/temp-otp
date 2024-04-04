export class Base32 {
  private static readonly BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

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
    }

    // Split the binary string into groups of 5 and encode each group
    for (let i = 0; i < binaryString.length; i += 5) {
      const chunk = binaryString.substring(i, i + 5);
      encodedString += Base32.BASE32_ALPHABET[parseInt(chunk, 2)];
    }

    // Pad the encoded string with '=' characters if necessary
    while (encodedString.length % 8 !== 0) {
      encodedString += '=';
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
