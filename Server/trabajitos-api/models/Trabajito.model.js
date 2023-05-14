const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;


const TrabajitoSchema = new Schema({
    description: {
        type: String,
        trim: true,
        required: true
    },
    dateInit: {
        type: Date,
        trim: true,
        required: true
    },
    dateFinish: {
        type: Date,
        trim: true,
        required: false
    },
    endNumber: {
        type: String,
        required: false
    },
    hidden: {
        type: Boolean,
        default: false
    },
    state: {
        type: String,
        enum: ["Pendiente", "En proceso", "Finalizado", "Negociación"],
        default: "En proceso"
    },
    
});

/* const ESTADO_EN_PROCESO = 0;
const ESTADO_FINALIZADO = 1;
const ESTADO_TRABAJO_FINALIZADO = 2;


TrabajitoSchema.virtual('estadoStr').get(function() {
    switch (this.estado) {
      case ESTADO_EN_PROCESO:
        return 'en proceso';
      case ESTADO_FINALIZADO:
        return 'finalizado';
      case ESTADO_TRABAJO_FINALIZADO:
        return 'trabajo finalizado';
      default:
        return '';
    }
}); */


module.exports = Mongoose.model("Trabajito", TrabajitoSchema);