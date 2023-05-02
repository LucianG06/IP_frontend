import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import {HomeComponent} from "./components/home/home.component";
import {OfficemapComponent} from "./components/officemap/officemap.component";
import { BookinghistoryComponent } from './components/bookinghistory/bookinghistory.component';

export enum AppRoutes{
  HOME='home',
  LOGIN='login',
  SIGNUP='signup',
  OFFICEMAP='officemap',
  BOOKINGHISTORY='bookinghistory'
}


const routes: Routes = [
  {path: AppRoutes.HOME,component: HomeComponent},
  {path: AppRoutes.LOGIN, component: LoginComponent},
  {path: AppRoutes.SIGNUP, component: SignupComponent},
  {path: AppRoutes.OFFICEMAP, component: OfficemapComponent},
  {path: AppRoutes.BOOKINGHISTORY, component:BookinghistoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
