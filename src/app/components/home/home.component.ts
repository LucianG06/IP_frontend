import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AppComponent} from "../../app.component";
import {AppRoutes} from "../../app-routing.module";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router) {

  }

  ngOnInit(): void {
  }

  public onSignUpClick():void{
    this.router.navigate([AppRoutes.SIGNUP]);
  }

  public onLoginClick():void{
    this.router.navigate([AppRoutes.LOGIN]);
  }

}
