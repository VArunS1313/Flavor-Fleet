import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Food } from '../../shared/models/Food';
import { FoodService } from 'src/app/services/food.service';
import { CartService } from 'src/app/services/cart.service';
import { FOODS_URL } from 'src/app/shared/url';

@Component({
  selector: 'app-food-pages',
  templateUrl: './food-pages.component.html',
  styleUrls: ['./food-pages.component.css']
})
export class FoodPagesComponent implements OnInit {
  food:Food |undefined;
  
  constructor(private activeRoutes:ActivatedRoute,private foodservise:FoodService, private cartservise:CartService){
    activeRoutes.params.subscribe((paramas)=>{
      if(paramas['id'])
      {
         const ids=paramas['id']
        foodservise.getFoodByid(ids).subscribe(servefood=>{
          this.food=servefood;
          console.log(ids+this.food);
        });
      }
    })
  }
  ngOnInit(): void {
    
  }
  addtocart()
  {
    if (this.food) {
      this.cartservise.addToCart(this.food);
  } else {
     
      console.error('Error: Food is undefined.');
  }
  
    //this.cartservise.addToCart(this.food)
  }


}
