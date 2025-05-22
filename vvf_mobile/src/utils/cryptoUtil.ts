import CryptoJS from 'crypto-js';

export const createSecretToken = (): string =>
  CryptoJS.AES.encrypt(
    new Date().toISOString(),
    process.env.SECRET_KEY as string,
  ).toString();
