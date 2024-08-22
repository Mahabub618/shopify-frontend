import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = `${environment.apiUrl}`
  constructor(private http: HttpClient) { }

  public signOut() {
    return this.http.post(`${this.apiUrl}/logout`, {});
  }
}
