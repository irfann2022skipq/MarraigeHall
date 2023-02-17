const User = require('../models/userSchema')
const Company = require('../models/companySchema')
const Order = require('../models/orderSchema')
const CvOrder = require('../models/cvOrderSchema')
const Vendor = require('../models/vendorSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET = '494898./yu!$^63df!vcxfv3278dhgdjsbv3i823'


//SignUp
const signUp = async (req,res)=>{

const {password : orignalPassword} = req.body

if(orignalPassword.length<5){
    return res.json({
        status:'error',
        error: 'Password should be atleast 5 characters'
    })}

const password = await bcrypt.hash(orignalPassword,10)

await User.create({
        username: req.body.username,
        email: req.body.email,
        password: password,
        image: req.body.image,
        phone_no: req.body.phone_no,
        city: req.body.city,
        noti_token: '',
        role: 'customer',
        orders: []
    },
    (err,user)=>{
        if(err){
            console.log('error in signup')
            return res.json({status: 'error',error: 'error in signup'})
        }
       
       return res.json({status: 'ok'})
    })
}



//login
// const logIn = async(req,res)=>{

//     const {email,password,noti_token} = req.body
    
//     const user = await User.findOne({email}).lean()

//     if(!user){
        
//         return res.json({status:"error", error : 'Invalid username/password'})
        
//     }

//     if(await bcrypt.compare(password,user.password)){

//         const token = await jwt.sign({
//             id : user._id, 
//             role: user.role
//         },
//         JWT_SECRET
//         )
//         return res.json({status:"ok", token : token, data: user})
//     }

//     return res.json({status:"error", error : 'Invalid username/password'})

// }

const logIn = async(req,res)=>{

    const {email,password,noti_token} = req.body
    console.log(req.body)
    
    const user = await User.findOne({email}).lean()

    if(!user){
        
        return res.json({status:"error", error : 'Invalid username1/password'})
        
    }

    if(await bcrypt.compare(password,user.password)){

        const token = await jwt.sign({
            id : user._id, 
            role: user.role
        },
        JWT_SECRET
        )

        
        const new_user = await User.findByIdAndUpdate({_id:user._id},{noti_token:req.body.noti_token},{new:true});
        
        if(new_user){
            return res.json({status:"ok", token : token, data: new_user})
        }
     
        return res.json({status:"error", msg:"token not set"})
    }

    return res.json({status:"error", error : 'Invalid username/password'})

}

// -HOME SCREEN

//search company
const searchCompany = async (req,res)=>{
    
    
    //case sensitive
    const {search_text} = req.body
    
    var Mycity
    const user = await User.findById({_id: req.user.id})

    if(req.body.city === '' || req.body.city === undefined){
        Mycity=user.city
    }else{
        Mycity=req.body.city
    }

    console.log(Mycity)

     Company.find({"company_name" : {$regex : search_text }, "city": Mycity, "verified": true},(err,companies)=>{
        if(companies){
            
            const result = []
                     for(i of companies){ //getting whole objects
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
        return res.json({status: 'error',error: 'error in search company by name'})
    })

   
}


// search by date
const searchByDate = async (req,res)=>{

    var Mycity
    const user = await User.findById({_id: req.user.id})

    if(req.body.city === '' || req.body.city === undefined){
        Mycity=user.city
    }else{
        Mycity=req.body.city
    }

    console.log(Mycity)

    Company.find({city: Mycity,verified:true}, (err,companies)=>{
        if(companies){

            const result = []
                     for(i of companies){ //getting whole objects
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
        return res.json({status: 'error',error: 'error in search company by dates'})
    }).sort({cancelled_orders:1})

}


// //all companies of a city
// const allCompanies = async (req,res)=>{
   
   
//     var Mycity
//     const user = await User.findById({_id: req.user.id})

//     if(req.body.city === '' || req.body.city === undefined){
//         Mycity=user.city
//     }else{
//         Mycity=req.body.city
//     }

//     console.log(Mycity)

    
//      Company.find({city: Mycity},(err,companies)=>{
//         if(companies){
            
//             const result = []
//                      for(i of companies){ //getting whole objects
//                                     var count = 0

//                                     for (date of i.booked_dates){ //getting dates from array
//                                         if(date === req.body.date)
//                                         {
//                                             count+=1
//                                         }
//                                     }

//                                     console.log(count)
//                                     if(count<=2){ //3 allowed
//                                       result.push(i)
//                                     }

//                     }                       
//                 return res.json({status: 'ok',data:result})
//         }
//         return res.json({status: 'error',error: 'error in search company by dates'})
//     })
// }


//top rated
const topRated = async (req,res)=>{
   console.log(req.body.date)

   var Mycity
    const user = await User.findById({_id: req.user.id})

    if(req.body.city === '' || req.body.city === undefined){
        Mycity=user.city
    }else{
        Mycity=req.body.city
    }

    console.log(Mycity)


     Company.find({city: Mycity,verified:true},(err,companies)=>{
        if(companies){
            
            const result = []
                     for(i of companies){ //getting whole objects
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
        return res.json({status: 'error',error: 'error in search company by rating'})

    }).sort({rating:-1})

}

//low price 
const lowPrice = async (req,res)=>{
   
   
    var Mycity
    const user = await User.findById({_id: req.user.id})

    if(req.body.city === '' || req.body.city === undefined){
        Mycity=user.city
    }else{
        Mycity=req.body.city
    }

    console.log(Mycity)

    Company.find({city: Mycity,verified:true},(err,companies)=>{
       if(companies){
           
           const result = []
                    for(i of companies){ //getting whole objects
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
       return res.json({status: 'error',error: 'error in search company by low price'})

   }).sort({price_range:1})

}


// high price
const highPrice = async (req,res)=>{
   
    var Mycity
    const user = await User.findById({_id: req.user.id})

    if(req.body.city === '' || req.body.city === undefined){
        Mycity=user.city
    }else{
        Mycity=req.body.city
    }

    console.log(Mycity)

    Company.find({city: Mycity,verified:true},(err,companies)=>{
       if(companies){
           
           const result = []
                    for(i of companies){ //getting whole objects
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
       return res.json({status: 'error',error: 'error in search company by low price'})

   }).sort({price_range:-1})
}



// fav companies 
const fav_companies = async (req,res)=>{
   
    var Mycity
    var result = [],totalcount=0
    const user = await User.findById({_id: req.user.id})

    if(req.body.city === '' || req.body.city === undefined){
        Mycity=user.city
    }else{
        Mycity=req.body.city
    }

    console.log(Mycity)

    User.findOne({_id: req.user.id},{fav_companies:1,_id:0},async (err,array)=>{

        try {

            var length = array.fav_companies.length

             for(c_id of array.fav_companies){
                
              
                Company.findOne({_id:c_id,verified:true},(err,company)=>{
                  
                   totalcount++

                     if(company&& company.city == Mycity){
                           
                            var count = 0
                            for (date of company.booked_dates){ 
                                if(date === req.body.date)
                                {
                                    count+=1
                                }
                            }

                            if(count<=2){ 
                            result.push(company)
                            console.log('1',result)
                            }
                    }

                    if(totalcount == length){
                        console.log(result)
                             return res.json({status: 'ok',data:result})
                     }
                    

                })
                
              
             }

             if(length==0){
                return res.json({status: 'ok',data:result})
             }

           

           
            
        } catch (error) {
            
                return res.json({status:"Error",error})
        }
    
})



}

const addToFavs = async(req,res)=>{

    const c_id = req.body.c_id
    var count=0

    // User.find(req.user.id,(err,user)=>{

    //     var length=user.fav_companies.length

    //     for(id of user.fav_companies){
    //         if(id==c_id){
    //             return res.json({status:'already added'})
    //         }
    //         count++
    //     }


    // })
     
    User.findByIdAndUpdate(req.user.id,{$push:{fav_companies:c_id}},
        {new:true},
        (err,user)=>{
            if(user){
                return res.json({status: 'ok',data:user})
            }
    })

}

const removeFromFavs = async(req,res)=>{
    
    const c_id = req.body.c_id
     
    User.findByIdAndUpdate(req.user.id,{$pull:{fav_companies:c_id}},
        {new:true},
        (err,user)=>{
            if(user){
                return res.json({status: 'ok',data:user})
            }
    })
    
}





//create order
const createOrder = async (req,res)=>{
    
    const c_id = req.body.c_id
     
    User.findById(req.user.id,async (err,user)=>{
        if(err){
                  return res.json({status:'error',error: 'cant find user'})
                }
        else{

                  const company = await Company.findById({_id: c_id})

                  Order.create({
                            customer_id: user._id,
                            customer_name: user.username, 
                            company_id: company._id,
                            company_name: company.company_name,
                            image: company.image,
                            email: user.email, 
                            city: company.city,
                            u_phone_no: user.phone_no,
                            c_phone_no: company.phone_no,

                            date: req.body.date,
                            compDate: req.body.compDate,
                            event_type: req.body.event_type,
                            no_of_guests: req.body.no_of_guests,
                            catering: req.body.catering,
                            menu: req.body.menu,
                            decor: req.body.decor,
                            decor_theme: req.body.decor_theme,
                            photographer: req.body.photographer,
                            photoShoot_details: req.body.photoShoot_details,
                            venue: req.body.venue,
                            venue_preference: req.body.venue_preference,
                            location: req.body.location,
                            start_time: req.body.start_time,
                            event_duration: req.body.event_duration,
                            available_budget: req.body.available_budget,
                            special_instructions: req.body.special_instructions


                        },(err,order)=>{
                            if(err){
                                console.log('error in order creation')
                                return res.json({status: 'error',error: err})
                            }

                                User.findOneAndUpdate ({_id: user._id},{ $push: { orders: order._id } },(err,user)=>{
                                    if (user)
                                    {
                                        console.log("good")
                                       
                                    }else{
                                        console.log(err)
                                        console.log("error in user order id")
                                    }
                                    
                                  
                                })

                                Company.findOneAndUpdate ({_id: c_id},{ $push: { orders: order._id, booked_dates: order.date }},(err,user)=>{
                                    if (user)
                                    {
                                        console.log("best")
                                        
                                    }else{
                                        console.log(err)
                                        console.log("error in company book dates")
                                    }
                                    
                                })

                            return res.json({status: 'ok'})
                    })
    
    }
    })
}




//edit profile
const updateProfile =  (req,res)=>{


    User.findByIdAndUpdate(req.user.id,{
        username: req.body.username,
        email: req.body.email,
        phone_no: req.body.phone_no,
        city: req.body.city,
        image: req.body.image
    },
    {
        new:true
    },
    (err,user)=>{
        if(user){
            return res.json({status:'ok', data:user})
        }
        return res.json({status:'error', error:err})
    }
    )

       
}

//change password
const changePassword = async (req,res)=>{

        const {old_password,new_password: new_orignal_password} = req.body
        
        const user = await User.findById(req.user.id)
        if(await bcrypt.compare(old_password,user.password)){

            console.log("old pass correct")
                if(new_orignal_password.length<5){
                    return res.json({status:'error', error: 'Password should be atleast 5 characters' })
                }

                const new_password = await bcrypt.hash(new_orignal_password,10)

                User.findByIdAndUpdate(req.user.id,
                    {password: new_password},
                    {
                        new:true
                    },
                    (err,user)=>{
                    if(user){
                       
                        return res.json({status:'ok'})
                    }
                    return res.json({status:'error', error: 'user not updated',err })
                })

        }else{
            return res.json({status:'error', error: 'Password is not correct' })
        }

       


    
}



//MY ORDERS
const myOrders = async (req,res)=>{

    User.findOne({_id: req.user.id},{orders:1,_id:0},async (err,orders)=>{

                
                try {
                        const my_orders =  orders.orders.map(async (o_id)=>{
                            const order = await Order.findById(o_id)
                            
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



const rateCompany = async (req,res)=>{
    //console.log(req.body)
    const {o_id,c_id, order_rating} = req.body

    const company = await Company.findByIdAndUpdate(c_id, {$push: { rating_list : order_rating } })
    Order.findByIdAndUpdate(o_id,{$set:{rated:'yes'}},(err,order)=>{
        console.log(order.rated)
    })

    var sum = 0;
    const list = company.rating_list
    for(i of list){
        sum +=i
    }
    const avg = sum/list.length
    
    Company.findByIdAndUpdate(company._id,{$set:{rating:avg}},{
        new:true
    },(err,company)=>{
        if(err){
            return res.json({status:"error",err})
        }
        return res.json({status:"ok",company})
    })
    
}


const cancelOrder = async(req,res)=>{
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
                                        
                                       /////////////////////////                    

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



const completedOrders = async (req,res)=>{

   
                try {
                       Order.find({customer_id:req.user.id,status:'Completed'},(err,array)=>{
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

// const orderCreateNoti = async (req,res)=>{

    // try {
      
    //     User.findByIdAndUpdate({_id:req.user.id},{$push: { notifications : {'title': req.body.title, 'description': req.body.body, 'date': req.body.compDate}}},async(err,user)=>{
    //         if(user){
    //             res.json({status:"ok"})
    //         }else{
    //             return res.json({status:"Error",err})
    //         }
    //     })
        
    // } catch (error) {
    //     return res.json({status:"Error",error})
    // }

  
// }


const acceptOrRejectOrderNoti = async (req,res)=>{

    try {
      
        User.findByIdAndUpdate({_id:req.body.c_id},{$push: { notifications : {'title': req.body.title, 'description': req.body.body, 'date': req.body.compDate}}},async(err,company)=>{
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
        User.findOne({_id: req.user.id},{notifications:1,_id:0},async (err,array)=>{
        if(array){
            return res.json({status:"ok", data:array})
        }
        return res.json({status:"Error",error})

        })

        
    } catch (error) {
        return res.json({status:"Error",error})
    }

}


module.exports = {signUp,logIn,searchCompany,searchByDate,topRated,lowPrice,highPrice,fav_companies,createOrder,addToFavs,getNotiData,
                  updateProfile,changePassword,myOrders,completedOrders,rateCompany,cancelOrder,removeFromFavs,acceptOrRejectOrderNoti}