import qrcode from 'qrcode-terminal';
import { Base32 } from './zero-base32';
import { generateSecret } from './zero-secret';
import { TOTP } from './zero-totp';

// Two (2) input options:
// Option 1: Readable secret
//   - Write a readable message and encode it to Base 32
// Option 2: Unreadable secret
//   - Generate a secret ready to be passed as Base 32 encoded

// Example usage:
const inputString = 'READABLE_SECRET';
const buffer = Buffer.from(inputString, 'utf8');

// Option 2 or Option 1
const encodedString = generateSecret() || Base32.encode(buffer);
console.log('Encoded:', encodedString);

const decodedBuffer = Base32.decode(encodedString);
const decodedString = decodedBuffer.toString('utf8');
console.log('Decoded:', decodedString);

const secret = encodedString.replace(/=/g, '');
const url = `otpauth://totp/Zero:Hero?secret=${secret}&issuer=Zero`;

// qrcode.toDataURL(url).then(console.log); // npm i qrcode
qrcode.generate(url, { small: true }); // npm i qrcode-terminal
console.log(url);

console.log(TOTP.generate(encodedString));
// ? algorithm is only HMAC-SHA1 ???
// https://en.wikipedia.org/wiki/Google_Authenticator
