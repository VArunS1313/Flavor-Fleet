import { Router } from "express";
import asyncHandler from 'express-async-handler'
import { OrderModel } from "../models/order.model";
import { Order_status } from "../enum/order_status";
import auth_midd from "../middlewhere/auth_midd";
import { UserModel } from "../models/user.model";


const router=Router();
router.use(auth_midd)

router.post('/create',
asyncHandler(async(req:any,res:any)=>{
    const reqOrder=req.body;
   
    if(reqOrder.items.length<=0){
        res.status(400).send('cart is Empty');
        return;
    }
    await OrderModel.deleteOne({
        user:req.user.id,
        status:Order_status.NEW
    })
    const newOrder=new OrderModel({...reqOrder,user:req.user.id})
    await newOrder.save();
    res.send(newOrder)
}))
router.get('/newOrderfromcurrentuser',asyncHandler(async(req:any,res)=>{
    //console.log(req.user.id);
    const order=await getnewOrderforcuruser(req);
    if(order)res.send(order)
    else res.status(400).send();
}))
router.get('/track/:id',asyncHandler(async(req,res)=>{
    const order=await OrderModel.findById(req.params.id);
    res.send(order)

}))
router.post('/pay',asyncHandler(async(req,res)=>{
    const {paymentId}=req.body
    const neworder=await getnewOrderforcuruser(req)
    console.log(neworder)
   // const user=await UserModel.findById(neworder?.user)
   //send req to dif rent controller for send mail
    if(!neworder)
    {
        res.status(400).send('Order Not Found')
        return
    }
    neworder.paymentId=paymentId;
    neworder.status=Order_status.PAYED;
    await neworder.save()
    res.send(neworder._id)
}))
export default router;

async function getnewOrderforcuruser(req: any) {
    return await OrderModel.findOne({ user: req.user.id, status: Order_status.NEW });
}
