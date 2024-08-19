import { Injectable } from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {User} from "../interfaces/user";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = `${environment.apiUrl}/api`
  constructor(private http: HttpClient) { }

  public user(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/ambassador/user`, { withCredentials: true }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          return this.http.get<User>(`${this.apiUrl}/admin/user`, { withCredentials: true });
        } else {
          return throwError(() => error);
        }
      })
    );
  }
}
