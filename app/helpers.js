import CryptoJS from "crypto-js";

export default function encryptEmail(email, key) {
  const utf8Key = CryptoJS.enc.Hex.parse(key);
  const utf8Email = CryptoJS.enc.Utf8.parse(email);

  const encrypted = CryptoJS.AES.encrypt(utf8Email, utf8Key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });

  return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}
