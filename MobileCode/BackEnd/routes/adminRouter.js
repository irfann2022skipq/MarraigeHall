const express = require('express')
const adminController = require('../controllers/adminController')
const middleware = require('../middlewares/index')

const route = express.Router()


//authorization
route.post('/signUp', adminController.signUp)
route.post('/logIn',adminController.logIn)//done


// //-Home Screen
// route.post('/searchVendor',middleware.ValidateToken ,adminController.searchVendor)  //done
// route.post('/searchByDate',middleware.ValidateToken ,adminController.searchByDate) //done
// route.post('/caterers',middleware.ValidateToken ,adminController.caterers) //done


// //-profile
// route.patch('/updateProfile',middleware.ValidateToken ,adminController.updateProfile)//done
// route.patch('/changePassword',middleware.ValidateToken ,adminController.changePassword)//done



module.exports = route;