const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    admin_name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    image:{
        type: String
    },
    phone_no:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    role:{
        type: String
    },
    
    
});

const  Admin = mongoose.model('Admin', adminSchema)
module.exports = Admin

