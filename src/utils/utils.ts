import { FormatDateType } from './format';
import CryptoJS from 'crypto-js';

const addDays = (date: FormatDateType, days: number) => {
  if (typeof date === 'undefined' || date === null) {
    date = new Date();
  }

  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const encrypt = (input: string, secret: string) => {
  const key = CryptoJS.enc.Utf8.parse(secret);
  const iv1 = CryptoJS.enc.Utf8.parse(secret);
  const encrypted = CryptoJS.AES.encrypt(input, key, {
    keySize: 16,
    iv: iv1,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });

  return encrypted;
};

export { addDays, encrypt };
