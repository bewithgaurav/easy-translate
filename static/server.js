var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var server = express();

server.use(bodyParser.json()); // support json encoded bodies

server.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

server.use(cors())

server.use(express.static(__dirname));

var port = process.env.PORT || 8081;
server.listen(port,'0.0.0.0');
console.log('Use port ' + port + ' to connect to this server');

exports = module.exports = server;
const translate = require('google-translate-api');

var responseText='None';

function getTranslation(resObj,translateStr,translateLang)
{
	translate(translateStr, {to: translateLang}).then(res => {
	    responseText=res.text;
	    // console.log(res.text);
	    resObj.send(res.text);
	    //=> I speak English 
	    // console.log(res.from.language.iso);
	    //=> nl 
	}).catch(err => {
		resObj.send("error");
	    console.error(err);
	});

}

server.get('/translate', function (req, res) {
	console.log('GET')
	console.log(req.headers)
	x=getTranslation(res);
})

server.post('/translate', function (req, res) {	
	console.log('POST')
	console.log(req.body)
	var translateText=req.body.text;
	var translateLang=req.body.lang;
	x=getTranslation(res,translateText,translateLang);
})
