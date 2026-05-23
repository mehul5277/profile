import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
//https://medium.com/@piyalidas.it/angular-encryption-and-decryption-using-cryptojs-a123505c67af

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor() { }

  // **Important: Use a secure method to manage this key in production**
  private secretKey = '1!2@3#4$';


  // Generates a random secret key (for demonstration purposes only)
  generateRandomKey(length: number = 16): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let key = '';
    for (let i = 0; i < length; i++) {
      key += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return key;
  }

  // Encrypts the data and returns the ciphertext
  encryptPayload(data: unknown): string {
    const jsonData = JSON.stringify(data);
    return CryptoJS.AES.encrypt(jsonData, this.secretKey).toString();
  }

  // Decrypts the ciphertext and returns the original data
  decryptPayload(ciphertext: string): unknown {
    const bytes = CryptoJS.AES.decrypt(ciphertext, this.secretKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    try {
      return JSON.parse(decrypted);
    } catch (e) {
      return null;
    }
  }
}