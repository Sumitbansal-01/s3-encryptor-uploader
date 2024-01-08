const { aws } = require('../config/importModule')

async function upload({bucketName, accessKeyId,  secretAccessKey, fileName, data, isMetaData}) {

    return new Promise((resolve, reject) => {

        aws.config.update({
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey
        });

        const s3 = new aws.S3();

        const params = {
            Bucket: bucketName,
            Key: fileName,
            Body: data,
        };

        if(isMetaData){
            params.Metadata=isMetaData;
        }

        s3.upload(params, (err, res) => {
            if (err) {
                console.log({ err });
                reject(err);
            } else {
                resolve(res)
            }
        });
    })
}

module.exports = upload