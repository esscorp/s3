# @esscorp/s3
wrapper around `aws-sdk` for S3.

Features:
- **Copy:** copy file object from source to destination.
- **ContentType:** get the contentType of file.
- **Contents:** get file contents as string.
- **Delete:** delete file.
- **Download:** download file object.
- **Exists:** checks if the file exists.
- **Head:** get file head object.
- **IsDownloadable:** checks if the file is downloadable. Downloadable files exist and have their header ContentDisposition set to 'attachment'.
- **UrlPrivate:** get private url with an expiration which can be used for img tags.
- **UrlDownload:** get private url with an expiration which can be used for downloads.
- **UrlUpload:** get private url with an expiration which can be used for uploads.


> todo: Document the significance of setting the `ContentDisposition` to attachment.


## Install

```bash
npm install @esscorp/s3 --save
```

## Usage

```js
var S3 = require('@esscorp/s3');
var s3 = new S3();
```

## Copy

Copy S3 object from one bucket to another bucket.

- srcBucket (String) - Required source bucket name.
- srcKey (String) - Required source key name.
- dstBucket (String) - Required destination bucket name.
- srcKey (String) - Required destination key name.
- callback (Function) - Required callback.

```js
var srcBucket = 'old-bucket';
var srcKey = 'stupid/path';
var dstBucket = 'corp-eng-app-feature';
var dstKey = UUID();

s3.copy(srcBucket, srcKey, dstBucket, dstKey, function(err){
    if (err) return next(err);
    next();
});
```