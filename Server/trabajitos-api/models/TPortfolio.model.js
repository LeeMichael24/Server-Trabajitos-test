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
    images: {
        type: [String],
        default: []
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }, 
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    reviews: [{ 
        type: Schema.Types.ObjectId,
        ref: "Review"
    }]
});


module.exports = Mongoose.model("Portfolio", portfolioSchema);


