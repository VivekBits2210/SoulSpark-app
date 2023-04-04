import CryptoJS from "crypto-js";

function encryptEmail(email, key) {
  // Convert the key from a hexadecimal string to a WordArray
  const keyWordArray = CryptoJS.enc.Hex.parse(key);

  // Encrypt the plaintext with AES-CBC
  const encrypted = CryptoJS.AES.encrypt(plaintext, keyWordArray, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  // Return the concatenation of the IV and ciphertext as a hexadecimal string
  return encrypted.iv.toString() + encrypted.ciphertext.toString();
}
