import { Component,OnInit } from '@angular/core';
import { Tag } from '../../shared/models/tag';
import {FoodService} from 'src/app/services/food.service'

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  tags:Tag[]=[];
  constructor(foodservise:FoodService ){
    foodservise.getAllTag().subscribe(servertag=>{
      console.log(servertag);
      this.tags=servertag;
    });

  }
  ngOnInit(): void {
   // throw new Error('Method not implemented.');
  }
}
