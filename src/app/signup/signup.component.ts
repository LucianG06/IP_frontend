import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {Router} from "@angular/router";
import {AppComponent} from "../app.component";
import {AppRoutes} from "../app-routing.module";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupFormGroup: FormGroup;
  public emailFormControl: FormControl;
  public passwordFormControl: FormControl;
  public firstNameFormControl: FormControl;
  public lastNameFormControl: FormControl;
  public phoneNumberFormControl: FormControl;
  public managerFormControl: FormControl;
  public managers:Array<string>;


  constructor(private router:Router) {

  }

  ngOnInit(): void {
    this.managers = ['Andrei','Marius','Laura'];
    this.managerFormControl = new FormControl(this.managers);
    this.signupFormGroup = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      phoneNumber: new FormControl(''),
      manager: this.managerFormControl
    });
    this.emailFormControl = this.signupFormGroup.get('email') as FormControl;
    this.passwordFormControl = this.signupFormGroup.get('password') as FormControl;
    this.firstNameFormControl = this.signupFormGroup.get('firstName') as FormControl;
    this.lastNameFormControl = this.signupFormGroup.get('lastName') as FormControl;
    this.phoneNumberFormControl = this.signupFormGroup.get('phoneNumber') as FormControl;
    console.log(this.signupFormGroup);
  }
  public onSignUpClick():void{
    console.log('email:',this.emailFormControl.value);
    console.log('password',this.passwordFormControl.value);
    console.log('firstName',this.firstNameFormControl.value);
    console.log('lastName',this.lastNameFormControl.value);
    console.log('phoneNumber',this.phoneNumberFormControl.value);
    console.log('manager',this.managerFormControl.value);
  }

  public onLoginClick():void{
    this.router.navigate([AppRoutes.LOGIN]);
  }
}
