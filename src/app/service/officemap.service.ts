import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams, HttpResponse} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';

import {map, Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Credentials} from '../models/credentials';
import {Desk} from "../models/desk";
import {DatePipe} from "@angular/common";
import {transformDateToString} from "../util/date.util";

@Injectable()
export class OfficemapService {

  constructor(private datePipe: DatePipe, private http: HttpClient) {
  }

  getDesks(dateBookings: Date): Observable<[]> {
    console.log("first try")
    console.log(this.datePipe.transform(dateBookings, "yyyy-MM-dd HH:mm:ss"))
    return this.http.get<[]>('basePath/desk/getAll?date=' + transformDateToString(this.datePipe, dateBookings));
  }

  getFreeHours(deskName: string, dateBookings: Date): Observable<Date[]> {
    console.log(this.datePipe.transform(dateBookings, "yyyy-MM-dd HH:mm:ss"));
    return this.http.get<string[]>('basePath/booking/availableHours?deskName=' + deskName
      + "&date=" + transformDateToString(this.datePipe, dateBookings))
      .pipe(
        map((response: Array<string>) =>
          response.map((date: string) => new Date(date))
        )
      );
  }

}
