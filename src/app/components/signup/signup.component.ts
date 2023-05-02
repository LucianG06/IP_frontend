import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from "@angular/router";
import {AppComponent} from "../../app.component";
import {AppRoutes} from "../../app-routing.module";
import {User} from '../../models/user';
import {SignupService} from "../../service/signup.service";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [SignupService,MatSnackBar]
})
export class SignupComponent implements OnInit {

  public signupFormGroup: FormGroup;
  public emailFormControl: FormControl;
  public passwordFormControl: FormControl;
  public firstNameFormControl: FormControl;
  public lastNameFormControl: FormControl;
  public phoneNumberFormControl: FormControl;
  public managerFormControl: FormControl;
  public managers: Array<string>;
  public user: User;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';


  constructor(private router: Router, private signupService: SignupService,private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.signupService.getManagers().subscribe(m => {
      this.managers = m
    })
    this.managerFormControl = new FormControl(this.managers);
    // this.managerFormControl.valueChanges.subscribe()
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
  }

  public onSignUpClick(): void {
    // console.log('email:',this.emailFormControl.value);
    // console.log('password',this.passwordFormControl.value);
    // console.log('firstName',this.firstNameFormControl.value);
    // console.log('lastName',this.lastNameFormControl.value);
    // console.log('phoneNumber',this.phoneNumberFormControl.value);
    // console.log('manager',this.managerFormControl.value);
    this.signupService.getIdForManager(this.managerFormControl.value.split(" ")).subscribe(data => {
      this.user = {
        email: this.emailFormControl.value,
        password: this.passwordFormControl.value,
        firstName: this.firstNameFormControl.value,
        lastName: this.lastNameFormControl.value,
        phoneNumber: this.phoneNumberFormControl.value,
        managerId: data
      };
      // console.log(this.user);
      this.signupService.doRegistration(this.user).subscribe(res =>
      {
        if (res.status == 200){
          // alert("Booking a fost creat");
          this._snackBar.open('Your account was created. Please login now!', 'Ok', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition
          });
        }
      });
      this.onLoginClick();
    });
  }

  public onLoginClick(): void {
    this.router.navigate([AppRoutes.LOGIN]);
  }
}
