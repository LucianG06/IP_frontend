import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatDialogModule} from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeComponent } from './components/home/home.component';
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import { OfficemapComponent } from './components/officemap/officemap.component';
import {MatIconModule} from "@angular/material/icon";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BookinghistoryComponent } from './components/bookinghistory/bookinghistory.component';
import {AuthInterceptor} from "./service/authconfig.interceptor";
import {DatePipe} from "@angular/common";
import {MatSliderModule} from "@angular/material/slider";
import { OfficemapDialogComponent } from './components/officemap-dialog/officemap-dialog.component';
import { BookinghistoryincreaseDialogComponent } from './components/bookinghistoryincrease-dialog/bookinghistoryincrease-dialog.component';
import { BookinghistorydecreaseDialogComponent } from './components/bookinghistorydecrease-dialog/bookinghistorydecrease-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    OfficemapComponent,
    BookinghistoryComponent,
    OfficemapDialogComponent,
    BookinghistoryincreaseDialogComponent,
    BookinghistorydecreaseDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    MatSliderModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
