import { Injectable } from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {User} from "../interfaces/user";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {AuthService} from "../public/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = `${environment.apiUrl}/api`
  constructor(private http: HttpClient, private authService: AuthService) { }

  public signOut() {
    const role = this.authService.userRole;
    return this.http.post(`${this.apiUrl}/${role}/logout`, {}, { withCredentials: true });
  }
}
