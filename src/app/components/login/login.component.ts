import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from "@angular/router";
import {AppRoutes} from "../../app-routing.module";
import { AuthService } from '../../service/auth.service';
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService,MatSnackBar]
})
export class LoginComponent implements OnInit {

 public loginFormGroup: FormGroup;
 public emailFormControl:FormControl;
 public passwordFormControl:FormControl;
 public variabila=2;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';


  constructor(private router:Router, private authService:AuthService,private _snackBar: MatSnackBar) {}

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
    this.authService.signIn({
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
        this._snackBar.open('Something went wrong', 'Ok', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition
        });
      });
    console.log('email:',this.emailFormControl.value);
    console.log('password',this.passwordFormControl.value);
  }

  public onHomeClick():void{
    this.router.navigate([AppRoutes.HOME]);
  }

}
