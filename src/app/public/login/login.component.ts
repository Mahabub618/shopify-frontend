import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastController} from "@ionic/angular";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import { User } from 'src/app/interfaces/user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  showProgress: boolean = false;
  loginForm: FormGroup;
  passwordInputType: string = 'password';
  eyeIconSrc: string = 'assets/icon/lockClose.svg';
  constructor(
    private toastController: ToastController,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.createLoginForm();
  }
  createLoginForm() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      rememberMe: [false]
    })
  }
  onNext() {
    if (this.showProgress) {
      return;
    }
    this.showProgress = true;
    if (this.emailID && this.password) {
      this.authService.login(this.emailID, this.password)
        .then((user: any) => {
          this.setUserInfoInStorage(user);
          this.router.navigate(['/']);
        })
        .catch((error) => {
          console.error(error);
          this.showProgress = false;
        })
    }
    else {
      this.showProgress = false;
      this.presentToast();
    }

  }
  setUserInfoInStorage(userInfo: User) {
    this.authService.keepSignedIn = this.rememberMe;
    this.authService.firstName = userInfo.firstName;
    this.authService.lastName = userInfo.lastName;
    this.authService.userRole = userInfo.isAmbassador ? 'ambassador' : 'admin';
  }
  get emailID() {
    return this.loginForm.value.email;
  }
  get password() {
    return this.loginForm.value.password;
  }
  get rememberMe(): boolean {
    return !this.loginForm.value.rememberMe;
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Please provide a valid email or password',
      duration: 1000,
      position: 'top',
    });
    toast.present();
  }
  toggleShowPassword() {
    this.passwordInputType = this.passwordInputType === 'password' ? 'text' : 'password';
    this.eyeIconSrc = this.eyeIconSrc === 'assets/icon/lockClose.svg' ? 'assets/icon/lockOpen.svg' : 'assets/icon/lockClose.svg';
  }
  forgetPassword() {
    // this.router.navigate(['/forget-password']);
  }
  onSignUp() {
    this.router.navigate(['/register']);
  }
}
