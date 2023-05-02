import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user";

@Injectable()
export class SignupService {

  constructor(private http: HttpClient) {}

  doRegistration(user:User):Observable<HttpResponse<string>> {
    // console.log(user);
    return this.http.post<string>("basePath/register", {
      "email": user.email,
      "password": user.password,
      "firstName": user.firstName,
      "lastName": user.lastName,
      "phoneNumber": user.phoneNumber,
      "managerId": user.managerId
    }, {
      observe: 'response',
      responseType: 'text' as 'json'
    })
  }

  getIdForManager(infoManager:Array<[]>):Observable<number>{
    return this.http.get<number>('basePath/user/getIdForManager',{
      params:{'firstName':infoManager[0],'lastName':infoManager[1]}
    });
  }

  getManagers():Observable<[]>{
    return this.http.get<[]>('basePath/user/getManagers');
  }
}
