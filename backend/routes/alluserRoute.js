import express from 'express';
import adminAuth from '../middleware/adminAuth.js'
import {allusers,deleteuser} from '../controller/alluserscontroller.js'

const alluserRouter=express.Router( );


alluserRouter.post('/userlist',adminAuth,allusers);
alluserRouter.post('/deleteuser',adminAuth,deleteuser);

export default alluserRouter;