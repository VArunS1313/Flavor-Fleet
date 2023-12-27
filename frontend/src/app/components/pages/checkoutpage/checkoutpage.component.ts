import { Component, OnInit } from '@angular/core';
import { Order } from '../../shared/models/Order';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkoutpage',
  templateUrl: './checkoutpage.component.html',
  styleUrls: ['./checkoutpage.component.css']
})
export class CheckoutpageComponent implements OnInit{

  order:Order=new Order();
  checkoutForm!:FormGroup;
  constructor(private cartservice:CartService,private toastservice:ToastrService,
    private userservice:UserService,private formBuilder:FormBuilder,
    private orderservice:OrderService,private router:Router){
      const cart=cartservice.getCart();
      this.order.items=cart.items;
      this.order.totalprice=cart.totalprice;

  }
  

  ngOnInit(): void {
  //  throw new Error('Method not implemented.');
  let {name,address}=this.userservice.getUser();
  this.checkoutForm=this.formBuilder.group({
    name:[name,Validators.required],
    address:[address,Validators.required]
  })
  }
  get fc(){
    return this.checkoutForm.controls
  }
  checkoutorder(){
    if(this.checkoutForm.invalid)
    {
      this.toastservice.warning('Please Fill the form','Invalid Input')
      return;
    }
    
    if(!this.order.addresslatlan)
    {
      this.toastservice.warning('Please provide Location','Location')
      return;
    }
    this.order.name=this.fc['name'].value;
    this.order.address=this.fc['address'].value
    console.log(this.order);
    this.orderservice.create(this.order).subscribe({
      next:() => {
        this.router.navigateByUrl('/payment');
      },
      error:(errorResponse) => {
        console.log("error:  "+errorResponse);
        this.toastservice.error(errorResponse.error, 'Cart');
      }
    })
  }

}
