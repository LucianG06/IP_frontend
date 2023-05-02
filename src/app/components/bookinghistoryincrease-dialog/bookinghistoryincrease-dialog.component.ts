import {Component, Inject, OnInit} from '@angular/core';
import {Desk} from "../../models/desk";
import {OfficemapDialogComponent} from "../officemap-dialog/officemap-dialog.component";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {FormControl, Validators} from "@angular/forms";
import {BookinghistoryService} from "../../service/bookinghistory.service";
import {OfficemapService} from "../../service/officemap.service";
import {DatePipe} from "@angular/common";
import {transformDateToString, transformDateToStringWithoutTime} from "../../util/date.util";
import {coerceStringArray} from "@angular/cdk/coercion";
import {Booking} from "../../models/booking";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

@Component({
  selector: 'app-bookinghistoryincrease-dialog',
  templateUrl: './bookinghistoryincrease-dialog.component.html',
  styleUrls: ['./bookinghistoryincrease-dialog.component.css'],
  providers: [BookinghistoryService, OfficemapService, MatSnackBar]
})
export class BookinghistoryincreaseDialogComponent implements OnInit {

  public freeIntervalsIn: Array<Date>;
  public freeCheckInHours: Array<Date>;
  public freeIntervalsOut: Array<Date>;
  public startDate: FormControl;
  public endDate: FormControl;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(@Inject(MAT_DIALOG_DATA) public data: { deskName: string, checkIn: Date, checkOut: Date }, private datePipe: DatePipe, private bookinghistoryservice: BookinghistoryService, private officemapService: OfficemapService,private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    console.log(this.data.deskName);
    console.log(this.data.checkIn);
    console.log(this.data.checkOut);
    this.setFormsControls();
    this.getFreeHours();
    this.setCheckOutValuesBasedOnCheckIn();
    console.log("test");
  }

  private setFormsControls(): void {
    this.startDate = new FormControl("", Validators.required);
    this.endDate = new FormControl("", Validators.required);
  }

  private getFreeHours(): void {
    this.officemapService.getFreeHours(this.data.deskName, this.data.checkIn).subscribe((value) => {
      this.freeIntervalsIn = value;
      const date: Date = new Date(this.data.checkIn);
      console.log(date)
      const array: Date[] = [];
      const checkInHoursArray: number[] = this.freeIntervalsIn.map((interval) => interval.getHours());
      let i = this.data.checkIn.getHours();
      console.log(this.transformDateToString(this.data.checkIn) + "verifica");
      array.push(this.data.checkIn);
      let shouldStop = false;
      while (i > 7 && !shouldStop) {
        i--;
        if (checkInHoursArray.includes(i)) {
          const checkOutDate: Date = new Date(date);
          checkOutDate.setHours(i);
          array.push(checkOutDate);
        } else {
          shouldStop = true;
        }
      }
      this.freeCheckInHours = array.reverse();
    })
  }

  public transformDateToString(date: Date): string | null {
    return transformDateToString(this.datePipe, date)
  }

  private setCheckOutValuesBasedOnCheckIn(): void {
    this.startDate.valueChanges.subscribe((value) => {
      console.log(this.startDate.value + "asta e")
      // console.log(value);
      const date: Date = new Date(value);
      const array: Date[] = [];
      const checkInHoursArray: number[] = this.freeIntervalsIn.map((interval) => interval.getHours());
      console.log(this.freeIntervalsIn)
      array.push(this.data.checkOut);

      let i = this.data.checkOut.getHours();
      console.log(i);
      let shouldStop = false;
      while (i <= 20 && !shouldStop) {
        i++;
        console.log(i);
        if (checkInHoursArray.includes(i - 1)) {
          const checkOutDate: Date = new Date(date);
          checkOutDate.setHours(i);
          // console.log(date.getHours())
          array.push(checkOutDate);
        } else {
          shouldStop = true;
        }
      }
      this.freeIntervalsOut = array;
    })
  }

  public onIncreaseClick(): void {
    const booking: Booking = new Booking("", this.data.deskName, this.data.checkIn, this.data.checkOut);
    this.bookinghistoryservice.updateBooking(booking, this.startDate.value, this.endDate.value).subscribe(res =>
    {
      if (res.status == 200){
        // alert("Booking a fost creat");
        this._snackBar.open('Your booking was updated', 'Ok', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
      else {
        this._snackBar.open('Something went wrong', 'Ok', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    });
  }

}

