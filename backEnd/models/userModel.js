const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxlength: [30, "Name should be less than 30 characters"],
        minlength: [4, "Name should be more than 4 characters"]
    },

    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email-id"],
    },

    password: {
        type: String,
        required: [true, "Please Enter Password"],
        minlength: [8, "Password should be more than 8 characters"],
        select: false
    },

    avatar: {
        public_id:{
            type: String,
            required: true
        },
        url:{
            type: String,
            required: true
        }
    },

    role: {
        type: String,
        default: "user"
    },

    resetPasswordToken: String,

    resetPasswordExpire: Date

});

userSchema.pre("save", async function(next) {

    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password, 10)
})

//JWT Token
userSchema.methods.getJWTToken = function() {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

//Compare Password
userSchema.methods.comparePassword = async function(enterdPassword){
    return await bcrypt.compare(enterdPassword, this.password);
}

//Genrating Password Reset 
userSchema.methods.getResetPasswordToken = function(){

    //Genrating Token
    const resetToken = crypto.randomBytes(20).toString("hex");

    //Hashing and adding to user shema
    this.resetPasswordToken = crypto.createHash("sha256")
    .update(resetToken)
    .digest("hex");

    this .resetPasswordExpire = Date.now() + 15 * 60 * 60 * 1000;

    return resetToken;

}


const User = mongoose.model('User', userSchema);

module.exports = User;