import { Component,OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { User } from '../../shared/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  cartItems:number=0;
  user!:User
  constructor(private cartservise:CartService,private userservice:UserService){
    cartservise.getCartObservable().subscribe((newcart)=>
    {
      this.cartItems=newcart.totalcount;
    })
    userservice.userObservable.subscribe((newuser)=>{
      console.log(newuser);
      this.user=newuser
    })

  }
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }
  logout(){
    this.userservice.logout();
  }
  get isAut()
  {
    return this.user.token;
  }

}
