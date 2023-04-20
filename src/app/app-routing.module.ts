import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {HomeComponent} from "./home/home.component";
import {OfficemapComponent} from "./officemap/officemap.component";

export enum AppRoutes{
  HOME='home',
  LOGIN='login',
  SIGNUP='signup',
  OFFICEMAP='officemap'
}


const routes: Routes = [
  {path: AppRoutes.HOME,component: HomeComponent},
  {path: AppRoutes.LOGIN, component: LoginComponent},
  {path: AppRoutes.SIGNUP, component: SignupComponent},
  {path: AppRoutes.OFFICEMAP, component: OfficemapComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
