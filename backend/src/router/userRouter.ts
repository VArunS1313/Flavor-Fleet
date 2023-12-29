import {Router} from 'express'
import jwt from 'jsonwebtoken'
import { sample_users } from '../data';
import asyncHandler from 'express-async-handler'
import bycrypt from 'bcryptjs'
import { User, UserModel } from '../models/user.model';
import  sendEmail from './emailservice';


const router=Router();

router.get('/seed', asyncHandler(async (req, res) => 
{
    const userCount=await UserModel.countDocuments();
    if(userCount>0)
    {
        res.send("Seed is already done");
        return;

    }

    await UserModel.create(sample_users)
    res.send("Seed is done")
}))
router.post('/login',asyncHandler(async (req,res)=>{
    const {email,password}=req.body;  //// destructure of body
    
    const user = await UserModel.findOne({email});
    const neworder={}
    
    if(user&&(await bycrypt.compare(password,user.password)))
    {
       
        res.send(genratewbtoken(user));
    }
    else{
        res.status(400).send("username or password wrong")
    }
}))
const genratewbtoken=(user:any)=>{
    const token=jwt.sign({
       id:user.id, email:user.email,isAdmin:user.isAdmin 
    },process.env.JWT_SECRET!,{
        expiresIn:"10d"
    });
    //user.token=token
    return  {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        isAdmin: user.isAdmin,
        token: token
      };
}
router.post('/register',asyncHandler(
    async(req,res)=>{
        const{name,password,email,address}=req.body;
        const user=await UserModel.findOne({email});
        if(user)
        {
            res.status(400).send("This email is already in use");
        }
        const encryptpassword=await bycrypt.hash(password,9);
        const nuser:User={
            id:'',
            name,
            email,
            password:encryptpassword,
            address,
            isAdmin:false
        }
        const dbuser=await UserModel.create(nuser);
        res.send(genratewbtoken(dbuser));

    }
))

export default router;