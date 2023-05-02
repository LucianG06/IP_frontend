import { Component } from '@angular/core';
import {AppRoutes} from "./app-routing.module";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Deskbooking-app';

  constructor(private router:Router){}

  ngOnInit(): void {
    this.onHomeClick();
  }

  public onHomeClick():void{
    this.router.navigate([AppRoutes.HOME]);
  }
}
