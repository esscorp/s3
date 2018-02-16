# @esscorp/s3
wrapper around `aws-sdk` for S3.

Features:
- **Copy:** copy file object from source to destination.
- **ContentType:** checks the contentType of file.
- **Contents:** get file contents as string.
- **Delete:** delete file.
- **Download:** download file object.
- **Exists:** checks if the file exists.
- **Head:** get file head object.
- **IsDownloadable:** checks if the file is downloadable. Downloadable files have their header ContentDisposition set to 'attachment'.
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
var s3 = new require('@esscorp/s3')();
var srcBucket = 'old-bucket';
var srcKey = 'stupid/path';
var dstBucket = 'corp-eng-app-feature';
var dstKey = UUID();

s3.copy(srcBucket, srcKey, dstBucket, dstKey, function(err){
    if (err) return next(err);

    s3.delete(srcBucket, srcKey, function(err){
        if (err) return next(err);

        next();
    })
});
```