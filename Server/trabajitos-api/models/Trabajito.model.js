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
        ref: "User",
        required: true
    },
    status: {
        type: Schema.Types.ObjectId,
        ref: "Status"
    }
});


module.exports = Mongoose.model("Trabajito", trabajitoSchema);