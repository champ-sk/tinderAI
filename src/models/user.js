const mongoose = require('mongoose');
const validator = require('validator');
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,  
        required: true,
    },
    lastName:{
        type: String,
    },
    age:{
        type: Number,
    },
    emailID:{
        type: String,
        required: true,
        unique: true,
        trim: true , 
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid email address');
            }
        },
    
    },
    password:{
        type: String,   
        required: true,
        validate(value){
            if (validator.isStrongPassword(value, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
                return true;
              } else {
                throw new Error('Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and symbols.');
              } 
        }
    }    ,
    photourl:{
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    skills:{
        type: [String],
    },
    gender:{
        type: String,
        validate(value){
            if(!['Male', 'Female',   'Other'].includes(value)){
                throw new Error('Invalid gender value');
            }
        },
    },

}, { timestamps: true });
const User = mongoose.model('User', userSchema);
module.exports = User;