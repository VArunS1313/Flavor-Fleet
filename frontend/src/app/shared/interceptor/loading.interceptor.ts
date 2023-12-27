import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
var panding_request=0;

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingservice:LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingservice.showloading();
    panding_request++;

    return next.handle(request).pipe(
      tap({
        next:(event)=>{
          if(event.type===HttpEventType.Response)
          {
            this.hideloading();
          }
        },
        error:(_)=>{
          this.hideloading()
        }
      })
    );
  }
  hideloading(){
    panding_request--;
    if(panding_request===0)
    this.loadingservice.hideloading();
  }
}
