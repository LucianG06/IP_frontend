import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from "@angular/router";
import {AppRoutes} from "../app-routing.module";
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

 public loginFormGroup: FormGroup;
 public emailFormControl:FormControl;
 public passwordFormControl:FormControl;
 public variabila=2;



  constructor(private router:Router, private authService:AuthService) {}

  ngOnInit(): void {
    this.loginFormGroup= new FormGroup({
      email:new FormControl(''),
      password:new FormControl('')
    });
    this.emailFormControl=this.loginFormGroup.get('email') as FormControl;
    this.passwordFormControl=this.loginFormGroup.get('password') as FormControl;
    console.log(this.loginFormGroup);
  }

  public onLogin():void{
    this.authService.getToken({
      email: this.emailFormControl.value,
      password: this.passwordFormControl.value
    }).subscribe((loginToken: HttpResponse<string>) => {
      console.log(loginToken.body);
      if (typeof loginToken.body === "string") {
          window.localStorage.setItem('token', loginToken.body);
      }
      this.router.navigate([AppRoutes.OFFICEMAP]);
    },
    (error) => {
      console.log(1)
      console.log(this.getServerErrorMessage(error));
    });
    console.log('email:',this.emailFormControl.value);
    console.log('password',this.passwordFormControl.value);
  }

  public onHomeClick():void{
    this.router.navigate([AppRoutes.HOME]);
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 404: {
        return `Not Found: ${error.message}`;
      }
      case 403: {
        return `Access Denied: ${error.message}`;
      }
      case 500: {
        return `Internal Server Error: ${error.message}`;
      }
      default: {
        return `Unknown Server Error: ${error.message}`;
      }

    }
  }
}

