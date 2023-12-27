import express from 'express';
import cors from 'cors'
import { sam_food, sam_tags, sample_users } from './data';

import foodRouter  from './router/foodRouter'
import dotev from 'dotenv'
import  userRouter from './router/userRouter'
import  orderRouter from './router/orderRouter'
import { dbConnect } from './configs/databaseConfig';

dotev.config();


dbConnect();


const app=express();
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}))
app.use('/api/food',foodRouter)
app.use('/api/users',userRouter)
app.use('/api/orders',orderRouter)


const port=5000;
app.listen(port,()=>{
    console.log("5000 port");
})