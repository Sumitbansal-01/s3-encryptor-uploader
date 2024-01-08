const { crypto, zlib } = require('../config/importModule')

async function decrypt({encryptedData, iv, password}) {

  return new Promise((resolve, reject) => {
    try {

      let decyptedData = ""

      const CIPHER_KEY = crypto.createHash('sha256').update(password).digest();

      const unzip = zlib.createUnzip();
      unzip.write(encryptedData)
      unzip.end()

      const decipher = crypto.createDecipheriv('aes-256-cbc', CIPHER_KEY, iv);

      decipher.on('data', (chunks) => decyptedData += chunks.toString())

      decipher.on('end', () => {
        resolve({decyptedData})
      })

      unzip.pipe(decipher)

    } catch (err) {

      console.error(err)

      reject(err)
    }
  })
}

module.exports = decrypt