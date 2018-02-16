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
- **UrlPrivate:** get private url with an expiration which can be used for img tags.
- **UrlDownload:** get private url with an expiration which can be used for downloads.
- **UrlUpload:** get private url with an expiration which can be used for uploads.

## Install

```bash
npm install @esscorp/s3 --save
```

## Usage

```js
var S3 = require('@esscorp/s3');
var s3 = new S3({
    expires: 60 * 60 // 1 hour
});
```

## Copy
```js
```

## ContentType
```js
```

## Contents
```js
```

## Delete
```js
```

## Download
```js
```

## Exists
```js
```

## Head
```js
```

## UrlPrivate
```js
```

## UrlDownload
```js
```

## UrlUpload
```js
```