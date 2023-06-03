const Mongoose = require ("mongoose");
const Schema = Mongoose.Schema;
const debug = require ("debug")("app:user-model");

const crypto = require("crypto");

const userSchema = new Schema({
    name: {
        type: String,
        trim : true,
        required : true
    },
    phone: {
        type: String,
        trim : true,
        required : true,
    },
    hashedpassword: {
        type: String,
        required : true
    },
    email: {
        type: String,
        trim : true,
        required: true,
        unique: true
    },
    salt: {
        type:String
    },
    token: {
        type: [String],
        default: []
    },
    image: {
        type: String,
        required: false
    },
    hidden: {
        type: Boolean,
        default: false
    },
    municipality: {
        type: Schema.Types.ObjectId,
        ref: "Municipality"
    },
    roles : {
        type: [String],
        default : []
    }
},{timestamps : true });



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