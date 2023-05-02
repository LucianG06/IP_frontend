import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams, HttpResponse} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Credentials } from '../models/credentials';


@Injectable()
export class AuthService {
    authUrl = 'basePath';

    constructor(private http: HttpClient) {}

    signIn(credentials: Credentials): Observable<HttpResponse<string>> {
      return this.http
        .post<string>(this.authUrl + '/auth', credentials, {
          headers: new HttpHeaders({
            'accept': 'text/plain',
          }),
          observe: 'response',
          responseType: 'text' as 'json'
        });
    }
}
