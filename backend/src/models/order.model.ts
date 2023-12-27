import {model,Schema,Types} from 'mongoose'
import { Food, FoodSchema } from './food.model';
import { Order_status } from '../enum/order_status';

export interface Latlng{
    lat:string,
    lng:string
}
export const Latlngschema=new Schema<Latlng>({
    lat:{type:String,required:true},
    lng:{type:String,required:true}
});

export interface OrderItem{
    food:Food,
    price:number,
    quantity:number
}
export const OrderItemschema=new Schema<OrderItem>({
    food:{type:FoodSchema,required:true},
    price:{type:Number,required:true},
    quantity:{type:Number,required:true}
})
export interface Order{
    id:string;
    items:OrderItem[];
    totalprice:number;
    name:string;
    address:string;
    addresslatlan:Latlng;
    paymentId:string
    status:Order_status;
    user:Types.ObjectId;
    createdAt:Date;
    updatedAt:Date;


}
export const Orderschema=new Schema<Order>({
    name: {type: String, required: true},
    address: {type: String, required: true},
    addresslatlan: {type: Latlngschema, required: true},
    paymentId: {type: String},
    totalprice: {type: Number, required: true},
    items: {type: [OrderItemschema], required: true},
    status: {type: String, default: Order_status.NEW},
    user: {type: Schema.Types.ObjectId, required: true}


},{
    timestamps:true,
    toJSON:{
        virtuals:true
    },
    toObject:{
        virtuals:true
    }
})
export const OrderModel=model('order',Orderschema)
   