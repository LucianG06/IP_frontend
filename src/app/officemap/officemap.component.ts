import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AppRoutes} from "../app-routing.module";

@Component({
  selector: 'app-officemap',
  templateUrl: './officemap.component.html',
  styleUrls: ['./officemap.component.css']
})
export class OfficemapComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  public onHomeClick():void{
    this.router.navigate([AppRoutes.HOME]);
  }

}
