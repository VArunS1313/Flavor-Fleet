import { LatLng } from "leaflet";
import { CartItems } from "./CartItems";

export class Order{
    id!:string;
    items!:CartItems[];
    totalprice!:number;
    name!:string;
    address!:string;
    addresslatlan?:LatLng;
    paymentId!:string
    createdAt!:string;
    status!:string

}