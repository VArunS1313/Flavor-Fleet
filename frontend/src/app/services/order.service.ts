import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../components/shared/models/Order';
import { Order_Create_Url, Order_New_for_user, Order_Pay_Url, Order_Track_Url } from '../shared/url';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }
  create(order:Order){
    console.log("Ordr+popo");
    return this.http.post<Order>(Order_Create_Url,order);
  }
  orderNewofuser():Observable<Order>
  {
    return this.http.get<Order>(Order_New_for_user);
  }
  orderpay(order:Order):Observable<string>
  {
    return this.http.post<string>(Order_Pay_Url,order);
  }
  tackorder(id:number):Observable<Order>
  {
    return this.http.get<Order>(Order_Track_Url+id)
  }
}

