import { Component, OnInit } from '@angular/core';
import { Order } from '../../shared/models/Order';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-track',
  templateUrl: './order-track.component.html',
  styleUrls: ['./order-track.component.css']
})
export class OrderTrackComponent implements OnInit {
  order!:Order
  constructor(private activatedroutes:ActivatedRoute,private orderservice:OrderService){
    const params=activatedroutes.snapshot.params;
    if(!params['orderId'])
    {
      return;
    }
    orderservice.tackorder(params['orderId']).subscribe(order=>{
      this.order=order
    })
  }
  ngOnInit(): void {
   // throw new Error('Method not implemented.');
  }


}
