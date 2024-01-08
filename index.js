const { encryption, decryption, s3Upload, s3Download } = require("./src/config/packageModules")
const errors = require("./src/config/errors")

class S3EncryptorUploader {

    setS3Credentials({ bucketName, accessKeyId, secretAccessKey }) {
        this.bucketName = bucketName;
        this.accessKeyId = accessKeyId;
        this.secretAccessKey = secretAccessKey;
    }

    setIv(iv) {
        this.iv = iv;
    }

    setPassword(password) {
        this.password = password;
    }

    async encypt({ data, iv, password }) {
        const _iv = iv || this.iv
        const _password = password || this.password

        if (typeof data !== 'string' && !Buffer.isBuffer(data)) data = JSON.stringify(data)

        const response = await encryption({ data, iv: _iv, password: _password });
        return response;
    }

    async decrypt({ data, iv, password }) {

        const _iv = iv || this.iv
        const _password = password || this.password

        if (!_iv || !_password || !data)
            throw new Error(errors.missingParameter)
        
        const response = await decryption({ encryptedData: data, iv: _iv, password: _password });
        return response;
    }

    async upload({ bucketName, accessKeyId, secretAccessKey, fileName, data, isMetaData }) {

        const _bucketName = bucketName || this.bucketName;
        const _accessKeyId = accessKeyId || this.accessKeyId;
        const _secretAccessKey = secretAccessKey || this.secretAccessKey;
        if (!_bucketName || !_accessKeyId || !_secretAccessKey || !fileName || !data)
            throw new Error(errors.missingParameter)

        if (typeof data !== 'string' && !Buffer.isBuffer(data)) throw new Error(errors.acceptStringBuffer)

        const response = await s3Upload({ bucketName: _bucketName, accessKeyId: _accessKeyId, secretAccessKey: _secretAccessKey, fileName, data, isMetaData });
        return response;
    }

    async download({ bucketName, accessKeyId, secretAccessKey, fileName }) {

        const _bucketName = bucketName || this.bucketName;
        const _accessKeyId = accessKeyId || this.accessKeyId;
        const _secretAccessKey = secretAccessKey || this.secretAccessKey;

        if (!_bucketName || !_accessKeyId || !_secretAccessKey || !fileName)
            throw new Error(errors.missingParameter)

        const response = await s3Download({ bucketName: _bucketName, accessKeyId: _accessKeyId, secretAccessKey: _secretAccessKey, fileName });
        return response;
    }

    async encyptAndUpload({ bucketName, accessKeyId, secretAccessKey, fileName, data, isMetaData, iv, password }) {
        const encryptResponse = await this.encypt({ data, iv, password })
        const uploadResponse = await this.upload({ bucketName, accessKeyId, secretAccessKey, fileName, data: encryptResponse?.data, isMetaData })
        return { uploadResponse: uploadResponse, ...encryptResponse }
    }

    async decryptAndDownload({ bucketName, accessKeyId, secretAccessKey, fileName, iv, password }) {
        const downloadResponse = await this.download({ bucketName, accessKeyId, secretAccessKey, fileName })
        const decryptionResponse = await this.decrypt({ data: downloadResponse.Body, iv, password });
        return decryptionResponse
    }
}

module.exports = S3EncryptorUploader;