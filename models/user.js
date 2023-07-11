const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, {
    //hear use timestamp .  It is a mongose manager that work is creat and update , 
    // mean --- when a new user creat account by through sing up than at the same time he carat and update his account 
    // and if user all ready sing up so next time when he come he sing in and at this moment he update his account  
    // this all tusk are noted through by useing timestamp when he enter my website
    
    timestamps: true
});


const User = mongoose.model('User', userSchema);

module.exports = User;