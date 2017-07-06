// Load modules needed
var jwt = require('jsonwebtoken');
var fs = require('fs');
var express = require("express");
var https = require('https');
var path = require('path');
var _ = require("lodash");
var bodyParser = require('body-parser');


var app = express();
//set the port for the listener here
var port = 8185;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//**********************************************************/
//CONFIG SECTION                                            /
//**********************************************************/

var jwtEncryptionKey = fs.readFileSync("Enter the path to the private key used to encrypt the json web token.");

//In this section, provide the certificate files for running the node server that will host the mashup.
var serverKey = fs.readFileSync("Enter the path to the private key used to secure this website.");
var serverCert = fs.readFileSync("Enter the path to the server certificate used for this website.");

var hostname = "hostname of Qlik Sense server where jwt token will be sent.";
var prefix = "virtual proxy prefix";

//In the following function, update the attributes and add more if desired.
function createToken() {
    var token = jwt.sign({
        "userId": "boz",
        "userDirectory": "example",
        "email": "boz@example.com",
        "Group": ["sales", "finance", "marketing"]
    }, jwtEncryptionKey, {
        "algorithm": "RS256"
    })
    return token;
}

//**********************************************************/
//CONFIG SECTION                                            /
//**********************************************************/

function authRequest(token) {
    return new Promise(function(resolve) {
        var cookie;
        var options = {
            hostname: hostname,
            port: 443,
            path: "/" + prefix + "/qrs/about?xrfkey=ABCDEFG123456789",
            method: 'GET',
            headers: {
                'X-Qlik-Xrfkey': 'ABCDEFG123456789',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            'rejectUnauthorized': false
        };

        var request = https.request(options, function(response) {

            //cookie = response.headers['set-cookie'];
            console.log(cookie);
            response.on('data', function(data) {
                process.stdout.write(JSON.stringify(JSON.parse(data)));
                resolve(cookie);
            })
            resolve(response.headers['set-cookie']);
        });
        request.on('error', function(error) {
            console.log(error);
        });

        request.end();
    })

}

app.get('/login', function(request, response) {
    authRequest(createToken())
        .then(function(res) {
            console.log(res);
            response.setHeader('set-cookie', res);
            return;
        })
        .then(function() {
            response.redirect("https://" + hostname + "/" + prefix + "/hub");
        })
})

//Server options to run an HTTPS server
var httpsoptions = {
    key: serverKey,
    cert: serverCert
};


var server = https.createServer(httpsoptions, app);
server.listen(port, function() {
    console.log("JWT test server started");
})