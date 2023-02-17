const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
    company_name:{
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
    phone_no:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    services:{
        type: String,
        required: true
    },
    price_range:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    available_hours:{
        type: String,
        required: true
    },
    role:{
        type: String
    },
    image:{
        type: String,
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
    verified:{
        type: Boolean,
        default:false
    },
    cancelled_orders:{
        type: Number
    },
    rating_list:[Number],

    rating:{ type: Number},

    booked_dates:[String],
    
    orders:[ 
        {  type: mongoose.Schema.Types.ObjectId, ref:'Order' }
    ]
});

const  Company = mongoose.model('Company', companySchema)
module.exports = Company

