import CryptoJS from "crypto-js";

export function encrypt(text, key) {
    let ciphertext = CryptoJS.AES.encrypt(text, key).toString();
    ciphertext = ciphertext.replace(/\//g, 'á'); // Reemplazar '/' con 'á'
    return ciphertext;
}

export function decrypt(ciphertext, key) {
    ciphertext = ciphertext.replace(/á/g, '/'); // Reemplazar 'á' con '/'
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    return bytes.toString(CryptoJS.enc.Utf8);
}
