const { crypto, pako } = require('../config/importModule')
const generatePassword = require("../GeneratePassword/generatePassword")

function encrypt({ data, iv, password }) {
    return new Promise((resolve, reject) => {
        try {

            const passphrase = password || (new generatePassword()).getPassword(10, true);

            const CIPHER_KEY = crypto.createHash('sha256').update(passphrase).digest();

            const initialVector = iv || crypto.randomBytes(16);

            const cipher = crypto.createCipheriv('aes-256-cbc', CIPHER_KEY, initialVector);

            const compressedData = pako.deflate(data);

            let encryptedData = cipher.update(compressedData);
            encryptedData = Buffer.concat([encryptedData, cipher.final()]);

            resolve({ data: encryptedData, password: passphrase, iv: initialVector })

        } catch (err) {
            reject(err)
        }
    })


}

module.exports = encrypt