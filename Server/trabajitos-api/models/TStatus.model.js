const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const debug = require("debug")("app:municipality-model");

const statusSchema = new Schema({
    name:{
        type: String,
        trim: true,
        required: true
    }
});

module.exports = Mongoose.model("Status", statusSchema);