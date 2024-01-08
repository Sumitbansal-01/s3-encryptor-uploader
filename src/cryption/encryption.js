const { crypto, zlib } = require('../config/importModule')
const generatePassword = require("../GeneratePassword/generatePassword")

function encrypt({data, iv, password}) {
    return new Promise((resolve, reject) => {
        try {

            const passphrase = password || generatePassword.getPassword(10, true);

            const CIPHER_KEY = crypto.createHash('sha256').update(passphrase).digest();
            
            const initialVector = iv || crypto.randomBytes(16);

            const cipher = crypto.createCipheriv('aes-256-cbc', CIPHER_KEY, initialVector);

            const gzipStream = zlib.createGzip();

            cipher.write(data)

            cipher.end()

            let zipData = Buffer.from('')

            gzipStream.on('data', chunk => zipData = Buffer.concat([zipData, chunk]))

            gzipStream.on('end', async () => resolve({data: zipData, iv:initialVector,  password: passphrase}))

            cipher.pipe(gzipStream)

        } catch (err) {
            reject(err)
        }
    })


}

module.exports = encrypt