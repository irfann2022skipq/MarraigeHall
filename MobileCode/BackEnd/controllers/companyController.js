const User = require('../models/userSchema')
const Company = require('../models/companySchema')
const Vendor = require('../models/vendorSchema')
const Order = require('../models/orderSchema')
const CvOrder = require('../models/cvOrderSchema')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET = '494898./yu!$^63df!vcxfv3278dhgdjsbv3i823'

//sign up
const signUp = async (req,res)=>{

    const {password : orignalPassword} = req.body

    if(orignalPassword.length<5){
        return res.json({
            status:'error',
            error: 'Password should be atleast 5 characters'
        })}
    
    const password = await bcrypt.hash(orignalPassword,10)
    Company.create({
            company_name: req.body.company_name,
            email: req.body.email,
            password: password,
            phone_no: req.body.phone_no,
            city: req.body.city,
            image: '0',
            services: req.body.services,
            price_range: req.body.price_range,
            address: req.body.address,
            available_hours:req.body.available_hours,
            cancelled_orders: 0,
            noti_token: '',
            role: 'company',
            rating_list:[],
            rating: 0,
            booked_dates: [],
            orders: []
        },
        (err,company)=>{
            if(err){
                console.log('error in signup')
                return res.json({status: 'error',error: 'error in signup'})
            }
           return res.json({status: 'ok'})
        })
}


//log in
const logIn = async (req,res)=>{
    const {email,password} = req.body
    
    const company = await Company.findOne({email}).lean()

    if(!company){
        return res.json({status:"error", error : 'Invalid username/password'})
    }

    if(await bcrypt.compare(password,company.password)){

        const token = jwt.sign({
            id : company._id, role: company.role
        },
        JWT_SECRET
        )
        const new_company = await Company.findByIdAndUpdate({_id:company._id},{noti_token:req.body.noti_token},{new:true});
        
        if(new_company){
            return res.json({status:"ok", token : token, data: new_company})
        }
     
        return res.json({status:"error", msg:"token not set"})
    }

    return res.json({status:"error", error : 'Invalid username/password'})

}




//search Vendor
const searchVendor = async (req,res)=>{

      
    //case sensitive
    const {search_text} = req.body
    
    var Mycity
    const company = await Company.findById({_id: req.user.id})

    if(req.body.city === '' || req.body.city === undefined){
        Mycity=company.city
    }else{
        Mycity=req.body.city
    }

    console.log(Mycity)

     Vendor.find({"vendor_name" : {$regex : search_text }, "city": Mycity,verified:true},(err,vendors)=>{
        if(vendors){
            
            const result = []
                     for(i of vendors){ //getting whole objects
                                    var count = 0

                                    for (date of i.booked_dates){ //getting dates from array
                                        if(date === req.body.date)
                                        {
                                            count+=1
                                        }
                                    }

                                    console.log(count)
                                    if(count<=2){ //3 allowed
                                      result.push(i)
                                    }

                    }

                       
                return res.json({status: 'ok',data:result})
        
        
        }
        return res.json({status: 'error',error: 'error in search vendor by name'})
    })

   

}



//searchByDate
const searchByDate = async (req,res)=>{

    var Mycity
    const company = await Company.findById({_id: req.user.id})

    if(req.body.city === '' || req.body.city === undefined){
        Mycity=company.city
    }else{
        Mycity=req.body.city
    }

    console.log(Mycity)

    Vendor.find({city: Mycity,verified:true}, (err,vendors)=>{
        if(vendors){

            const result = []
                     for(i of vendors){ //getting whole objects
                                    var count = 0

                                    for (date of i.booked_dates){ //getting dates from array
                                        if(date === req.body.date)
                                        {
                                            count+=1
                                        }
                                    }

                                    // console.log(count)
                                    if(count<=2){ //3 allowed
                                      result.push(i)
                                    }

                    }

                       console.log(result)
                return res.json({status: 'ok',data:result})
        
        
        }
        return res.json({status: 'error',error: 'error in search vendors by dates'})
    }).sort({cancelled_orders:1})

}

//caterers
const caterers = async (req,res)=>{

    console.log(req.body.date)

   var Mycity
    const company = await Company.findById({_id: req.user.id})

    if(req.body.city === '' || req.body.city === undefined){
        Mycity=company.city
    }else{
        Mycity=req.body.city
    }

    console.log(Mycity)


     Vendor.find({city: Mycity, service: "Caterer",verified:true},(err,vendors)=>{
        if(vendors){
            
            const result = []
                     for(i of vendors){ //getting whole objects
                                    var count = 0

                                    for (date of i.booked_dates){ //getting dates from array
                                        if(date === req.body.date)
                                        {
                                            count+=1
                                        }
                                    }

                                    //console.log(count)
                                    if(count<=2){ //3 allowed
                                      result.push(i)
                                    }

                    }                       
                return res.json({status: 'ok',data:result})
        }
        return res.json({status: 'error',error: 'error in search vendor'})

    }).sort({cancelled_orders:1})


}


//decoration
const decoration = async (req,res)=>{
    console.log(req.body.date)

    var Mycity
     const company = await Company.findById({_id: req.user.id})
 
     if(req.body.city === '' || req.body.city === undefined){
         Mycity=company.city
     }else{
         Mycity=req.body.city
     }
 
     console.log(Mycity)
 
 
      Vendor.find({city: Mycity, service: "Decoration",verified:true},(err,vendors)=>{
         if(vendors){
             
             const result = []
                      for(i of vendors){ //getting whole objects
                                     var count = 0
 
                                     for (date of i.booked_dates){ //getting dates from array
                                         if(date === req.body.date)
                                         {
                                             count+=1
                                         }
                                     }
 
                                     //console.log(count)
                                     if(count<=2){ //3 allowed
                                       result.push(i)
                                     }
 
                     }                       
                 return res.json({status: 'ok',data:result})
         }
         return res.json({status: 'error',error: 'error in search vendor'})
 
     }).sort({cancelled_orders:1})
 
}


//venue
const venue = async (req,res)=>{
    console.log(req.body.date)

    var Mycity
     const company = await Company.findById({_id: req.user.id})
 
     if(req.body.city === '' || req.body.city === undefined){
         Mycity=company.city
     }else{
         Mycity=req.body.city
     }
 
     console.log(Mycity)
 
 
      Vendor.find({city: Mycity, service: "Venue",verified:true},(err,vendors)=>{
         if(vendors){
             
             const result = []
                      for(i of vendors){ //getting whole objects
                                     var count = 0
 
                                     for (date of i.booked_dates){ //getting dates from array
                                         if(date === req.body.date)
                                         {
                                             count+=1
                                         }
                                     }
 
                                     //console.log(count)
                                     if(count<=2){ //3 allowed
                                       result.push(i)
                                     }
 
                     }                       
                 return res.json({status: 'ok',data:result})
         }
         return res.json({status: 'error',error: 'error in search vendor'})
 
     }).sort({cancelled_orders:1})
 
}


//photographers
const photographers = async (req,res)=>{
    console.log(req.body.date)

    var Mycity
     const company = await Company.findById({_id: req.user.id})
 
     if(req.body.city === '' || req.body.city === undefined){
         Mycity=company.city
     }else{
         Mycity=req.body.city
     }
 
     console.log(Mycity)
 
 
      Vendor.find({city: Mycity, service: "Photography",verified:true},(err,vendors)=>{
         if(vendors){
             
             const result = []
                      for(i of vendors){ //getting whole objects
                                     var count = 0
 
                                     for (date of i.booked_dates){ //getting dates from array
                                         if(date === req.body.date)
                                         {
                                             count+=1
                                         }
                                     }
 
                                     //console.log(count)
                                     if(count<=2){ //3 allowed
                                       result.push(i)
                                     }
 
                     }                       
                 return res.json({status: 'ok',data:result})
         }
         return res.json({status: 'error',error: 'error in search vendor'})
 
     }).sort({cancelled_orders:1})
 
}


//create Order
const createCatererOrder = async (req,res)=>{

    const v_id = req.body.v_id
     
    Order.findById(req.body.o_id,async (err,order)=>{
        if(err){
                  return res.json({status:'error',error: 'cant find order'})
                }
        else{
                  const company = await Company.findById({_id: req.user.id})
                  const vendor = await Vendor.findById({_id: v_id})

                  CvOrder.create({
                            company_id: company._id,
                            company_name: company.company_name, 
                            vendor_id: vendor._id,
                            vendor_name: vendor.vendor_name,
                            image: vendor.image,
                            order_id:order._id,
                            city: company.city,
                            c_phone_no: company.phone_no,
                            v_phone_no: vendor.phone_no,
                            event_type: order.event_type,  
                            date: order.date,
                            compDate: order.compDate,              
                            no_of_guests: req.body.no_of_guests, 
                            available_budget: req.body.available_budget,
                            required_service: vendor.service,
                            special_instructions: req.body.special_instructions,

                            location: req.body.location,
                            time: req.body.time,
                            menu: req.body.menu


                        },(err,cv_order)=>{
                            if(err){
                               console.log('error in order creation')
                               //console.log(err)
                                return res.json({status: 'error',error: err})
                            }

                                Order.findOneAndUpdate ({_id: req.body.o_id},{ $push: { sub_orders: cv_order._id } },(err,updated_order)=>{
                                    if (updated_order)
                                    {
                                        console.log("good")
                                       
                                    }else{
                                        console.log(err)
                                        console.log("error in order sub_order id")
                                    }
                                    
                                  
                                })

                                Vendor.findOneAndUpdate ({_id: v_id},{ $push: { orders: cv_order._id, booked_dates: cv_order.date }},(err,updated_vendor)=>{
                                    if (updated_vendor)
                                    {
                                        console.log("best")
                                        
                                    }else{
                                        console.log(err)
                                        console.log("error in vendor book dates")
                                    }
                                    
                                })

                            return res.json({status: 'ok'})
                    })
    
    }
    })
}


//Decoration Order

const createDecorationOrder = async (req,res)=>{

    const v_id = req.body.v_id
     
    Order.findById(req.body.o_id,async (err,order)=>{
        if(err){
                  return res.json({status:'error',error: 'cant find order'})
                }
        else{
                  const company = await Company.findById({_id: req.user.id})
                  const vendor = await Vendor.findById({_id: v_id})

                  CvOrder.create({
                    company_id: company._id,
                    company_name: company.company_name, 
                    vendor_id: vendor._id,
                    vendor_name: vendor.vendor_name,
                    image: vendor.image,
                    order_id:order._id,
                    city: company.city,
                    c_phone_no: company.phone_no,
                    v_phone_no: vendor.phone_no,
                    event_type: order.event_type,  
                    date: order.date,
                    compDate: order.compDate,              
                    no_of_guests: req.body.no_of_guests, 
                    available_budget: req.body.available_budget,
                    required_service: vendor.service,
                    special_instructions: req.body.special_instructions,

                
                    location: req.body.location_address,
                    location_details: req.body.location_details,
                    decor_theme_detail: req.body.decor_theme_detail,
                    time: req.body.time


                        },(err,cv_order)=>{
                            if(err){
                                console.log('error in order creation')
                                return res.json({status: 'error',error: err})
                            }

                                Order.findOneAndUpdate ({_id: req.body.o_id},{ $push: { sub_orders: cv_order._id } },(err,updated_order)=>{
                                    if (updated_order)
                                    {
                                        console.log("good")
                                       
                                    }else{
                                        console.log(err)
                                        console.log("error in order sub_order id")
                                    }
                                    
                                  
                                })

                                Vendor.findOneAndUpdate ({_id: v_id},{ $push: { orders: cv_order._id, booked_dates: cv_order.date }},(err,updated_vendor)=>{
                                    if (updated_vendor)
                                    {
                                        console.log("best")
                                        
                                    }else{
                                        console.log(err)
                                        console.log("error in vendor book dates")
                                    }
                                    
                                })

                            return res.json({status: 'ok'})
                    })
    
    }
    })
}


//Venue Order
const createVenueOrder = async (req,res)=>{

    const v_id = req.body.v_id
     
    Order.findById(req.body.o_id,async (err,order)=>{
        if(err){
                  return res.json({status:'error',error: 'cant find order'})
                }
        else{
                  const company = await Company.findById({_id: req.user.id})
                  const vendor = await Vendor.findById({_id: v_id})

                  CvOrder.create({
                            company_id: company._id,
                            company_name: company.company_name, 
                            vendor_id: vendor._id,
                            vendor_name: vendor.vendor_name,
                            image: vendor.image,
                            order_id:order._id,
                            city: company.city,
                            c_phone_no: company.phone_no,
                            v_phone_no: vendor.phone_no,
                            event_type: order.event_type,  
                            date: order.date,
                            compDate: order.compDate,              
                            no_of_guests: req.body.no_of_guests, 
                            available_budget: req.body.available_budget,
                            required_service: vendor.service,
                            special_instructions: req.body.special_instructions,


                            start_time: req.body.start_time,
                            end_time: req.body.end_time,
                            venue_catering: req.body.venue_catering,
                            venue_decor: req.body.venue_decor,
                            menu: req.body.menu,
                            decor_theme_detail: req.body.decor_theme_detail

                           
                        },(err,cv_order)=>{
                            if(err){
                                console.log('error in order creation')
                                return res.json({status: 'error',error: err})
                            }

                                Order.findOneAndUpdate ({_id: req.body.o_id},{ $push: { sub_orders: cv_order._id } },(err,updated_order)=>{
                                    if (updated_order)
                                    {
                                        console.log("good")
                                       
                                    }else{
                                        console.log(err)
                                        console.log("error in order sub_order id")
                                    }
                                    
                                  
                                })

                                Vendor.findOneAndUpdate ({_id: v_id},{ $push: { orders: cv_order._id, booked_dates: cv_order.date }},(err,updated_vendor)=>{
                                    if (updated_vendor)
                                    {
                                        console.log("best")
                                        
                                    }else{
                                        console.log(err)
                                        console.log("error in vendor book dates")
                                    }
                                    
                                })

                            return res.json({status: 'ok'})
                    })
    
    }
    })
}


//Photographer Order
const createPhotographerOrder = async (req,res)=>{

    const v_id = req.body.v_id
     
    Order.findById(req.body.o_id,async (err,order)=>{
        if(err){
                  return res.json({status:'error',error: 'cant find order'})
                }
        else{
                  const company = await Company.findById({_id: req.user.id})
                  const vendor = await Vendor.findById({_id: v_id})

                  CvOrder.create({
                           company_id: company._id,
                            company_name: company.company_name, 
                            vendor_id: vendor._id,
                            vendor_name: vendor.vendor_name,
                            image: vendor.image,
                            order_id:order._id,
                            city: company.city,
                            c_phone_no: company.phone_no,
                            v_phone_no: vendor.phone_no,
                            event_type: order.event_type,  
                            date: order.date,
                            compDate: order.compDate,       
                            no_of_guests: order.no_of_guests,       
                            available_budget: req.body.available_budget,
                            required_service: vendor.service,
                            special_instructions: req.body.special_instructions,

                            session_time: req.body.session_time,
                            location: req.body.location,
                            time: req.body.time,
                            shoot_type: req.body.shoot_type



                        },(err,cv_order)=>{
                            if(err){
                                //console.log('error in order creation')
                                console.log(err)
                                return res.json({status: 'error',error: err})
                            }

                                Order.findOneAndUpdate ({_id: req.body.o_id},{ $push: { sub_orders: cv_order._id } },(err,updated_order)=>{
                                    if (updated_order)
                                    {
                                        console.log("good")
                                       
                                    }else{
                                        console.log(err)
                                        console.log("error in order sub_order id")
                                    }
                                    
                                  
                                })

                                Vendor.findOneAndUpdate ({_id: v_id},{ $push: { orders: cv_order._id, booked_dates: cv_order.date }},(err,updated_vendor)=>{
                                    if (updated_vendor)
                                    {
                                        console.log("best")
                                        
                                    }else{
                                        console.log(err)
                                        console.log("error in vendor book dates")
                                    }
                                    
                                })

                            return res.json({status: 'ok'})
                    })
    
    }
    })
}





//rate Vendor
const rateVendor = async (req,res)=>{
  //console.log(req.body)
  const {o_id,v_id, order_rating} = req.body
  const vendor = await Vendor.findByIdAndUpdate(v_id, {$push: { rating_list : order_rating } })

  CvOrder.findByIdAndUpdate(o_id,{$set:{rated:'yes'}},(err,order)=>{
    console.log(order.rated)
})

  var sum = 0;
  const list = vendor.rating_list
  for(i of list){
      sum +=i
  }
  const avg = sum/list.length
  
  Vendor.findByIdAndUpdate(vendor._id,{$set:{rating:avg}},{
      new:true
  },(err,vendor)=>{
      if(err){
          return res.json({status:"error",err})
      }
      return res.json({status:"ok",vendor})
  })
}



//update Profile
const updateProfile = async (req,res)=>{



    Company.findByIdAndUpdate(req.user.id,{
        company_name: req.body.company_name,
        email: req.body.email,
        image: req.body.image,
        phone_no: req.body.phone_no,
        city: req.body.city,
        price_range: req.body.price_range,
        address: req.body.address,
        available_hours: req.body.available_hours

    },
    {
        new:true
    },
    (err,company)=>{
        if(company){
            console.log(company)
            return res.json({status:'ok', data:company})
        }
        return res.json({status:'error', error:err})
    }
    )


}


//change Password
const changePassword = async (req,res)=>{
console.log('enters')
    const {old_password,new_password: new_orignal_password} = req.body
        
        const company = await Company.findById(req.user.id)
        if(await bcrypt.compare(old_password,company.password)){

            console.log("old pass correct")
                if(new_orignal_password.length<5){
                    return res.json({status:'error', error: 'Password should be atleast 5 characters' })
                }

                const new_password = await bcrypt.hash(new_orignal_password,10)

                Company.findByIdAndUpdate(req.user.id,
                    {password: new_password},
                    {
                        new:true
                    },
                    (err,company)=>{
                    if(company){
                    //    console.log(company)
                        return res.json({status:'ok'})
                    }
                    return res.json({status:'error', error: 'company password not updated, Try again',err })
                })

        }else{
            return res.json({status:'error', error: 'Old Password is not correct' })
        }

}




//rec orders
const rec_Orders = async (req,res)=>{

    Company.findOne({_id: req.user.id},{orders:1,_id:0},async (err,orders)=>{

            try {
                    const my_orders =  orders.orders.map(async(o_id)=>{
                        const order = await Order.findOne({_id:o_id,status:'Pending'})
                        return order
                    })
                    
                    Promise.all(my_orders).then((my_orders)=>{
                        // console.log(my_orders)
                        res.json({status:"ok",data : my_orders})
                    })
                    
            } catch (error) {
                
                    return res.json({status:"Error",error})
                    // console.log(error)
            }      
})

}




//approve order
const approveOrder = async (req,res)=>{

    console.log(req.body.o_id)
        try {
                        await Order.updateOne({_id : req.body.o_id},{$set:{status:"Approved"}})

                        Order.findById(req.body.o_id,(err,approved_order)=>{
                            if(err){
                                res.json({status:"error",err})
                            }
                            console.log(approved_order)
                            res.json({status:"ok",data : approved_order})
                        })


        }catch (error) {

            console.log(error)
        }
}


//reject order
const rejectOrder = async (req,res)=>{

    let index=0;
    const o_id = req.body.o_id
    console.log(o_id)
        try {
                 Order.findById(o_id,async(err,order)=>{
                
                  
                        User.find({_id:order.customer_id},{orders:1,_id:0},async (err,orders_array)=>{
                           
                                    for(i of orders_array){
                                            for (id of i.orders){
                                                        if(id == o_id ){
                                                            User.findByIdAndUpdate({_id:order.customer_id},{$pull: { orders: o_id }},
                                                                {
                                                                    new:true
                                                                },(err,order)=>{
                                                                    if(order){
                                                                    console.log('user updated')
                                                                    }else{
                                                                        console.log('user not updated')
                                                                    }
                                                                
                                                                })
                                                        }
                                            }
                                    }
                        })



                        Company.find({_id:order.company_id},{orders:1,booked_dates:1,_id:0},async (err,array)=>{
                            
                            for(i of array){
                                
                                    for (id of i.orders){
                                        if(id == o_id ){
                                           
                                            Company.findByIdAndUpdate({_id:order.company_id},{$pull: { orders: o_id }},
                                                {
                                                    new:true
                                                },(err,order)=>{
                                                    if(order){
                                                    console.log('company order updated')
                                                    }else{
                                                        console.log('company order not updated')
                                                    }
                                                
                                                })
                                        }
                                    }

                                    for(date of i.booked_dates){
                                        //console.log(date,order.date) 
                                        if(date === order.date ){
                                           
                                                Company.findOne({_id:order.company_id},
                                                    (err,company)=>{
                                                        if(company){
                                                            company.booked_dates.splice(index,1)
                                                            company.save()
                                                            console.log('company date updated',company)
                                                            }else{
                                                                console.log('company date not updated')
                                                            }
                                                    
                                                    })

                                                    break
                                        }
                                        index++
                                    }

                            }
                           

                        })


                        Order.findByIdAndDelete({_id : o_id},(err,order)=>{
                            if(err){
                                res.json({status:"error",err})
                            }
                            console.log('order deleted successfully')
                            res.json({status:"ok"})
                        })

    
                    })

        }catch (error) {

            console.log(error)
        }
}



//my orders
const myOrders = async (req,res)=>{

    Company.findOne({_id: req.user.id},{orders:1,_id:0},async (err,orders)=>{

            try {
                    const my_orders =  orders.orders.map(async(o_id)=>{
                        const order = await Order.findOne({_id:o_id,status:'Approved'})
                        return order
                    })
                    
                    Promise.all(my_orders).then((my_orders)=>{
                        res.json({status:"ok",data : my_orders})
                    })
                    
            } catch (error) {
                
                    return res.json({status:"Error",error})
            }      
})

}


//cancel Order
const cancelOrder = async (req,res)=>{

    let v_index=0,c_index=0
    const o_id = req.body.o_id
    console.log('cancel order',o_id)
        try {
                 Order.findById(o_id,async(err,order)=>{
                
     
                                    for(so_id of order.sub_orders){


                                        CvOrder.findById(so_id,(err,sub_order)=>{
                                          
                                                                Vendor.find({_id:sub_order.vendor_id},{orders:1,booked_dates:1,_id:0},async (err,array)=>{
                                                    
                                                                    for(i of array){
                                                                        
                                                                            for (id of i.orders){
                                                                                
                                                                                if(id.equals(so_id )){
                                                                                    console.log('incompare')
                                                                                    Vendor.findOneAndUpdate({_id:sub_order.vendor_id},{$pull: { orders: so_id  }},
                                                                                        {
                                                                                            new:true
                                                                                        },(err,order)=>{
                                                                                            if(order){
                                                                                            console.log('vendor orders updated')
                                                                                            }else{
                                                                                                console.log('vendor orders not updated')
                                                                                            }
                                                                                        
                                                                                        })
                                                                                        break
                                                                                }
                                                                            }
                                        
                                                                            for(date of i.booked_dates){
                                                                                console.log('compare',date,sub_order.date) 
                                                                                if(date === sub_order.date ){
                                                                                
                                                                                    Vendor.findOne({_id:sub_order.vendor_id},
                                                                                        (err,vendor)=>{
                                                                                                if(vendor){
                                                                                                vendor.booked_dates.splice(v_index,1)
                                                                                                vendor.save()
                                                                                                console.log('vendor date updated',vendor)
                                                                                                }else{
                                                                                                    console.log('vendor date not updated')
                                                                                                }
                                                                                            
                                                                                            })
                                                                                            break;
                                                                                }
                                                                                v_index++
                                                                            }
                                        
                                                                    }
                                                                
                                        
                                                                })

                                                                
                                                            })
                                        
                                                        

                                        CvOrder.updateOne({_id : so_id},{$set:{status:"Cancelled"}},
                                            {new:true},(err,cancelled_order)=>{
                                                if(err){
                                                    // res.json({status:"error",err})
                                                    console.log('sub order not cancelled')
                                                }
                                                console.log('sub order cancelled')
                                                // res.json({status:"ok"})
                                            })
                                                        
                                     }
                        



                  //noti to customer that order is cancelled remaining
                        User.find({_id:order.customer_id},{orders:1,_id:0},async (err,orders_array)=>{
                           
                                    for(i of orders_array){
                                            for (id of i.orders){
                                                        if(id == o_id ){
                                                            User.findByIdAndUpdate({_id:order.customer_id},{$pull: { orders: o_id }},
                                                                {
                                                                    new:true
                                                                },(err,order)=>{
                                                                    if(order){
                                                                    console.log('user updated')
                                                                    }else{
                                                                        console.log('user not updated')
                                                                    }
                                                                
                                                                })
                                                        }
                                            }
                                    }
                        })



                        Company.find({_id:order.company_id},{orders:1,booked_dates:1,_id:0},async (err,array)=>{
                            
                            for(i of array){

                                    for (id of i.orders){
                                        if(id == o_id ){
                                           
                                            Company.findByIdAndUpdate({_id:order.company_id},{$pull: { orders: o_id }},
                                                {
                                                    new:true
                                                },(err,order)=>{
                                                    if(order){
                                                    console.log('company order updated')
                                                    }else{
                                                        console.log('company order not updated')
                                                    }
                                                
                                                })
                                        }
                                    }

                                    for(date of i.booked_dates){
                                        //console.log(date,order.date) 
                                        console.log('c_index',c_index)
                                        if(date === order.date ){
                                           
                                                Company.findOne({_id:order.company_id},
                                                    (err,company)=>{
                                                        if(company){
                                                            console.log(c_index,'found company',company)
                                                            company.booked_dates.splice(c_index,1)
                                                            company.save()
                                                            console.log('company date updated',company)
                                                            }else{
                                                                console.log('company date not updated')
                                                            }
                                                    
                                                    })

                                                    break
                                        }
                                        c_index++
                                    }

                            }
                           

                        })

                        Company.findByIdAndUpdate({_id:order.company_id},{$inc:{cancelled_orders: 1},$push:{rating_list:0}},
                        {new:true},async (err,company)=>{
                            if(err){
                                console.log(error)
                            }else{
                            console.log('success',company)
                            }
                        })



                        Order.updateOne({_id : req.body.o_id},{$set:{status:"Cancelled"}},
                        {new:true},(err,cancelled_order)=>{
                            if(err){
                                res.json({status:"error",err})
                            }
                            console.log(cancelled_order)
                            res.json({status:"ok"})
                        })

                       

    
                    })

        }catch (error) {

            console.log(error)
        }



}

const checkSubComplete = (req,res)=>{

    let count=0,bool;
    const o_id = req.body.o_id
    console.log('check sub orders',o_id)

    Order.findById(o_id,async(err,order)=>{
                bool=true
    if(order.sub_orders.length>0){     
        for(so_id of order.sub_orders){
            
            CvOrder.findById(so_id,(err,sub_order)=>{
                count++
                if(sub_order.status !=='Completed'){
                    bool=false
                }
                console.log(count,bool,order.sub_orders.length)

                if(count==order.sub_orders.length && bool==true){
                    console.log('final',count,bool)
                    return res.json({status:"ok"})
                }
                else if(count==order.sub_orders.length && bool==false){
                    return res.json({status:"Error",error:"vendor orders not completed yet"})
                }
        
        
            })
               
           
        }

    }else{
        return res.json({status:"ok"})
    }
        
       
    })

}

//complete Order
const completeOrder = async (req,res)=>{
    let v_index=0,c_index=0,bool
    const o_id = req.body.o_id
    console.log('complete order',o_id)
        try {

            Order.findById(o_id,async(err,order)=>{

                if(order.compDate<new Date()){

                  //noti to customer that order is cancelled remaining
                        User.find({_id:order.customer_id},{orders:1,_id:0},async (err,orders_array)=>{
                           
                                    for(i of orders_array){
                                            for (id of i.orders){
                                                        if(id == o_id ){
                                                            User.findByIdAndUpdate({_id:order.customer_id},{$pull: { orders: o_id }},
                                                                {
                                                                    new:true
                                                                },(err,order)=>{
                                                                    if(order){
                                                                    console.log('user updated')
                                                                    }else{
                                                                        console.log('user not updated')
                                                                    }
                                                                
                                                                })
                                                        }
                                            }
                                    }
                        })



                        Company.find({_id:order.company_id},{orders:1,booked_dates:1,_id:0},async (err,array)=>{
                            
                            for(i of array){

                                    for (id of i.orders){
                                        if(id == o_id ){
                                           
                                            Company.findByIdAndUpdate({_id:order.company_id},{$pull: { orders: o_id }},
                                                {
                                                    new:true
                                                },(err,order)=>{
                                                    if(order){
                                                    console.log('company order updated')
                                                    }else{
                                                        console.log('company order not updated')
                                                    }
                                                
                                                })
                                        }
                                    }

                                    for(date of i.booked_dates){
                                        //console.log(date,order.date) 
                                        console.log('c_index',c_index)
                                        if(date === order.date ){
                                           
                                                Company.findOne({_id:order.company_id},
                                                    (err,company)=>{
                                                        if(company){
                                                            console.log(c_index,'found company',company)
                                                            company.booked_dates.splice(c_index,1)
                                                            company.save()
                                                            console.log('company date updated',company)
                                                            }else{
                                                                console.log('company date not updated')
                                                            }
                                                    
                                                    })

                                                    break
                                        }
                                        c_index++
                                    }

                            }
                           

                        })



                        Order.updateOne({_id : req.body.o_id},{$set:{status:"Completed"}},
                        {new:true},(err,completed_order)=>{
                            if(err){
                                res.json({status:"error",err})
                            }
                            // console.log(completed_order)
                            res.json({status:"ok"})
                        })


                }else{
                        res.json({status:"date-error"})
                      }

            })


        }catch (error) {

            console.log(error)
        }





}



const showHiredVendors =async (req,res)=>{

    Order.findOne({_id: req.body.o_id},{sub_orders:1,_id:0},async (err,sub_orders)=>{

                
        try {
                const hired_vendors =  sub_orders.sub_orders.map(async (o_id)=>{
                    const vendor = await CvOrder.findById(o_id)
                    
                    return vendor
                })
                
                Promise.all(hired_vendors).then((hired_vendors)=>{
                    console.log('wapis',hired_vendors)
                    res.json({status:"ok",data : hired_vendors})
                })
                
        } catch (error) {
            
                return res.json({status:"Error",error})
        }
    
})
}


const cancelVendorOrder =async (req,res)=>{

    let index=0
    const o_id = req.body.o_id
    console.log(o_id)
        try {
                 CvOrder.findById(o_id,async(err,order)=>{
                
                  
                        Order.find({_id:order.order_id},{sub_orders:1,_id:0},async (err,sub_orders_array)=>{
                           
                                    for(i of sub_orders_array){
                                            for (id of i.sub_orders){
                                                        if(id == o_id ){
                                                            Order.findByIdAndUpdate({_id:order.order_id},{$pull: { sub_orders: o_id }},
                                                                {
                                                                    new:true
                                                                },(err,order)=>{
                                                                    if(order){
                                                                    console.log('company suborder updated')
                                                                    }else{
                                                                        console.log('company suborder not updated')
                                                                    }
                                                                
                                                                })
                                                        }
                                            }
                                    }
                        })



                        Vendor.find({_id:order.vendor_id},{orders:1,booked_dates:1,_id:0},async (err,array)=>{
                            
                            for(i of array){
                                
                                    for (id of i.orders){
                                        if(id == o_id ){
                                           
                                            Vendor.findByIdAndUpdate({_id:order.vendor_id},{$pull: { orders: o_id }},
                                                {
                                                    new:true
                                                },(err,order)=>{
                                                    if(order){
                                                    console.log('vendor orders updated')
                                                    }else{
                                                        console.log('vendor orders not updated')
                                                    }
                                                
                                                })
                                        }
                                    }

                                    for(date of i.booked_dates){
                                        //console.log(date,order.date) 
                                        if(date === order.date ){
                                          
                                            Vendor.findOne({_id:order.vendor_id},
                                                   (err,vendor)=>{
                                                        if(vendor){
                                                        vendor.booked_dates.splice(index,1)
                                                        vendor.save()
                                                        console.log('vendor date updated',vendor)
                                                        }else{
                                                            console.log('vendor date not updated')
                                                        }
                                                    
                                                    })
                                                    break;
                                        }
                                        index++
                                    }

                            }
                           

                        })



                        CvOrder.updateOne({_id : req.body.o_id},{$set:{status:"Cancelled"}},
                        {new:true},(err,cancelled_order)=>{
                            if(err){
                                res.json({status:"error",err})
                            }
                            console.log(cancelled_order)
                            res.json({status:"ok"})
                        })

                       

    
                    })

        }catch (error) {

            console.log(error)
        }

}

const completedOrders = async (req,res)=>{

   
    try {
           Order.find({company_id:req.user.id,status:'Completed'},(err,array)=>{
                if(array){
                    res.json({status:"ok",data : array})
                }else{
                    return res.json({status:"Error",err})
                }
               
           }).sort({compDate:-1})
                
            
               
           
    } catch (error) {
        
            return res.json({status:"Error",error})
    }

}

const orderCreateNoti = async (req,res)=>{

    try {
      
        Company.findByIdAndUpdate({_id:req.body.c_id},{$push: { notifications : {'title': req.body.title, 'description': req.body.body, 'date': req.body.compDate}}},async(err,company)=>{
            if(company){
                res.json({status:"ok"})
            }else{
                return res.json({status:"Error",err})
            }
        })
        
    } catch (error) {
        return res.json({status:"Error",error})
    }

  
}

const getNotiData = async (req,res)=>{

    try {
        Company.findOne({_id: req.user.id},{notifications:1,_id:0},async (err,array)=>{
        if(array){
            return res.json({status:"ok", data:array})
        }
        return res.json({status:"Error",error})

        })

        
    } catch (error) {
        return res.json({status:"Error",error})
    }
}


module.exports = {signUp,logIn,rec_Orders,approveOrder,updateProfile,changePassword,createCatererOrder,getNotiData,
                  createDecorationOrder,createVenueOrder,cancelOrder,cancelVendorOrder,createPhotographerOrder,
                  rateVendor,searchVendor,searchByDate,caterers,decoration,venue,photographers,myOrders,rejectOrder,
                  showHiredVendors,completeOrder,checkSubComplete,completedOrders,orderCreateNoti}