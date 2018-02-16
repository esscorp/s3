'use strict';

var Assert = require('assert');
var Prove = require('provejs-params');
var AWS = require('aws-sdk');
var ok = Assert.ok;

module.exports = function(cfg) {

	// validate
	ok(isFinite(cfg.expires), 'Config `expires` expected to be integer.');

	// AWS client
	var s3 = new AWS.S3(cfg.iam);

	function download(s3Bucket, s3Path, next) {
		var params = {
			Bucket: s3Bucket,
			Key: s3Path
		};
		s3.getObject(params, next);
	}

	function head(s3Bucket, s3Path, next) {
		var params = {
			Bucket: s3Bucket,
			Key: s3Path
		};

		s3.headObject(params, function(err, head) {
			//if (err) console.log (err);
			if (err && err.statusCode === 404) return next(null, false);
			if (err && err.code === 'Forbidden') return next(null, false);
			if (err) return next(err);
			next(null, head);
		});
	}

	function del(s3Bucket, s3Path, next) {
		var params = {
			Bucket: s3Bucket,
			Key: s3Path
		};

		s3.deleteObject(params, function(err) {
			//if (err) console.log (err);
			if (err && err.statusCode === 404) return next(null, false);
			if (err && err.code === 'Forbidden') return next(null, false);
			if (err) return next(err);
			next();
		});
	}

	function exists(s3Bucket, s3Path, next) {
		head(s3Bucket, s3Path, function(err, head) {
			if (err) return next(err);
			next(null, head);
		});
	}

	function contentType(s3Bucket, s3Path, next) {
		head(s3Bucket, s3Path, function(err, head) {
			if (err) return next(err);
			next(null, head.ContentType);
		});
	}

	function contents(s3Bucket, s3Path, next) {
		download(s3Bucket, s3Path, function(err, data) {
			if (err) return next(err);

			next(null, data.Body.toString());
		});
	}

	function copy(srcBucket, srcKey, dstBucket, dstKey, next) {

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

	function urlPrivate(s3Bucket, s3Path, next) {

		// todo:
		// https://blogs.msdn.microsoft.com/ie/2008/07/02/ie8-security-part-v-comprehensive-protection/
		// https://github.com/blog/1482-heads-up-nosniff-header-support-coming-to-chrome-and-firefox
		// X-Content-Type-Options: nosniff

		var params = {
			Bucket: s3Bucket,
			Expires: cfg.expires,
			//ResponseContentDisposition: 'attachment',
			Key: s3Path
		};
		s3.getSignedUrl('getObject', params, next);
		//return url;
	}

	function urlDownload(s3Bucket, s3Path, filename, next) {

		//Content-Disposition: attachment; filename=foo.bar
		var rcd = 'attachment; filename=' + filename;

		var params = {
			Bucket: s3Bucket,
			Expires: cfg.expires,
			ResponseContentDisposition: rcd,
			Key: s3Path
		};
		s3.getSignedUrl('getObject', params, next);
	}

	function urlUpload(s3Bucket, s3Path, mime, next) {

		Prove('SSF', arguments);

		//console.log('urlUpload()'.red, s3Path, mime);

		var params = {
			Bucket: s3Bucket,
			Expires: cfg.expires,
			ContentType: mime,
			Key: s3Path
		};

		// to force upload to fail
		// delete params.ContentType;

		s3.getSignedUrl('putObject', params, next);
	}

	// public functions
	return {
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
		options: cfg
	};
};
