import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Desk} from "../../models/desk";
import {OfficemapService} from "../../service/officemap.service";
import {DatePipe} from "@angular/common";
import {transformDateToString, transformDateToStringWithoutTime} from "../../util/date.util";
import {BookinghistoryService} from "../../service/bookinghistory.service";
import {Booking} from "../../models/booking";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

@Component({
  selector: 'app-officemap-dialog',
  templateUrl: './officemap-dialog.component.html',
  styleUrls: ['./officemap-dialog.component.css'],
  providers: [OfficemapService, BookinghistoryService, MatSnackBar]
})
export class OfficemapDialogComponent implements OnInit {

  public freeIntervalsIn: Array<Date>;
  public freeIntervalsOut: Array<Date>;
  public message: String;
  public checkInHour: number;
  public checkOutHour: number;
  public checkIn: FormControl;
  public checkOut: FormControl;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';


  constructor(@Inject(MAT_DIALOG_DATA) public data: { desk: Desk, date: Date }, private officemapService: OfficemapService, private datePipe: DatePipe, private historyBookingService:BookinghistoryService,private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    console.log(this.data.desk.name);
    console.log(this.data.date.getDate());

    if (!(this.data.desk.fullyBooked == 1)) {
      console.log(this.checkInHour)
      console.log(this.checkOutHour)
      this.getFreeHours();
      this.setFormsControls();
      this.setCheckOutValuesBasedOnCheckIn();
    } else {
      this.message = this.data.desk.name + " is already booked for this day: " + this.datePipe.transform(this.data.date, "yyyy-MM-dd");
      console.log(this.message);
    }
  }

  public transformDateToString(date: Date): string | null {
    return transformDateToString(this.datePipe, date);
  }

  transformDateToStringWithoutTime(date: Date):string | null{
    return transformDateToStringWithoutTime(this.datePipe,date);
  }

  private getFreeHours():void {
    this.officemapService.getFreeHours(this.data.desk.name, this.data.date).subscribe((value) => {
      this.freeIntervalsIn = value;
      console.log(this.freeIntervalsIn);
    })
  }

  private setFormsControls(): void {
    this.checkIn = new FormControl("", Validators.required);
    this.checkOut = new FormControl("", Validators.required);
  }

  private setCheckOutValuesBasedOnCheckIn(): void {
    this.checkIn.valueChanges.subscribe((value) => {
      console.log(value);
      const date: Date = new Date(value);
      const array: Date[] = [];
      const checkInHoursArray: number[] = this.freeIntervalsIn.map((interval) => interval.getHours());
      let i = date.getHours();
      // console.log(i);
      let shouldStop = false;
      while (i < 20 && !shouldStop) {
        i++;
        // console.log(i);
        if (checkInHoursArray.includes(i - 1)) {
          const checkOutDate: Date = new Date(date);
          checkOutDate.setHours(i);
          array.push(checkOutDate);
        } else {
          shouldStop = true;
        }
      }
      this.freeIntervalsOut = array;
    })
  }

  public onBookingClick():void{
    const booking:Booking = new Booking("",this.data.desk.name,this.checkIn.value,this.checkOut.value);
    this.historyBookingService.createBooking(booking).subscribe(res =>
    {
      if (res.status == 200){
        // alert("Booking a fost creat");
        this._snackBar.open('Your booking was created', 'Ok', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition
        });
      }
    });
  }
}
