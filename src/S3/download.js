const { aws } = require('../config/importModule')

async function download({ bucketName, accessKeyId, secretAccessKey, fileName }) {

    return new Promise((resolve, reject) => {

        aws.config.update({
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey
        });

        const s3 = new aws.S3();

        const params = {
            Bucket: bucketName,
            Key: fileName,

        };

        s3.getObject(params, (err, res) => {
            if (err) {
                console.log({ err });
                reject(err);
            } else {
                console.log('File ' + fileName + " downloaded Successfully from S3");
                resolve(res)
            }
        });
    })
}

module.exports = download