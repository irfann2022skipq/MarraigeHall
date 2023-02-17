const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    customer_id :{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    customer_name :{
        type: String,
        required: true
    },
    company_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    company_name:{
        type: String,
        required: true
    },
    image:{
        type: String,
    },
    email:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    u_phone_no:{
        type: String,
        required: true
    },
    c_phone_no:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    compDate:{
        type: Date,
        required: true
    },
    event_type:{
        type: String,
        required: true
    },
    no_of_guests:{
        type: Number,
        required: true
    },
    catering:{
        type: String,
        required: true
    },
    menu:{
        type: String,
    },
    decor:{
        type: String,
        required: true
    },
    decor_theme:{
        type: String,
    },
    photographer:{
        type: String,
        required: true
    },
    photoShoot_details:{
        type: String,
    },
    venue:{
        type: String,
        required: true
    },
    venue_preference:{
        type: String,
    },
    location:{
        type: String,
    },
    start_time:{
        type: String,
        required: true
    },
    event_duration:{
        type: String,
        required: true
    },
    available_budget:{
        type: Number,
        required: true
    },
    special_instructions:{
        type: String,
    },
    status: {
        type: String,
        default: 'Pending'
    },
    rated: {
        type: String,
        default: 'no'
    },
    sub_orders:[
        {type: mongoose.Schema.Types.ObjectId, ref:'CvOrder'}
    ]

});

const  Order = mongoose.model('Order', orderSchema)
module.exports = Order

