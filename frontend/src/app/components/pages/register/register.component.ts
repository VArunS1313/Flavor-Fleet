import { Component,OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { IRegisterUser } from '../../shared/interfaces/IRegisterUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!:FormGroup;
  isSubmitted:boolean=false;
  routerurl='';
  constructor(private userservice:UserService,
    private formbuilder:FormBuilder, private activatedroute:ActivatedRoute,
    private router:Router){

  }
  ngOnInit(): void {
   /// throw new Error('Method not implemented.');
   this.registerForm = this.formbuilder.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
    confirmPassword: ['', Validators.required],
    address: ['', [Validators.required, Validators.minLength(5)]]
  },{
    validator: this.matchValidator('password', 'confirmPassword'),
  })
  this.routerurl= this.activatedroute.snapshot.queryParams['routerurl'];
  }

  matchValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (abstractControl: AbstractControl) => {
        const control = abstractControl.get(controlName);
        const matchingControl = abstractControl.get(matchingControlName);

        if (matchingControl!.errors && !matchingControl!.errors?.['confirmedValidator']) {
            return null;
        }

        if (control!.value !== matchingControl!.value) {
          const error = { confirmedValidator: 'Passwords do not match.' };
          matchingControl!.setErrors(error);
          return error;
        } else {
          matchingControl!.setErrors(null);
          return null;
        }
    }};
    get fc(){
      return this.registerForm.controls;
    }
    submit()
    {
      this.isSubmitted=true;
      console.log("popu"+this.registerForm.invalid);
      const controls = this.registerForm.controls;
      for (const name in controls) {
        console.log(name+" ")
      }
      if(this.registerForm.invalid)return;

      console.log("popu2");
    const fv=this.registerForm.value;
    const registeruser:IRegisterUser={
      name:fv.name,
      email:fv.email,
      password:fv.password,
      address:fv.address
    };
    console.log(registeruser+"  user Data ");
    this.userservice.register(registeruser).subscribe(_=>{
      this.router.navigateByUrl(this.routerurl);
    })
    }

}
