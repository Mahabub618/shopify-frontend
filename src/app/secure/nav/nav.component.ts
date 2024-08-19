import { Component } from '@angular/core';
import {User} from "../../interfaces/user";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  user: User;
  constructor(private apiService: ApiService) {
  }
  ngOnInit() {
    this.apiService.user().subscribe((user: User) => {
      this.user = user;
    })
  }
}
