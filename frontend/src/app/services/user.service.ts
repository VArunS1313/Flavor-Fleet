import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { User } from '../components/shared/models/User';
import { IloginUser } from '../components/shared/interfaces/IloginUser';
import { HttpClient} from '@angular/common/http';
import { USER_Register_URL, User_login_URL } from '../shared/url';
import { ToastrService } from 'ngx-toastr';
import { IRegisterUser } from '../components/shared/interfaces/IRegisterUser';

const USER_KEY='User'
@Injectable({
  providedIn: 'root'
})
export class UserService {
  
private userSubject=new BehaviorSubject<User>(this.getUserFromLocalStorage());
public userObservable:Observable<User>;
  constructor(private http:HttpClient,private toastrServise:ToastrService) {
    this.userObservable=this.userSubject.asObservable();
   }
   
   login(loginuser:IloginUser):Observable<User>{
    return this.http.post<User>(User_login_URL,loginuser).pipe(
      tap({
        next:(user)=>{
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrServise.success(
            `Welcome ${user.name}!`,'Login Sucessfully'
          )

        },
        error:(errorresponse)=>{
          this.toastrServise.error(errorresponse.error,'Login Failed');
        }

      })
    );
   }
   getUser():User{
    return this.userSubject.value;
   }
   private setUserToLocalStorage(user:User)
   {
    localStorage.setItem(USER_KEY,JSON.stringify(user));
   }
   private getUserFromLocalStorage():User{
    const userjson=localStorage.getItem(USER_KEY);
    if(userjson)
    {
      return JSON.parse(userjson)as User;

    }
    return new User();
   }
   logout(){
    this.userSubject.next(new User())
    localStorage.removeItem(USER_KEY);
    window.location.reload();
   }
   register(userReg:IRegisterUser):Observable<User>
   {
    return this.http.post<User>(USER_Register_URL,userReg).pipe(
      tap({
        next:(user)=>{
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrServise.success(
            `Welcome ${user.name}`,'Register Successful'
          )
        },
        error:(errorRespone)=>{
          this.toastrServise.error(errorRespone.error,
            'Registraton Failed')
        }
      })
    )
   }
   

}
