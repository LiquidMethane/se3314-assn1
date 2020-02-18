
// You may need to add some delectation here

var buffer;

module.exports = {

    init: function(version, rtype, sn, ts, is, imageBuffer) { // feel free to add function parameters as needed
        //
        // enter your code here
        //

        //store informatino into buffer
        buffer = Buffer.alloc(16);
        buffer.writeUIntBE(version, 0, 3);
        buffer.writeUInt8(rtype, 3);
        buffer.writeUIntBE(sn, 4, 4);
        buffer.writeUIntBE(ts, 8, 4);
        buffer.writeUIntBE(is, 12, 4);

        buffer = Buffer.concat([buffer, imageBuffer]);

    },

    //--------------------------
    //getlength: return the total length of the ITP packet
    //--------------------------
    getLength: function() {
        // enter your code here
        return buffer.length;
    },

    //--------------------------
    //getpacket: returns the entire packet
    //--------------------------
    getPacket: function() {
        // enter your code here
        return buffer;
    }
};