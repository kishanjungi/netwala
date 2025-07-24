import express from 'express';
import authUser from '../middleware/auth.js';
import { allOrders, placeOrder, placeOrderRazorpay, placeOrderStripe, updateStatus, userOrder ,verifyStripe,verifyRazorpay} from '../controller/ordercontroller.js';
import adminAuth from '../middleware/adminAuth.js'

const orderRouter=express.Router( );


orderRouter.post('/list',adminAuth,allOrders);
orderRouter.post('/status',adminAuth,updateStatus);


orderRouter.post('/place',authUser, placeOrder);

orderRouter.post('/razorpay',authUser,placeOrderRazorpay);
orderRouter.post('/stripe',authUser,placeOrderStripe);


orderRouter.post('/userorders',authUser,userOrder);


orderRouter.post('/verifyStripe',authUser,verifyStripe)
orderRouter.post('/verifyRazorpay',authUser,verifyRazorpay)


export default orderRouter;