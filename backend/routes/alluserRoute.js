import express from 'express';
import adminAuth from '../middleware/adminAuth.js'
import {allusers} from '../controller/alluserscontroller.js'

const alluserRouter=express.Router( );


alluserRouter.post('/userlist',adminAuth,allusers);

export default alluserRouter;