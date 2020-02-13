
// Some code needs to added that are common for the module

var getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
}


module.exports = {
    init: function () {
        // init function needs to be implemented here //

        this.getRandomArbitrary(1, 999);
    },

    //--------------------------
    //getSequenceNumber: return the current sequence number + 1
    //--------------------------
    getSequenceNumber: function () {
        // Enter your code here //
        return "this should be a correct sequence number";
    },

    //--------------------------
    //getTimestamp: return the current timer value
    //--------------------------
    getTimestamp: function () {
        return "this should be a correct timestamp";
    }


};