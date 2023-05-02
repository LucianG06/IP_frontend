import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SignupService} from "../../service/signup.service";
import {BookinghistoryService} from "../../service/bookinghistory.service";
import {AuthService} from "../../service/auth.service";
import {Desk} from "../../models/desk";
import {Booking} from "../../models/booking";
import {transformDateToString, transformDateToStringWithoutTime} from "../../util/date.util";
import {DatePipe} from "@angular/common";
import {BookinghistoryincreaseDialogComponent} from "../bookinghistoryincrease-dialog/bookinghistoryincrease-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {
  BookinghistorydecreaseDialogComponent
} from "../bookinghistorydecrease-dialog/bookinghistorydecrease-dialog.component";
import {AppRoutes} from "../../app-routing.module";
import {Router} from "@angular/router";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

@Component({
  selector: 'app-bookinghistory',
  templateUrl: './bookinghistory.component.html',
  styleUrls: ['./bookinghistory.component.css'],
  providers: [BookinghistoryService,MatSnackBar]
})
export class BookinghistoryComponent implements OnInit {
  public historyBookings!: Array<Booking>;
  public dateNow:Date = new Date();
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';


  constructor(private router:Router,private dialog: MatDialog,private bookinghistoryService: BookinghistoryService, private datePipe:DatePipe,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.bookinghistoryService.getBookings().subscribe(data => {
      this.historyBookings = data;
    })
  }

  public transformDateToString(checkIn: Date):string | null{
    return transformDateToString(this.datePipe,checkIn);
  }

  public transformDateToStringWithoutTime(checkIn: Date):string | null{
    return transformDateToStringWithoutTime(this.datePipe,checkIn);
  }

  public onDeleteClick(deskName:string, checkIn:Date,checkOut:Date):void{
    const booking:Booking = new Booking("",deskName,checkIn,checkOut);
    this.bookinghistoryService.deleteBooking(booking).subscribe( result => {
      if (result.status == 200){
        // alert("Booking a fost creat");
        this._snackBar.open('Your booking was deleted', 'Ok', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition
        });
      }
      this.bookinghistoryService.getBookings().subscribe(bookings => {
        this.historyBookings = bookings;
      });}
    );
  }

  openDialog(deskName: string, checkIn:Date, checkOut:Date) {
    console.log(checkIn);
    console.log(checkOut);
    const dialogRef = this.dialog.open(BookinghistoryincreaseDialogComponent, {
      data: {deskName, checkIn, checkOut}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.bookinghistoryService.getBookings().subscribe(bookings => {
        this.historyBookings = bookings;
      });
      console.log(`Dialog result: ${result}`);
    });
  }

  openDecreaseDialog(deskName: string, checkIn:Date, checkOut:Date) {
    console.log(checkIn);
    console.log(checkOut);
    const dialogRef = this.dialog.open(BookinghistorydecreaseDialogComponent, {
      data: {deskName, checkIn, checkOut}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.bookinghistoryService.getBookings().subscribe(bookings => {
        this.historyBookings = bookings;
      });
      console.log(`Dialog result: ${result}`);
    });
  }

  public onHomeClick():void{
    this.router.navigate([AppRoutes.HOME]);
  }
}
