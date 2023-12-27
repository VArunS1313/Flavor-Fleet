import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Food } from 'src/app/components/shared/models/Food';
import { FoodService } from 'src/app/services/food.service';
import {Observable} from 'rxjs'
import { Tag } from '../../shared/models/tag';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  foods:Food[]=[];
  
  constructor(private foodservise:FoodService, private activeRoute: ActivatedRoute){
    activeRoute.params.subscribe((params)=>{
      let foodObeservable:Observable<Food[]>;
      if(params['searchterm'])
      {
       
        foodObeservable=foodservise.FoodsBySearchTearm(params['searchterm']);
      
      }
      else if(params['tag'])
      {
       
        foodObeservable=foodservise.getAllFoodByTag(params['tag']);
      
      }
      else{
        foodObeservable=foodservise.getAll();

    //console.log(this.foods);
      }
      foodObeservable.subscribe((servvefood)=>{
        this.foods=servvefood;
      })
    })
    
    
    }
ngOnInit(): void {
  
}







}
