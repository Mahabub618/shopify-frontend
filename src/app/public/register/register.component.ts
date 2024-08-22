import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastController} from "@ionic/angular";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  signupForm: FormGroup;
  showProgress: boolean = false;
  passwordInputType: string = 'password';
  eyeIconSrc: string = 'assets/icon/lockClose.svg';

  constructor(private toastController: ToastController,
              private router: Router,
              private fb: FormBuilder,
              private http: HttpClient,
              private authService: AuthService) {
  }
  ngOnInit() {
    this.createSignUpForm();
  }
  createSignUpForm() {
    this.signupForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    })
  }
  onNext() {
    if (this.showProgress) {
      return;
    }
    this.showProgress = true;
    if (this.emailID && this.password && this.password === this.confirmPassword) {
      this.authService.register(this.firstName, this.lastName, this.emailID, this.password, this.confirmPassword)
        .then((res) => {
          this.router.navigate(['/login']);
        }).catch((error) => {
          this.showProgress = false;
          console.error(error);
      })
    }
    else {
      this.showProgress = false;
      this.presentToast();
    }
  }
  get firstName() {
    return this.signupForm.value.firstName;
  }
  get lastName() {
    return this.signupForm.value.lastName;
  }
  get emailID() {
    return this.signupForm.value.email;
  }
  get password() {
    return this.signupForm.value.password;
  }
  get confirmPassword() {
    return this.signupForm.value.confirmPassword;
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
}
