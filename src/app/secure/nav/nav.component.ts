import { Component } from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  constructor(private modalController: ModalController) {
  }
  ngOnInit() {

  }
}
