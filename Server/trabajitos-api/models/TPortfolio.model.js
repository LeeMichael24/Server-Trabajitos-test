const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;


const portfolioSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }, 
    category: {
        type: Schema.Types.ObjectId,
        default: "647037c1c301c25cdbcd30c6"
    }
});


module.exports = Mongoose.model("Portfolio", portfolioSchema);


