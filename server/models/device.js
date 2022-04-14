let mongoose = require("mongoose"),
 deviceSchema = mongoose.Schema({
    id: Number,
    name: String,
    func: String,
    status: Number,
    open: Boolean,
    openStartTime: Number,
    timeout: Number,
    partnerId: Number,
  });

module.exports = mongoose.model("Device", deviceSchema, 'device');