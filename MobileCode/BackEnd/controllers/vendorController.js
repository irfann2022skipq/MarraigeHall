const Vendor = require('../models/vendorSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const CvOrder = require('../models/cvOrderSchema')
const Company = require('../models/companySchema')
const Order = require('../models/orderSchema')
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
    Vendor.create({
            vendor_name: req.body.vendor_name,
            email: req.body.email,
            password: password,
            phone_no: req.body.phone_no,
            city: req.body.city,
            image: '0',
            service: req.body.service,
            noti_token: '',
            price_range: req.body.price_range,
            address: req.body.address,
            available_hours:req.body.available_hours,
            cancelled_orders: 0,
            role: 'vendor',
            rating_list:[],
            rating: 0,
            booked_dates: [],
            orders: []
        },
        (err,vendor)=>{
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
    
    const vendor = await Vendor.findOne({email}).lean()

    if(!vendor){
        return res.json({status:"error", error : 'Invalid username/password'})
    }

    if(await bcrypt.compare(password,vendor.password)){

        const token = jwt.sign({
            id : vendor._id, role: vendor.role
        },
        JWT_SECRET
        )

        const new_vendor = await Vendor.findByIdAndUpdate({_id:vendor._id},{noti_token:req.body.noti_token},{new:true});
        
        if(new_vendor){
            return res.json({status:"ok", token : token, data: new_vendor})
        }
     
        return res.json({status:"error", msg:"token not set"})
    }

    return res.json({status:"error", error : 'Invalid username/password'})

}




//update Profile
const updateProfile = async (req,res)=>{


    Vendor.findByIdAndUpdate(req.user.id,{
        vendor_name: req.body.vendor_name,
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
    (err,vendor)=>{
        if(vendor){
            return res.json({status:'ok', data:vendor})
        }
        return res.json({status:'error', error:err})
    }
    )


}


//change Password
const changePassword = async (req,res)=>{

    const {old_password,new_password: new_orignal_password} = req.body
        
    const vendor = await Vendor.findById(req.user.id)
    if(await bcrypt.compare(old_password,vendor.password)){

        console.log("old pass correct")
            if(new_orignal_password.length<5){
                return res.json({status:'error', error: 'Password should be atleast 5 characters' })
            }

            const new_password = await bcrypt.hash(new_orignal_password,10)

            Vendor.findByIdAndUpdate(req.user.id,
                {password: new_password},
                {
                    new:true
                },
                (err,vendor)=>{
                if(vendor){
                   
                    return res.json({status:'ok'})
                }
                return res.json({status:'error', error: 'vendor password not updated',err })
            })

    }else{
        return res.json({status:'error', error: 'Password is not correct' })
    }


}


//rec orders
const rec_Orders = async (req,res)=>{

    Vendor.findOne({_id: req.user.id},{orders:1,_id:0},async (err,orders)=>{

            try {
                    const my_orders =  orders.orders.map(async(o_id)=>{
                        const order = await CvOrder.findOne({_id:o_id,status:'Pending'})
                        console.log("1",order)
                        return order
                    })
                    
                    Promise.all(my_orders).then((my_orders)=>{
                        console.log(my_orders)
                        res.json({status:"ok",data : my_orders})
                    })
                    
            } catch (error) {
                
                    return res.json({status:"Error",error})
                    console.log(error)
            }      
})

}



//approve order
const approveOrder = async (req,res)=>{

        try {
                        await CvOrder.updateOne({_id : req.body.o_id},{$set:{status:"Approved"}})

                        CvOrder.findById(req.body.o_id,(err,approved_order)=>{
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
                                                                    console.log('company order updated')
                                                                    }else{
                                                                        console.log('company order not updated')
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


                        CvOrder.findByIdAndDelete({_id : o_id},(err,order)=>{
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

    Vendor.findOne({_id: req.user.id},{orders:1,_id:0},async (err,orders)=>{

            try {
                    const my_orders =  orders.orders.map(async(o_id)=>{
                        const order = await CvOrder.findOne({_id:o_id,status:'Approved'})
                        return order
                    })
                    
                    Promise.all(my_orders).then((my_orders)=>{
                        console.log(my_orders)
                        res.json({status:"ok",data : my_orders})
                    })
                    
            } catch (error) {
                
                    return res.json({status:"Error",error})
            }      
})



}


//cancel Order
const cancelOrder = async (req,res)=>{
     
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
                                                                    console.log('company order updated')
                                                                    }else{
                                                                        console.log('company order not updated')
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


                        Vendor.findByIdAndUpdate({_id:order.vendor_id},{$inc:{cancelled_orders: 1},$push:{rating_list:0}},
                            {new:true},async (err,vendor)=>{
                                if(err){
                                    console.log(error)
                                }else{
                                console.log('success',vendor)
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



//complete Order
const completeOrder = async (req,res)=>{
     
    const o_id = req.body.o_id
    console.log(o_id)
        try {
                 CvOrder.findById(o_id,async(err,order)=>{
                
              if(order.compDate<new Date()){
               
              
       
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
                                           
                                            Vendor.findByIdAndUpdate({_id:order.vendor_id},{$pull: { booked_dates: date }},
                                                    {
                                                        new:true
                                                    },(err,date)=>{
                                                        if(date){
                                                        console.log('vendor date updated')
                                                        }else{
                                                            console.log('vendor date not updated')
                                                        }
                                                    
                                                    })
                                        }
                                    }

                            }
                           

                        })



                        CvOrder.updateOne({_id : req.body.o_id},{$set:{status:"Completed"}},
                        {new:true},(err,completed_order)=>{
                            if(err){
                                res.json({status:"error",err})
                            }
                            console.log(completed_order)
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

const completedOrders = async (req,res)=>{

                try {
                       CvOrder.find({vendor_id:req.user.id,status:'Completed'},(err,array)=>{
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
      
        Vendor.findByIdAndUpdate({_id:req.user.id},{$push: { notifications : {'title': req.body.title, 'description': req.body.body, 'date': req.body.compDate}}},async(err,vendor)=>{
            if(vendor){
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
        Vendor.findOne({_id: req.user.id},{notifications:1,_id:0},async (err,array)=>{
        if(array){
            return res.json({status:"ok", data:array})
        }
        return res.json({status:"Error",error})

        })

        
    } catch (error) {
        return res.json({status:"Error",error})
    }
}


module.exports = {signUp,logIn,myOrders,approveOrder,updateProfile,changePassword,getNotiData,
                  completedOrders,rec_Orders,rejectOrder,cancelOrder,completeOrder,orderCreateNoti}