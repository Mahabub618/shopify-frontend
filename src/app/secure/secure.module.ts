import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecureComponent } from './secure.component';
import {NavComponent} from "./nav/nav.component";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    SecureComponent,
    NavComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class SecureModule { }
