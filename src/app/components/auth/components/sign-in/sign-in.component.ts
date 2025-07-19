import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignInRequest } from '../interface/sign-in';
import { AuthService } from '../../service/auth-service.service';
import { AlertService } from 'src/app/utils/service/alert/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: []
})
export class SignInComponent implements OnInit {

  signInForm!: FormGroup;
  loading: boolean = false;
  showPassword: boolean = false;
  
  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private alertService: AlertService,
    private router: Router,) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.signInForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      }
    );
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  signIn() {
    this.loading = true;
    let signInRequest: SignInRequest = {
      email: this.signInForm.controls['email'].value,
      password: this.signInForm.controls['password'].value,
    }

    this.authService.signIn(signInRequest).subscribe({
      next: (response) => {
        this.loading = false;
        localStorage.setItem('currentUser', response.email);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.loading = false;
        let errorMessage: string = error.error?.message || 'Ocurrió un error inesperado';
        this.alertService.errorAlert('Error al iniciar sesión', errorMessage);
      }
    });
  }

  get email() {
    return this.signInForm.get('email');
  }

  get password() {
    return this.signInForm.get('password');
  }

}
