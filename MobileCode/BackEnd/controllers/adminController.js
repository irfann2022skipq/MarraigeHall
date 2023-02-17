const User = require('../models/userSchema')
const Company = require('../models/companySchema')
const Admin = require('../models/adminSchema')
const Vendor = require('../models/vendorSchema')
const Order = require('../models/orderSchema')
const CvOrder = require('../models/cvOrderSchema')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET = '494898./yu!$^63df!vcxfv3278dhgdjsbv3i823'




const signUp = async (req,res)=>{

    const {password : orignalPassword} = req.body
    
    if(orignalPassword.length<5){
        return res.json({
            status:'error',
            error: 'Password should be atleast 5 characters'
        })}
    
    const password = await bcrypt.hash(orignalPassword,10)
    
    await Admin.create({
            admin_name: req.body.admin_name,
            email: req.body.email,
            password: password,
            image: "0",
            phone_no: req.body.phone_no,
            city: req.body.city,
            role: 'admin'
        },
        (err,admin)=>{
            if(err){
                console.log('error in signup')
                return res.json({status: 'error',error: 'error in signup'})
            }
           
           return res.json({status: 'ok'})
        })
    }
    
    
    

    
    //login
    const logIn = async(req,res)=>{
    
        const {email,password} = req.body
        
        const admin = await Admin.findOne({email}).lean()
    
        if(!admin){
            
            return res.json({status:"error", error : 'Invalid admin_name/password'})
            
        }
    
        if(await bcrypt.compare(password,admin.password)){
    
            const token = await jwt.sign({
                id : admin._id, 
                role: admin.role
            },
            JWT_SECRET
            )
            return res.json({status:"ok", token : token, data: admin})
        }
    
        return res.json({status:"error", error : 'Invalid admin_name/password'})
    
    }

    




module.exports = {signUp,logIn}