import { Injectable } from '@angular/core';
import { Food } from '../components/shared/models/Food';

import { sam_food, sam_tags } from 'src/data';
import { Tag } from '../components/shared/models/tag';

import { HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs'
import { FOODS_BY_SEARCH_URL, FOODS_BY_TAG_URL, FOODS_TAGS_URL, FOODS_URL } from '../shared/url';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
 food:Food[]=[];
  constructor(private http:HttpClient) { }
  getAll(){
    console.log(FOODS_URL);
     return this.http.get<Food[]>(FOODS_URL)
  }
  FoodsBySearchTearm(searchterm:string):Observable<Food[]>
  {
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL+searchterm)
    
  }
  getAllTag():Observable<Tag[]>
  {
    return this.http.get<Tag[]>(FOODS_TAGS_URL)
  }
  getAllFoodByTag(tag:string):Observable<Food[]>
  {
    return tag==="All"?
    this.getAll():
    this.http.get<Food[]>(FOODS_BY_TAG_URL+tag);
  }
  getFoodByid(id:string):Observable<Food>{
    return this.http.get<Food>(FOODS_URL+'/'+id)
  }
}
