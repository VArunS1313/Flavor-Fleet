import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit{
  isLoading!:boolean;
  constructor(private loadingservice:LoadingService){
    loadingservice.isLoading.subscribe((isload)=>{
      this.isLoading=isload
    })
// loadingservice.showloading()
  }
ngOnInit(): void {
 // throw new Error('Method not implemented.');
}


}
