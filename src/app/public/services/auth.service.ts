import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = `${environment.apiUrl}/api`;
  private useSessionStorage: boolean = false;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  public set keepSignedIn(value: boolean) {
    this.useSessionStorage = value;
  }

  public setItem(key: string, value: string) {
    this.useSessionStorage ? sessionStorage.setItem(key, value) : this.cookieService.set(key, value, environment.cookieOptions);
  }

  private getItem(key: string): string {
    return  sessionStorage.getItem(key) || this.cookieService.get(key);
  }

  public set userRole(value: string) {
    this.setItem('role', value);
  }

  public get userRole(): string {
    return this.getItem('role');
  }

  public set firstName(value: string) {
    this.setItem('firstName', value);
  }

  public get firstName(): string {
    return this.getItem('firstName');
  }

  public set lastName(value: string) {
    this.setItem('lastName', value);
  }

  public get lastName(): string {
    return this.getItem('lastName');
  }

  public set id(value: string) {
    this.setItem('id', value);
  }

  public get id(): number {
    const userId = this.getItem('id');
    return parseInt(userId ?? '0', 10);
  }


  public Login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/ambassador/login`, { email, password }, {withCredentials: true})
      .pipe(
        catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.http.post<User>(`${this.apiUrl}/admin/login`, { email, password }, {withCredentials: true});
        } else {
          return throwError(() => error);
        }
      }));
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
