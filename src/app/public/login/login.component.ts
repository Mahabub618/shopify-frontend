import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastController} from "@ionic/angular";
import {Router} from "@angular/router";
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
  eyeIconSrc: string = 'assets/icon/eye_icon.svg';
  constructor(
    private toastController: ToastController,
    private router: Router,
    private fb: FormBuilder
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
    // if (this.emailID && this.password) {
    //   this.authService.loginSms(this.emailID, this.password).then((res: any) => {
    //     if(res && res.success)
    //     {
    //       this.authService.keepSignedIn = this.rememberMe;
    //       this.authService.cookie = res.cookie;
    //       this.showProgress = false;
    //       this.router.navigate(['/otp'], {queryParams: {email: this.emailID}});
    //     }
    //     else {
    //       this.presentToast();
    //     }
    //   })
    //     .catch((err) => {
    //       console.log(err);
    //     })
    //     .finally(() => {
    //       this.showProgress = false;
    //     });
    // }
    // else {
    //   this.showProgress = false;
    //   this.presentToast();
    // }

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
    this.eyeIconSrc = this.eyeIconSrc === 'assets/icon/eye_icon.svg' ? 'assets/icon/eye-off.svg' : 'assets/icon/eye_icon.svg';
  }
  forgetPassword() {
    // this.router.navigate(['/forget-password']);
  }
  onSignUp() {
    this.router.navigate(['/register']);
  }
}
