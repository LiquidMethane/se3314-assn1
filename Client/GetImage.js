var net = require('net');
var fs = require('fs');
var ITPpacket = require('./ITPpacketRequest')

var opn = require('opn'); // uncomment this line after you run npm install command

// Enter your code for the client functionality here
// Consider the code given iin unit 7 slide 40 as a base and build upon it

const commandLineArgs = require('command-line-args'); // helps with implementing command line args

const optionDefinitions = [
    { name: 'server', alias: 's', type: String },
    { name: 'query', alias: 'q', type: String },
    { name: 'version', alias: 'v', type: Number }
]

const options = commandLineArgs(optionDefinitions);


// let colonPosition = charPosition(options.server, ':');

let serverInfo = options.server.split(':');

let host = serverInfo[0];
let port = serverInfo[1];
let filename = options.query;
let version = options.version || 3314;

console.log(`host: ${host} port: ${port} file: ${filename} version ${version}`);


// var client = new net.Socket();


// var charPosition = (str, char) => {
//     for (let i = 0; i < str.length; i++)
//         if (str[i] == char)
//             return i;
//     return -1;
// }