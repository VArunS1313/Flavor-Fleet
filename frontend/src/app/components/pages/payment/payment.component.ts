import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Order } from '../../shared/models/Order';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  order:Order=new Order();
  constructor(private Orderservice:OrderService,private router:Router){
    this.Orderservice.orderNewofuser().subscribe({
      next:(order)=>{
        this.order=order
      },
      error:(err)=>{
        router.navigateByUrl('/checkout')
      }
    })
  }
 
  ngOnInit(): void {
    

   // throw new Error('Method not implemented.');
  }

}
