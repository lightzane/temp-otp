import qrcode from 'qrcode-terminal';
import { Base32 } from './zero-base32';
import { generateSecret } from './zero-secret';
import { TOTP } from './zero-totp';

// Example usage:
const inputString = generateSecret();
const buffer = Buffer.from(inputString, 'utf8');

const encodedString = Base32.encode(buffer);
console.log('Encoded:', encodedString);

const decodedBuffer = Base32.decode(encodedString);
const decodedString = decodedBuffer.toString('utf8');
console.log('Decoded:', decodedString);

const url = `otpauth://totp/Zero:Hero?secret=${encodedString}&issuer=Zero`;

// qrcode.toDataURL(url).then(console.log); // npm i qrcode
qrcode.generate(url, { small: true }); // npm i qrcode-terminal
console.log(url);

console.log(TOTP.generate(encodedString));
// ? algorithm is only HMAC-SHA1 ???
// https://en.wikipedia.org/wiki/Google_Authenticator
