const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const userRouter = require('./routes/userRouter')
const companyRouter = require('./routes/companyRouter')
const vendorRouter = require('./routes/vendorRouter')
const adminRouter = require('./routes/adminRouter')
const db = require('./config/mongoose')
const middleware = require('./middlewares/index')
const User = require('./models/userSchema')
const Company = require("./models/companySchema")
const Vendor = require('./models/vendorSchema')
const cors = require("cors")
const Stripe = require('stripe')


require('dotenv').config();
const corsOptions = {
    origin:"*",
    credentials:"true",
    optionSuccessStatus:200
}

const app = express()

const PUBLISHABLE_KEY = process.env.PUBLISHABLE_KEY || 'pk_test_51LqdnhBKftHehnLjj3UjXBLpyXNDbAICMGFu9qyyhAFSvlWVhBW5MaV4lklaWM5QN9gRvEqL6z123cGZARCrqk7X00IuBzYM05'
const SECRET_KEY = process.env.SECRET_KEY || 'sk_test_51LqdnhBKftHehnLjF88bzmAGPu2tox5RwMLcxdmSBJ9zNqwY0WugAV35LBgzmowVHWGrL1jyGR8TfQ3I09LFqJm300ui7S4gyw'


const stripe = Stripe(SECRET_KEY, { apiVersion: "2022-08-01" });

app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname,'assets')))

app.get('/',async (req,res)=>{
    return res.json({status:'ok',msg:'Hello deer'})
})

app.get('/getUser',middleware.ValidateToken,async (req,res)=>{

    
    //role add token and if else
    const role = req.user.role
    console.log(role)
    
    switch(role){

        case 'customer':
             User.findById(req.user.id,(err,user)=>{
                if(err){
                    return res.json({status:'error', error: 'cant find user' })
                }
              return res.json({ status:'ok', data: user})
            })
            break;

        case 'company':
             Company.findById(req.user.id,(err,user)=>{
                if(err){
                    return res.json({status:'error', error: 'cant find user' })
                }
              return res.json({ status:'ok', data: user})
            })
            break;

        case 'vendor':
                Vendor.findById(req.user.id,(err,user)=>{
                   if(err){
                       return res.json({status:'error', error: 'cant find user' })
                   }
                 return res.json({ status:'ok', data: user})
            })
            break;
        
  
    }
}
)


app.post('/getAnyUser',middleware.ValidateToken,async (req,res)=>{

  try {

    User.findById({_id:req.body.u_id},async(err,user)=>{
      if(user){
        res.json({status:"ok",data:user})
    }else{
        return res.json({status:"Error",err})
    }
    })
    
  } catch (error) {
    return res.json({status:"Error",err})
  }

})

app.post("/create-payment-intent", async (req, res) => {
  
    try {

      const amount = req.body.pay_amount
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount, //lowest denomination of particular currency
        currency: "usd",
        payment_method_types: ["card"], //by default
      });
  
      const clientSecret = paymentIntent.client_secret;
  
      res.json({ clientSecret: clientSecret, });

    } catch (e) {
      console.log(e.message);
      res.json({ error: e.message });
    }
  })




//routes
app.use('/users', userRouter)
app.use('/company', companyRouter)
app.use('/vendor', vendorRouter)
app.use('/admin', adminRouter)



app.listen( process.env.PORT || 5000,'0.0.0.0',(err)=>{
    if(err){
        console.log('error on port')
    }else{
        console.log('app running successfully on port 5000', )
    }
})