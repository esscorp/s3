'use strict';
// to run test install gm node module
// npm install --save gm
// var GM = require('gm');
var wrapper = require('../index.js');
var s3 = new wrapper({
	region: 'us-east-1',
	apiVersions: {
		s3: '2006-03-01',
		sqs: '2012-11-05'
	},
	iam: {
		// credentials for user app-uploader
		accessKeyId: process.env.ESS_AWS_APP_UPLOADER_ACCESS_KEY_ID,
		secretAccessKey: process.env.ESS_AWS_APP_UPLOADER_SECRET_ACCESS_KEY
	}
});

var s3Bucket = 'ess-eng-dox-downloads';
var s3Key = 'thumbsUp.jpg';
var file = './tests/thumbsUp.jpg';
// var stream = GM(file).stream();
//
// s3.upload(s3Bucket, s3Key, stream, function(err, data) {
//
// });
