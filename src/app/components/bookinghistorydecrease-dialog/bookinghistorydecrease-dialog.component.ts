import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {DatePipe} from "@angular/common";
import {BookinghistoryService} from "../../service/bookinghistory.service";
import {OfficemapService} from "../../service/officemap.service";
import {Booking} from "../../models/booking";
import {transformDateToString} from "../../util/date.util";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

@Component({
  selector: 'app-bookinghistorydecrease-dialog',
  templateUrl: './bookinghistorydecrease-dialog.component.html',
  styleUrls: ['./bookinghistorydecrease-dialog.component.css'],
  providers: [OfficemapService,BookinghistoryService,MatSnackBar]
})
export class BookinghistorydecreaseDialogComponent implements OnInit {

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
      const array: Date[] = [];
      let i = this.data.checkIn.getHours();
      console.log(this.transformDateToString(this.data.checkIn) + "verifica");
      while (i < this.data.checkOut.getHours()) {
          const checkOutDate: Date = new Date(date);
          checkOutDate.setHours(i);
          array.push(checkOutDate);
          i++;
      }
      this.freeCheckInHours = array;
    })
  }

  public transformDateToString(date: Date): string | null {
    return transformDateToString(this.datePipe, date)
  }

  private setCheckOutValuesBasedOnCheckIn(): void {
    this.startDate.valueChanges.subscribe((value) => {
      const date: Date = new Date(value);
      const array: Date[] = [];
      let i = date.getHours();
      while (i < this.data.checkOut.getHours()) {
        i++;
        const checkOutDate: Date = new Date(date);
        checkOutDate.setHours(i);
        array.push(checkOutDate);
      }
      this.freeIntervalsOut = array;
    })
  }

  public onDecreaseClick(): void {
    const booking: Booking = new Booking("", this.data.deskName, this.data.checkIn, this.data.checkOut);
    this.bookinghistoryservice.updateBooking(booking, this.startDate.value, this.endDate.value).subscribe(res =>
    {
      if (res.status == 200){
        // alert("Booking a fost creat");
        this._snackBar.open('Your booking was updated', 'Ok', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition
        });
      }
    });
  }
}
