import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
private isLoadingSubject=new BehaviorSubject<boolean>(false);
  constructor() { }
  showloading()
  {
    this.isLoadingSubject.next(true);
  }
  hideloading()
  {
    this.isLoadingSubject.next(false)
  }
  get isLoading()
  {
    return this.isLoadingSubject.asObservable();
  }
}
