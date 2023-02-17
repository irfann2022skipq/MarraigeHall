const express = require('express')
const userController = require('../controllers/userController')
const middleware = require('../middlewares/index')

const route = express.Router()

//authorization
route.post('/signUp', userController.signUp)//done
route.post('/logIn',userController.logIn)//done

//-Home Screen
route.post('/searchCompany',middleware.ValidateToken ,userController.searchCompany) //done
route.post('/searchByDate',middleware.ValidateToken ,userController.searchByDate)//done
// route.post('/allCompanies',middleware.ValidateToken ,userController.allCompanies)//done
route.post('/topRated',middleware.ValidateToken ,userController.topRated)//done
route.post('/lowPrice',middleware.ValidateToken ,userController.lowPrice)//done
route.post('/highPrice',middleware.ValidateToken ,userController.highPrice)//done
route.post('/fav_companies',middleware.ValidateToken ,userController.fav_companies)//done

route.post('/addToFavs',middleware.ValidateToken ,userController.addToFavs)//done
route.post('/removeFromFavs',middleware.ValidateToken ,userController.removeFromFavs)//done


//orders
route.post('/createOrder',middleware.ValidateToken ,userController.createOrder)//done
route.post('/rateCompany',middleware.ValidateToken ,userController.rateCompany)//done
route.patch('/cancelOrder',middleware.ValidateToken ,userController.cancelOrder)//done
// route.post('/orderCreateNoti',middleware.ValidateToken ,userController.orderCreateNoti)//done
route.post('/acceptOrderNoti',middleware.ValidateToken ,userController.acceptOrRejectOrderNoti)//done
route.post('/rejectOrderNoti',middleware.ValidateToken ,userController.acceptOrRejectOrderNoti)//done
route.get('/getNotiData',middleware.ValidateToken ,userController.getNotiData)//done




//-profile
route.patch('/updateProfile',middleware.ValidateToken ,userController.updateProfile)//done
route.patch('/changePassword',middleware.ValidateToken ,userController.changePassword)//done


//My orders
route.get('/myOrders',middleware.ValidateToken ,userController.myOrders)//done
route.get('/completedOrders',middleware.ValidateToken ,userController.completedOrders)//done





module.exports = route;