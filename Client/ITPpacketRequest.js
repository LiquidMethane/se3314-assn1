
// You may need to add some delectation here

var buffer;

module.exports = {


    init: function(version, rtype, fileName) {// feel free to add function parameters as needed
        //
        // enter your code here
        //

        buffer = Buffer.alloc(4 + Buffer.byteLength(fileName)); //figure out the buffer size needed to store all information

        //store information into buffer
        buffer.writeUIntBE(version, 0, 3);
        buffer.writeUInt8(rtype, 3);
        buffer.write(fileName, 4, 'utf-8');
    },

    //--------------------------
    //getpacket: returns the entire packet
    //--------------------------
    getpacket: function() {
        // enter your code here
        return buffer;
    }


};

