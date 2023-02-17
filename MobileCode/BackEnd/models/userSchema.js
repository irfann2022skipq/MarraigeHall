const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
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
        type: String,
    },
    phone_no:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    noti_token:{
        type: String,
    },
    notifications:[
        {
            title: String,
            description: String,
            date: Date,
        }
    ],
    role:{
        type: String
    },
    fav_companies:[
        {type: mongoose.Schema.Types.ObjectId, ref:'Company'}
    ],
    orders:[
        {type: mongoose.Schema.Types.ObjectId, ref:'Order'}
    ]
    
});

const  User = mongoose.model('User', userSchema)
module.exports = User

