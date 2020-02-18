var ITPpacket = require('./ITPpacketResponse'),
    singleton = require('./Singleton');

// You may need to add some delectation here

const fs = require('fs');

var parseBuffer = (buffer) => { //helper function to parse buffer sent from client
    let version = buffer.readUIntBE(0, 3);
    let rtype = buffer.readUIntBE(3, 1);
    let fileName = buffer.toString('utf-8', 4);
    return [version, rtype, fileName];
};

var sendResponse = (sock, version, rtype, sn, ts, is, imageBuffer) => { //helper function to send response back to client
    ITPpacket.init(version, rtype, sn, ts, is, imageBuffer);
    sock.end(ITPpacket.getPacket());
};

module.exports = {

    handleClientJoining: function (sock) {
        //
        // Enter your code here
        //
        // you may need to develop some helper functions
        // that are defined outside this export block

        let connTime = singleton.getTimestamp(); // record timestamp

        console.log(`Client-${connTime} is connected at timestamp: ${connTime}\n`); //output connection established

        sock.on('data', (data) => { //server receives request packet from client

            let request = parseBuffer(data); //parse request packet

            if (request[0] == 3314 && request[1] == 0) { //check request packet validity
                //log request information to console
                console.log(`Client-${connTime} requests:\n\t--ITP Version: ${request[0]}\n\t--Request Type: ${request[1]}\n\t--Image File Name: '${request[2]}'\n`);

                fs.readFile(`./images/${request[2]}`, (err, data) => { //attemps to load file requested
                    if (err)
                        sendResponse(sock, request[0], 2, singleton.getSequenceNumber(), singleton.getTimestamp(), 0, Buffer.alloc(0)); //fails to load requested file
                    else
                        sendResponse(sock, request[0], 1, singleton.getSequenceNumber(), singleton.getTimestamp(), data.length, data);
                })
            }



        });

        sock.on('end', () => { //server receives ending request from client
            console.log(`Client-${connTime} closed the connection\n`);
        })


    }
};


