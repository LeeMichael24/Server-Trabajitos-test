const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;


const CategorySchema = new Schema({ 
    
    name:{
        type: String,
        trim: true,
        required: true
    },
    image:{
        type: String,
        trim: true
    }
});

module.exports = Mongoose.model("Category", CategorySchema);