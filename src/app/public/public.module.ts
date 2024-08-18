import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicComponent } from './public.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {RouterOutlet} from "@angular/router";
import {IonicModule} from "@ionic/angular";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";



@NgModule({
  declarations: [
    PublicComponent,
    LoginComponent,
    RegisterComponent
  ],
    imports: [
        CommonModule,
        RouterOutlet,
        IonicModule.forRoot(),
        ReactiveFormsModule,
      HttpClientModule
    ]
})
export class PublicModule { }