const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;


const   ContactSchema = new Schema({
    
    email: {
        type: String,
        trim: true,
        required: true
    },

    description: {
        type: String,
        trim: true,
        required: true
    },
    
    hidden: {
        type: Boolean,
        default: false
    },


}, { timestamps: true });

module.exports = Mongoose.model("User", ContactSchema);