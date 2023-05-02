import {Component, Inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AppRoutes} from "../../app-routing.module";
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {OfficemapService} from "../../service/officemap.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Desk} from "../../models/desk";
import {DatePipe} from "@angular/common";
import {MatSliderChange} from "@angular/material/slider";
import {Options} from "@angular-slider/ngx-slider";
import {transformDateToString, transformDateToStringWithoutTime} from "../../util/date.util";
import {OfficemapDialogComponent} from "../officemap-dialog/officemap-dialog.component";


@Component({
  selector: 'app-officemap',
  templateUrl: './officemap.component.html',
  styleUrls: ['./officemap.component.css'],
  providers: [OfficemapService]
})
export class OfficemapComponent implements OnInit {

  public desks!: Array<Desk>;
  public selectedDate: Date;
  public dateNow:Date = new Date();

  constructor(private datePipe: DatePipe, private router: Router, private dialog: MatDialog, private officemapService: OfficemapService) {
  }

  openDialog(desk: Desk, date: Date) {
    const dialogRef = this.dialog.open(OfficemapDialogComponent, {
        data: {desk, date}
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.officemapService.getDesks(date).subscribe(data => {
        this.desks = data;
      })
    });
  }

  ngOnInit(): void {}

  public getDate(date: Date) {
    console.log(date);
    if (date != null) {
      this.officemapService.getDesks(date).subscribe(data => {
        this.desks = data;
      })
    }
  }

  public onHomeClick(): void {
    this.router.navigate([AppRoutes.HOME]);
  }

  public onSeeDeskBookingsClick(): void {
    this.router.navigate([AppRoutes.BOOKINGHISTORY]);
  }

  transformDateToStringWithoutTime(checkIn: Date):string | null{
    return transformDateToStringWithoutTime(this.datePipe,checkIn);
  }
}

