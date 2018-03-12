# @esscorp/s3
wrapper around `aws-sdk` for S3.

Features:
- **Copy:** copy file object from source to destination.
- **ContentType:** get the contentType of file.
- **Contents:** get file contents as string.
- **Credentials:** get AWS credentials.
- **Delete:** delete file.
- **Download:** download file object.
- **Exists:** checks if the file exists.
- **Head:** get file head object.
- **IsDownloadable:** checks if the file is downloadable. Downloadable files exist and have their header ContentDisposition set to 'attachment'.
- **Upload:** uploads file object.
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

## Content Type

Get the contentType of file in S3.

- srcBucket (String) - Required source bucket name.
- srcKey (String) - Required source key name.
- callback (Function) - Required callback.

```js
var s3Bucket = 'bucket';
var s3Key = 'path';

s3.contentType(s3Bucket, s3Key, function(err, contentType){
    if (err) return next(err);
    next(null, contentType);
});
```

## Contents

Gets file contents as string.

- s3Bucket (String) - Required source bucket name.
- s3Key (String) - Required source key name.
- callback (Function) - Required callback.

```js
var s3Bucket = 'bucket';
var s3Key = 'path';

s3.contents(s3Bucket, s3Key, function(err, content){
    if (err) return next(err);
    next(null, content);
});
```

## Credentials

Get AWS credentials.

- callback (Function) - Required callback.

```js
var s3Bucket = 'bucket';
var s3Key = 'path';

s3.credentials(function(err, credentials){
    if (err) return next(err);
    next(null, credentials);
});
```

## Delete

Deletes a file.

- s3Bucket (String) - Required source bucket name.
- s3Key (String) - Required source key name.
- callback (Function) - Required callback.

```js
var s3Bucket = 'bucket';
var s3Key = 'path';

s3.delete(s3Bucket, s3Key, function(err) {
    if (err) return next(err);
    next();
});
```

## Download

Downloads a file.

- s3Bucket (String) - Required source bucket name.
- s3Key (String) - Required source key name.
- callback (Function) - Required callback.

```js
var s3Bucket = 'bucket';
var s3Key = 'path';

s3.download(s3Bucket, s3Key, function(err, data) {
    if (err) return next(err);
    next(null, data);
});
```

## Exists

Checks if the file exists.

- s3Bucket (String) - Required source bucket name.
- s3Key (String) - Required source key name.
- callback (Function) - Required callback.

```js
var s3Bucket = 'bucket';
var s3Key = 'path';

s3.exists(s3Bucket, s3Key, function(err, head) {
    if (err) return next(err);
    next(null, head);
});
```

## Head

Get file head object.

- s3Bucket (String) - Required source bucket name.
- s3Key (String) - Required source key name.
- callback (Function) - Required callback.

```js
var s3Bucket = 'bucket';
var s3Key = 'path';

s3.exists(s3Bucket, s3Key, function(err, head) {
    if (err) return next(err);
    next(null, head);
});
```

## Head

Checks if the file is downloadable. Downloadable files exist and have their header ContentDisposition set to 'attachment'.

- s3Bucket (String) - Required source bucket name.
- s3Key (String) - Required source key name.
- callback (Function) - Required callback.

```js
var s3Bucket = 'bucket';
var s3Key = 'path';

s3.exists(s3Bucket, s3Key, function(err, head) {
    if (err) return next(err);
    next(null, head);
});
```

## Upload

Uploads a file.

- s3Bucket (String) - Required source bucket name.
- s3Key (String) - Required source key name.
- file (String) - Required filename. Sets the content-disposition header.
- callback (Function) - Required callback.

```js
var s3Bucket = 'bucket';
var s3Key = 'path';
var file = 'file path relative wrapper';

s3.upload(s3Bucket, s3Key, file, function(err, data) {
    if (err) return next(err);
    next(null, data);
});
```

## UrlPrivate

Get private url with an expiration which can be used for img tags.

- s3Bucket (String) - Required source bucket name.
- s3Key (String) - Required source key name.
- callback (Function) - Required callback.

```js
var s3Bucket = 'bucket';
var s3Key = 'path';

s3.urlPrivate(s3Bucket, s3Key, function(err, url) {
    if (err) return next(err);
    next(null, url);
});
```

## UrlDownload

Get private url with an expiration which can be used for downloads.

- s3Bucket (String) - Required source bucket name.
- s3Key (String) - Required source key name.
- filename (String) - Required filename. Sets the content-disposition header.
- callback (Function) - Required callback.

```js
var s3Bucket = 'bucket';
var s3Key = 'path';

s3.urlPrivate(s3Bucket, s3Key, filename, function(err, url) {
    if (err) return next(err);
    next(null, url);
});
```

## UrlUpload

Get private url with an expiration which can be used for uploads.

- s3Bucket (String) - Required source bucket name.
- s3Key (String) - Required source key name.
- mime (String) - Required standard MIME type describing the format of the object data.
- callback (Function) - Required callback.

```js
var s3Bucket = 'bucket';
var s3Key = 'path';

s3.urlUpload(s3Bucket, s3Key, mime, function(err, url) {
    if (err) return next(err);
    next(null, url);
});
```
