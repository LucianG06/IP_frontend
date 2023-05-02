import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem('token');
    if (req.url.search('/auth') === -1 &&  req.url.search('/register') === -1 &&  req.url.search('/user/getIdForManager') === -1 &&  req.url.search('/user/getManagers') === -1) {
        req = req.clone({
          setHeaders: {
            Authorization: "Bearer " + authToken
          }
        });
    }
    return next.handle(req);
  }

}
