var net = require('net');
var fs = require('fs');
var ITPpacket = require('./ITPpacketRequest')

var opn = require('opn'); // uncomment this line after you run npm install command

// Enter your code for the client functionality here
// Consider the code given iin unit 7 slide 40 as a base and build upon it

const commandLineArgs = require('command-line-args'); // helps with implementing command line args


//parse command line arguments
const optionDefinitions = [
    { name: 'server', alias: 's', type: String },
    { name: 'query', alias: 'q', type: String },
    { name: 'version', alias: 'v', type: Number }
]

const options = commandLineArgs(optionDefinitions);

let serverInfo = options.server.split(':');

let host = serverInfo[0];
let port = serverInfo[1];
let fileName = options.query;
let version = options.version || 3314;

// console.log(`host: ${host} port: ${port} file: ${filename} version ${version}`);


//initialize ITP packet from command line arguments
ITPpacket.init(version, 0, fileName);


//create socket, establish connection with the server and send request packet
var client = new net.Socket();
client.connect(port, host, () => {
    console.log(`Connected to ImageDB server on ${host}:${port}\n`);
    client.write(ITPpacket.getpacket());
})


//client receives response packet from server
client.on('data', data => {
  
  let response = parsePacket(data);

  console.log(
  
`Server Sent:\n
\t--ITP Version: ${response[0]}
\t--Response Type: ${response[1]}
\t--Sequence Number: ${response[2]}
\t--TimeStamp: ${response[3]}
\t--Image Size: ${response[4]}\n`

);

  if (response[1] == 1) { //if image found then save and open
    fs.writeFile(fileName, response[5], () => {
      opn(fileName, {wait: true});
    })
  }

  client.end();
});


//server ends the connection
client.on('end', () => {
  console.log('Disconnected from the server\n');
})


//socket closes
client.on('close', () => {
  console.log('Connection closed\n');
})


//parse the response packet sent from server
var parsePacket = buffer => {
  let version = buffer.readUIntBE(0, 3);
  let rtype = buffer.readUIntBE(3, 1);
  let sn = buffer.readUIntBE(4, 4);
  let ts = buffer.readUIntBE(8, 4);
  let is = buffer.readUIntBE(12, 4);
  let imageData = buffer.slice(16);

  return [version, rtype, sn, ts, is, imageData];
};
