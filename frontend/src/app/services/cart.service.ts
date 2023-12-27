import { Injectable } from '@angular/core';
import { Cart } from '../components/shared/models/Cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Food } from '../components/shared/models/Food';
import { CartItems } from '../components/shared/models/CartItems';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart=this.getCartFromLocalStorage();
  private cartSubject:BehaviorSubject<Cart>=new BehaviorSubject(this.cart);
  constructor() { }
  
  addToCart(food: Food): void {
    let cartItem = this.cart.items
      .find(item => item.food.id === food.id);
    if (cartItem)
      return;

    this.cart.items.push(new CartItems(food));
    this.setCartLocalStorage();
  
  }
  removeFromCart(foodId: string): void {
    this.cart.items = this.cart.items
      .filter(item => item.food.id != foodId);
      this.setCartLocalStorage();
    

  }
  changeQuantity(foodId: string, quantity: number) {
    let cartItem = this.cart.items
      .find(item => item.food.id === foodId);
    if (!cartItem) return;

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.food.price;
    this.setCartLocalStorage();
  }
  clearCart() {
    this.cart = new Cart();
    this.setCartLocalStorage();
    
  }


  getCartObservable(): Observable<Cart> {
      return this.cartSubject.asObservable();
    }

    getCart():Cart{
      return this.cartSubject.value;
    }
    private setCartLocalStorage():void{
      this.cart.totalprice=this.cart.items.reduce(
      (prevpric,currentItem)=>prevpric+currentItem.price,0);
      this.cart.totalcount=this.cart.items.reduce(
        (prevpric,currentItem)=>prevpric+currentItem.quantity,0);

      const cartjson=JSON.stringify(this.cart);
      localStorage.setItem('Cart',cartjson);
      this.cartSubject.next(this.cart);

    }
    private getCartFromLocalStorage():Cart{
      const cartsend=localStorage.getItem('Cart');
      return cartsend? JSON.parse(cartsend):new Cart();

    }


}
