import {appInfo} from 'src/constants';
import CryptoJS from 'crypto-js';

export const createSecretToken = (): string =>
  CryptoJS.AES.encrypt(new Date().toString(), appInfo.secretHeader).toString();
