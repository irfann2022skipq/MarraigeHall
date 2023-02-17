const express = require('express')
const vendorController = require('../controllers/vendorController')
const middleware = require('../middlewares/index')

const route = express.Router()


//authorization
route.post('/signUp', vendorController.signUp)
route.post('/logIn',vendorController.logIn)//done


//-profile 
route.patch('/updateProfile',middleware.ValidateToken ,vendorController.updateProfile)//done
route.patch('/changePassword',middleware.ValidateToken ,vendorController.changePassword)//done


//My orders
route.get('/rec_Orders',middleware.ValidateToken ,vendorController.rec_Orders)//done
route.patch('/approveOrder',middleware.ValidateToken ,vendorController.approveOrder)//done
route.patch('/rejectOrder',middleware.ValidateToken ,vendorController.rejectOrder) //done
route.get('/myOrders',middleware.ValidateToken ,vendorController.myOrders)//done
route.patch('/cancelOrder',middleware.ValidateToken ,vendorController.cancelOrder)//done
route.patch('/completeOrder',middleware.ValidateToken ,vendorController.completeOrder)//done
route.get('/completedOrders',middleware.ValidateToken ,vendorController.completedOrders)//done
route.post('/orderCreateNoti',middleware.ValidateToken ,vendorController.orderCreateNoti)//done
route.get('/getNotiData',middleware.ValidateToken ,vendorController.getNotiData)//done




module.exports = route;