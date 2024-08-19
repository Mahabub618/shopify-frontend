import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = `${environment.apiUrl}/api`
  constructor(private http: HttpClient) { }

  public async login(email:string, password:string) {
    try {
      return await this.http.post(`${this.apiUrl}/ambassador/login`, {
        email,
        password
      }, { withCredentials: true }).toPromise();
    } catch (error: any) {
      if (error.status === 401) {
        return await this.http.post(`${this.apiUrl}/admin/login`, {
          email,
          password
        }, { withCredentials: true }).toPromise();
      }
      else {
        return throwError(error);
      }
    }
  }

  public register(firstName: string, lastName: string, email: string, password: string, confirmPassword: string, admin?:boolean) {
    const role = admin ? 'admin' : 'ambassador';
    return this.http.post(`${this.apiUrl}/${role}/register`, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    }).toPromise();
  }
}
