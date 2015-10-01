var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var http = require('http');
var util = require('util');
var fs = require('fs.extra');

/* GET users listing. */
router.post('/', function(req, res, next) {
  var form = new multiparty.Form();
  var user = {};
  //var tempFilePath = '';
  //var fileName = '';

  form.on('error', function(err) {
  	console.log('Error parsing form: ' + err.stack);
  });

  form.on('file', function(fieldName, file){
  	// write file to file system
  	console.log(file.path);
  	console.log(file.originalFilename);
  	fs.copy(file.path, './uploads/' + file.originalFilename, function(err){
  		if (err) {
  			console.error(err)
  		} else {
  			console.log("File copied")
  		}
  	});
  });

  // Parses form data and saves file to temp directory
  form.parse(req, function(err, fields, files) {
  	user = JSON.parse(fields.user[0]); // response is an array that contains a string representation of a JSON object
  	console.log(fields);
  	//tempFilePath = files.file[0].path;
  	//fileName = files.file[0].originalFileName;
  	console.log(files);
  	res.sendStatus(200);
  });

  
});

module.exports = router;
