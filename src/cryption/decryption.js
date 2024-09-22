const { crypto, pako } = require('../config/importModule')

async function decrypt({ encryptedData, iv, password }) {

  return new Promise((resolve, reject) => {
    try {

      const CIPHER_KEY = crypto.createHash('sha256').update(password).digest();

      const decipher = crypto.createDecipheriv('aes-256-cbc', CIPHER_KEY, iv);

      let compressedData = decipher.update(encryptedData);
      compressedData = Buffer.concat([compressedData, decipher.final()]);

      const unzip = pako.inflate(compressedData);

      resolve(unzip)

    } catch (err) {

      console.error(err)

      reject(err)
    }
  })
}

module.exports = decrypt