var net = require('net');
var fs = require('fs');
var ITPpacket = require('./ITPpacketRequest')

var opn = require('opn'); // uncomment this line after you run npm install command

// Enter your code for the client functionality here
// Consider the code given iin unit 7 slide 40 as a base and build upon it

let HOST = '127.0.0.1',
    PORT = 3000;


var client = new net.Socket();

client.connect(PORT, HOST, () => {
    console.log(`CONNECTED TO: ${HOST} : ${PORT}`);
    client.write(`Hi there.`);
});

