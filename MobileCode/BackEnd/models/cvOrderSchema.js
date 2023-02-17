const mongoose = require('mongoose')

const cvOrderSchema = new mongoose.Schema({
    company_id :{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    company_name :{
        type: String,
        required: true
    },
    vendor_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    vendor_name:{
        type: String,
        required: true
    },
    image:{
        type: String,
    },
    order_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Order',
        required: true
    },
    city:{
        type: String,
        required: true
    },
    c_phone_no:{
        type: String,
        required: true
    },
    v_phone_no:{
        type: String,
        required: true
    },
    event_type:{
        type: String,
        required: true
    },
    date:{
        //type: Date,
        type: String,
        required: true
    },
    compDate:{
        type: Date,
        required: true
    },
    no_of_guests:{
        type: Number,
        required: true
    },
    available_budget:{
        type: Number,
        required: true
    },
    required_service:{
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Pending'
    },
    special_instructions:{
        type: String
    },
    location:{
        type: String
    },
    time:{
        type: String
    },
    menu:{
        type: String,
    },
    location_details:{
        type: String
    },
    decor_theme_detail:{
        type: String
    },
    start_time:{
        type: String
    },
    end_time:{
        type: String
    },
    venue_catering:{
        type: String
    },
    venue_decor:{
        type: String
    },
    session_time:{
        type: String
    },
    shoot_type:{
        type: String
    },
    rated: {
        type: String,
        default: 'no'
    },
    

});

const  CvOrder = mongoose.model('CvOrder', cvOrderSchema)
module.exports = CvOrder

