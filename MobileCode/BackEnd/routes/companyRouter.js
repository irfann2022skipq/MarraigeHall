const express = require('express')
const companyController = require('../controllers/companyController')
const middleware = require('../middlewares/index')

const route = express.Router()


//authorization
route.post('/signUp', companyController.signUp)
route.post('/logIn',companyController.logIn)//done


//-Home Screen
route.post('/searchVendor',middleware.ValidateToken ,companyController.searchVendor)  //done
route.post('/searchByDate',middleware.ValidateToken ,companyController.searchByDate) //done
route.post('/caterers',middleware.ValidateToken ,companyController.caterers) //done
route.post('/decoration',middleware.ValidateToken ,companyController.decoration) //done
route.post('/venue',middleware.ValidateToken ,companyController.venue) //done
route.post('/photographers',middleware.ValidateToken ,companyController.photographers) //done


//orders
route.post('/createCatererOrder',middleware.ValidateToken ,companyController.createCatererOrder) //done
route.post('/createDecorationOrder',middleware.ValidateToken ,companyController.createDecorationOrder)//done
route.post('/createVenueOrder',middleware.ValidateToken ,companyController.createVenueOrder)//done
route.post('/createPhotographerOrder',middleware.ValidateToken ,companyController.createPhotographerOrder)//done
route.post('/rateVendor',middleware.ValidateToken ,companyController.rateVendor)
route.post('/orderCreateNoti',middleware.ValidateToken ,companyController.orderCreateNoti)//done


//-profile
route.patch('/updateProfile',middleware.ValidateToken ,companyController.updateProfile)//done
route.patch('/changePassword',middleware.ValidateToken ,companyController.changePassword)//done


//My orders
route.get('/rec_Orders',middleware.ValidateToken ,companyController.rec_Orders) //done
route.patch('/approveOrder',middleware.ValidateToken ,companyController.approveOrder) //done
route.patch('/rejectOrder',middleware.ValidateToken ,companyController.rejectOrder) //done
route.get('/myOrders',middleware.ValidateToken ,companyController.myOrders)//done
route.patch('/cancelOrder',middleware.ValidateToken ,companyController.cancelOrder)//done
route.patch('/checkSubComplete',middleware.ValidateToken ,companyController.checkSubComplete)//done
route.patch('/completeOrder',middleware.ValidateToken ,companyController.completeOrder)//done
route.patch('/cancelVendorOrder',middleware.ValidateToken ,companyController.cancelVendorOrder)//done
route.post('/showHiredVendors',middleware.ValidateToken ,companyController.showHiredVendors)//done
route.get('/completedOrders',middleware.ValidateToken ,companyController.completedOrders)//done
route.get('/getNotiData',middleware.ValidateToken ,companyController.getNotiData)//done





module.exports = route;