import { Component , OnInit} from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from '../../shared/models/Cart';
import { CartItems } from '../../shared/models/CartItems';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit{
  cart!:Cart;
  constructor(private cartservise:CartService){
    cartservise.getCartObservable().subscribe((cart)=>{
      this.cart=cart;
    })
  }
  ngOnInit(): void {
    
  }
  removeFromCart(cartItem:CartItems){
    this.cartservise.removeFromCart(cartItem.food.id);
  }

  changeQuantity(cartItem:CartItems,quantityInString:string){
    const quantity = parseInt(quantityInString);
    this.cartservise.changeQuantity(cartItem.food.id, quantity);
  }

}
