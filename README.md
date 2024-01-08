# s3-encryptor-uploader

This module allows you to easily and securely upload the data on Amazon S3. By this, you can encrypt and decrypt the data, upload and download the data from S3 and also you can do encryption,  compression, and upload together.

### Examples

Below are some examples.

###### Encryption

Performing encryption on the data, while also compressing the data in between

```
const S3EncryptorUploader = require("s3-encryptor-uploader");
const obj = new S3EncryptorUploader();
obj.encypt({data : "Hello World", password: "xyz", iv:require("crypto").randomBytes(16) })
	.then(e=> console.log({e}))
	.catch(e=> console.error(e));
```

Here data is mandatory if "password" and "iv" are not present it will autogenerate

###### Decryption

```
const obj = new S3EncryptorUploader();
obj.decrypt({data, password: "xyz", iv:require("crypto").randomBytes(16) })
	.then(e=> console.log({e}))
	.catch(e=> console.error(e));
```

###### Set Password

If you don't want to pass the password again and again you can set the password and then at the time of encryption and decryption it by default use this password if the password is not given. It will not autogenerate the password.

```
obj.setPassword("xyz");
```

###### Set IV

```
obj.setIv(iv);
```

###### S3 Upload

This will upload the data to S3

```
obj.upload({bucketName, accessKeyId, secretAccessKey, fileName, data, isMetaData})
	.then(e=> console.log(e))
	.catch(e=> console.error(e));
```

###### S3 Download

```
obj.download({bucketName, accessKeyId, secretAccessKey, fileName})
	.then(e=> console.log(e))
	.catch(e=> console.error(e));
```

###### Set S3 Credentials

Same as the password and iv for setting the default credentials. These credentials will be used when you have not provided credentials at the time of upload and download

```
obj.setS3Credentials({bucketName, accessKeyId, secretAccessKey});
```

###### Encrypt and Upload

Performing an encryption, compression and upload together.

```
obj.encyptAndUpload({bucketName, accessKeyId, secretAccessKey, fileName, data, isMetaData, iv, password})
.then(e=> console.log(e))
.catch(e=> console.error(e))
```

###### Decrypt and Upload

```
obj.decryptAndDownload({bucketName, accessKeyId, secretAccessKey, fileName, iv, password})
.then(e=> console.log(e))
.catch(e=> console.error(e))
```
