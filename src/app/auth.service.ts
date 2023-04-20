import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Credentials } from './login/credentials';

@Injectable()
export class AuthService {
    authUrl = 'basePath';

    constructor(private http: HttpClient) {}

    getToken(credentials: Credentials): Observable<HttpResponse<string>> {
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
