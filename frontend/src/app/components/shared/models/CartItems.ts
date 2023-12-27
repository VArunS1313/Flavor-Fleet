import { Food } from "./Food";

export class CartItems{
    constructor(public food:Food){
       
    }
   // food!:Food;
    quantity:number=1;
    price:number=this.food.price;
}