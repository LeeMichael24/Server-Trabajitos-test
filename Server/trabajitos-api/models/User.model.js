const Mongoose = require ("mongoose");
const Schema = Mongoose.Schema;
const debug = require ("debug")("app:user-model");

const crypto = require("crypto");

// email
const userSchema = new Schema({
    name: {
        type: String,
        trim : true,
        required : true
    },
    email: {
        type: String,
        required : true,
        trim : true,
        unique: true
    },
    username :{
        type: String,
        required : true,
        trim : true,
        unique: true
    },
    hashedpassword: {
        type: String,
        required : true
    },
    salt: {
        type:String
    },
    tokens: {
        type: [String],
        default: []
    },
    roles : {
        type: [String],
        default : []
    }
}, {timestamps : true });
//timestamp es para que se guarde la fecha de creacion y modificacion del documento en la base de datos
//trim es para que no se guarden espacios en blanco


userSchema.methods ={
    encryptPassword: function (password) {
        if (!password) return "";

        try {
            const ecryptedPassword = crypto.pbkdf2Sync(
                password,
                this.salt,
                1000,64,
                `sha512`
            ).toString("hex");
            return ecryptedPassword;

        } catch (error) {
            debug ({error});
            return "";
            
        }
    },
    makeSalt: function () {
        return crypto.randomBytes(16).toString("hex");
    },
    comparePassword: function(password){
        return this.hashedpassword == this.encryptPassword(password);
    }
}


userSchema.virtual("password")
    .set(function (password = crypto.randomBytes(16).toString()) {
        if (!password)return;

        this.salt = this.makeSalt();
        this.hashedpassword = this.encryptPassword(password);
    })

module.exports = Mongoose.model("User", userSchema);