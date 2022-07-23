import { createCipheriv, randomBytes, scrypt, createDecipheriv } from 'crypto';
import { Injectable } from '@nestjs/common';
import { promisify } from 'util';

@Injectable()
export class CryptographyStrategy {

  async encrypt(password: string): Promise<string | Buffer> {
    const iv = randomBytes(16);
    const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);

    const encryptedPassword = Buffer.concat([
      cipher.update(password),
      cipher.final(),
    ]);

    return encryptedPassword;
  }

  async decrypt(password: string, encryptedPassword: any): Promise<string | Buffer> {
    const iv = randomBytes(16);
    const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;    
    const decipher = createDecipheriv('aes-256-ctr', key, iv);
    
    const decryptedPassword = Buffer.concat([
      decipher.update(encryptedPassword),
      decipher.final(),
    ]);

    return decryptedPassword;
  }
}