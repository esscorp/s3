'use strict';

var Prove = require('provejs-params');
var AWS = require('aws-sdk');

module.exports = function(cfg) {

	// defaults
	cfg = cfg || {};
	cfg.iam = cfg.iam || {};
	cfg.expires = cfg.expires || 60 * 60; // 1 hour
	cfg.iam.region = cfg.iam.region || 'us-east-1';
	cfg.iam.apiVersion = cfg.iam.apiVersion || '2006-03-01';

	var s3 = new AWS.S3(cfg.iam);

	function download(s3Bucket, s3Key, next) {

		Prove('SSF', arguments);

		var params = {
			Bucket: s3Bucket,
			Key: s3Key
		};
		s3.getObject(params, next);
	}

	function upload(s3Bucket, s3Key, stream, next) {

		Prove('SSOF', arguments);

		var params = {
			Bucket: s3Bucket,
			Key: s3Key,
			Body: stream
		};

		s3.upload(params, function(err, data) {
			if (err) next(err);

			next(null, data);
		});
	}

	function head(s3Bucket, s3Key, next) {

		Prove('SSF', arguments);

		var params = {
			Bucket: s3Bucket,
			Key: s3Key
		};

		s3.headObject(params, function(err, head) {
			//if (err) console.log (err);
			if (err && err.statusCode === 404) return next(null, false);
			if (err && err.code === 'Forbidden') return next(null, false);
			if (err) return next(err);
			next(null, head);
		});
	}

	function del(s3Bucket, s3Key, next) {

		Prove('SSF', arguments);

		var params = {
			Bucket: s3Bucket,
			Key: s3Key
		};

		s3.deleteObject(params, function(err) {
			//if (err) console.log (err);
			if (err && err.statusCode === 404) return next(null, false);
			if (err && err.code === 'Forbidden') return next(null, false);
			if (err) return next(err);
			next();
		});
	}

	function exists(s3Bucket, s3Key, next) {

		Prove('SSF', arguments);

		head(s3Bucket, s3Key, function(err, head) {
			if (err) return next(err);
			next(null, head);
		});
	}

	function contentType(s3Bucket, s3Key, next) {

		Prove('SSF', arguments);

		head(s3Bucket, s3Key, function(err, head) {
			if (err) return next(err);
			next(null, head.ContentType);
		});
	}

	function contents(s3Bucket, s3Key, next) {

		Prove('SSF', arguments);

		download(s3Bucket, s3Key, function(err, data) {
			if (err) return next(err);

			if (!data) return next();

			next(null, data.Body.toString());
		});
	}

	function copy(srcBucket, srcKey, dstBucket, dstKey, next) {

		Prove('SSSSF', arguments);

		var params = {
			CopySource: srcBucket + '/' + srcKey,
			Bucket: dstBucket,
			Key: dstKey,
			MetadataDirective: 'COPY'
		};

		Prove('***F', arguments);

		s3.copyObject(params, function(err) {
			if (err) return next(err);

			next(null, dstBucket);
		});
	}

	function urlPrivate(s3Bucket, s3Key, next) {

		Prove('SSF', arguments);

		// todo:
		// https://blogs.msdn.microsoft.com/ie/2008/07/02/ie8-security-part-v-comprehensive-protection/
		// https://github.com/blog/1482-heads-up-nosniff-header-support-coming-to-chrome-and-firefox
		// X-Content-Type-Options: nosniff

		var params = {
			Bucket: s3Bucket,
			Expires: cfg.expires,
			//ResponseContentDisposition: 'attachment',
			Key: s3Key
		};
		s3.getSignedUrl('getObject', params, next);
		//return url;
	}

	function urlDownload(s3Bucket, s3Key, filename, next) {

		Prove('SSSF', arguments);

		//Content-Disposition: attachment; filename=foo.bar
		var rcd = 'attachment; filename=' + filename;

		var params = {
			Bucket: s3Bucket,
			Expires: cfg.expires,
			ResponseContentDisposition: rcd,
			Key: s3Key
		};
		s3.getSignedUrl('getObject', params, next);
	}

	function urlUpload(s3Bucket, s3Key, mime, next) {

		Prove('SSSF', arguments);

		//console.log('urlUpload()'.red, s3Key, mime);

		var params = {
			Bucket: s3Bucket,
			Expires: cfg.expires,
			ContentType: mime,
			Key: s3Key
		};

		// to force upload to fail
		// delete params.ContentType;

		s3.getSignedUrl('putObject', params, next);
	}

	function isDownloadable(bucket, s3Key, next) {

		head(bucket, s3Key, function(err, head) {
			if (err) return next(err);

			var exists = !!head;
			var attachment = (head && head.ContentDisposition === 'attachment');

			next(null, exists, attachment);
		});
	}

	function credentials(next) {
		s3.config.getCredentials(function(err) {
			if (err) return next(err);
			next(null, s3.config.credentials);
		});
	}

	// public functions
	return {
		credentials: credentials,
		upload: upload,
		urlUpload: urlUpload,
		urlPrivate: urlPrivate,
		urlDownload: urlDownload,
		download: download,
		head: head,
		delete: del,
		exists: exists,
		contentType: contentType,
		contents: contents,
		copy: copy,
		isDownloadable: isDownloadable,
		options: cfg
	};
};
