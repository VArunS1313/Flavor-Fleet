import { Component,OnInit } from '@angular/core';
import {FormBuilder, FormGroup,Validators} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginform!:FormGroup;
  returnUrl='';
  isSubmitted=false;

  constructor(private formbuilder:FormBuilder,private userService:UserService,
    private route:Router,private activeRoute:ActivatedRoute){

  }
  ngOnInit(): void {
    this.loginform = this.formbuilder.group({
      email:['', [Validators.required,Validators.email]],
      password:['', Validators.required]
    });
  //  this.returnUrl=this.activeRoute.snapshot.queryParams['returnUrl'];
   // throw new Error('Method not implemented.');
  }
  get fc(){
    return this.loginform.controls;
  }

  submit(){
    this.isSubmitted = true;
    if(this.loginform.invalid) return;

    alert(`email: ${this.fc['email'].value}`)
    this.userService.login({email:this.fc['email'].value,password:this.fc['password'].value}).subscribe(()=>{
      this.route.navigateByUrl(this.returnUrl);
    })

  }

}
