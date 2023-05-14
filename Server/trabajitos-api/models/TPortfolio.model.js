const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;


const PortfolioSchema = new Schema({
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
    }
});


module.exports = Mongoose.model("Portfolio", PortfolioSchema);


