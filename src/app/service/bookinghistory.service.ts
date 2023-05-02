import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Booking} from "../models/booking";
import {DatePipe} from "@angular/common";
import {transformDateToString} from "../util/date.util";

@Injectable()
export class BookinghistoryService {

  constructor(private http: HttpClient, private datePipe: DatePipe) {
  }

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>("basePath/booking/getAllByUserEmail")
      .pipe(map((response: Booking[]) =>
          response.map((date: Booking) => {
            date.checkIn = new Date(date.checkIn);
            date.checkOut = new Date(date.checkOut);
            return date;
          })
        )
      );
  }

  createBooking(booking: Booking): Observable<HttpResponse<Booking>> {
    console.log(booking.nameDesk);
    console.log(booking.checkIn);
    console.log(booking.checkOut);
    return this.http.post<Booking>("basePath/booking/create", {
      "emailUser": booking.emailUser,
      "nameDesk": booking.nameDesk,
      "checkIn": booking.checkIn,
      "checkOut": booking.checkOut
    }, {
      observe: 'response',
      responseType: 'text' as 'json'
    })
  }

  deleteBooking(booking: Booking): Observable<HttpResponse<any>> {
    console.log(booking.nameDesk);
    console.log(booking.checkIn);
    console.log(booking.checkOut);
    return this.http.post<void>("basePath/booking/deleteBooking", {
      "emailUser": booking.emailUser,
      "nameDesk": booking.nameDesk,
      "checkIn": transformDateToString(this.datePipe, booking.checkIn),
      "checkOut": transformDateToString(this.datePipe, booking.checkOut)
    }, {
      observe: 'response',
      responseType: 'text' as 'json'
    })
  }

  updateBooking(booking: Booking, checkIn:Date, checkOut:Date): Observable<HttpResponse<void>> {
    console.log(booking.nameDesk);
    console.log(booking.checkIn);
    console.log(booking.checkOut);
    return this.http.post<void>("basePath/booking/updateBooking?checkIn=" + transformDateToString(this.datePipe,checkIn)
      + "&checkOut=" + transformDateToString(this.datePipe,checkOut), {
      "emailUser": booking.emailUser,
      "nameDesk": booking.nameDesk,
      "checkIn": transformDateToString(this.datePipe, booking.checkIn),
      "checkOut": transformDateToString(this.datePipe, booking.checkOut)
    }, {
      observe: 'response',
      responseType: 'text' as 'json'
    })
  }
}

