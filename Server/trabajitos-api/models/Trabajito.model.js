const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;


const trabajitoSchema = new Schema({
    description: {
        type: String,
        trim: true,
        required: true
    },
    dateInit: {
        type: Date,
        required: true
    },
    dateFinish: {
        type: Date
    },
    endNumber: {
        type: String
    },
    hidden: {
        type: Boolean,
        default: false
    },
    id_solicitor: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    id_hired: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    state: {
        type: Schema.Types.ObjectId,
        ref: "State",
        default: "64703ad8c301c25cdbcd30c7"
    }
});


module.exports = Mongoose.model("Trabajito", trabajitoSchema);