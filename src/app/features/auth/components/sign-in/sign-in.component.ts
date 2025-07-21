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
    localStorage.clear();
    this.buildForm();
  }

  buildForm() {
    this.signInForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/)
        ]],
      }
    );
  }

  preventPaste(event: ClipboardEvent): void {
    event.preventDefault();
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
        localStorage.setItem('curseyaCurrentUser', response.email);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        let errorMessage: string = error.error?.message || 'Ocurrió un error inesperado';
        this.alertService.errorAlert('Error al iniciar sesión', errorMessage);
      }
    });
    this.loading = false;
  }

  get email() {
    return this.signInForm.get('email');
  }

  get password() {
    return this.signInForm.get('password');
  }

}
