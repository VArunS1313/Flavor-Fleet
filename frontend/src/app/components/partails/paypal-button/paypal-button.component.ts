import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Order } from '../../shared/models/Order';
import { OrderService } from 'src/app/services/order.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var paypal: any;

@Component({
  selector: 'paypal-button',
  templateUrl: './paypal-button.component.html',
  styleUrls: ['./paypal-button.component.css']
})

export class PaypalButtonComponent implements OnInit {
  @Input()
  order!:Order
  @ViewChild('paypal',{static:true})
  paypalElement!:ElementRef



  constructor(private orderservice:OrderService,private cartservice:CartService,
    private router:Router,private toastrservice:ToastrService){

  }
  ngOnInit(): void {
    const self = this;
    paypal
    .Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: self.order.totalprice,
              },
            },
          ],
        });
      },

      onApprove: async (data: any, actions: any) => {
        const payment = await actions.order.capture();
        this.order.paymentId = payment.id;
        self.orderservice.orderpay(this.order).subscribe(
          {
            next: (orderId) => {
              this.cartservice.clearCart();
              this.router.navigateByUrl('/track/' + orderId);
              this.toastrservice.success(
                'Payment Saved Successfully',
                'Success'
              );
            },
            error: (error) => {
              this.toastrservice.error('Payment Save Failed', 'Error');
            }
          }
        );
      },

      onError: (err: any) => {
        this.toastrservice.error('Payment Failed', 'Error');
        console.log(err);
      },
    })
    .render(this.paypalElement.nativeElement);

  }
   

}
