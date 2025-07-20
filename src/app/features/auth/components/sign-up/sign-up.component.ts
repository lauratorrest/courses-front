import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { RegisterRequest, UserRole } from '../interface/register';
import { AlertService } from 'src/app/utils/service/alert/alert.service';
import { AuthService } from '../../service/auth-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: []
})
export class SignUpComponent implements OnInit {

  signUpForm!: FormGroup;
  loading: boolean = false;
  showPassword: boolean = false;
  
  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private alertService: AlertService) {}

  ngOnInit(): void {
    localStorage.clear();
    this.buildForm();
  }

  buildForm() {
    this.signUpForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', [Validators.required]],
        fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]+$/)]],
        password: ['', [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/)
        ]],
      },
      { validators: this.emailsMatchValidator }
    );
  }

  emailsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const email = group.get('email')?.value;
    const confirm = group.get('confirmEmail')?.value;
    return email === confirm ? null : { emailsMismatch: true };
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  signUp() {
    this.loading = true;
    let registerRequest: RegisterRequest = {
      email: this.signUpForm.controls['email'].value,
      confirmEmail: this.signUpForm.controls['confirmEmail'].value,
      fullName: this.signUpForm.controls['fullName'].value,
      password: this.signUpForm.controls['password'].value,
      role: UserRole.USER
    }

    this.authService.register(registerRequest).subscribe({
      next: (response) => {
        this.loading = false;
        let redirectTo: string;
        if(!response.email || !response.token) {
          redirectTo = '/sign-in';
        } else {
          localStorage.setItem('curseyaCurrentUser', response.email);
          localStorage.setItem('token', response.token);
          redirectTo = '/home';
        }
        this.alertService.successAlert('Éxito', 'Te enviaremos un email para continuar con el registro', redirectTo);
      },
      error: (error) => {
        this.loading = false;
        let errorMessage: string = error.error?.message || 'Ocurrió un error inesperado';
        this.alertService.errorAlert('Error al registrarse', errorMessage);
      }
    });
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get confirmEmail() {
    return this.signUpForm.get('confirmEmail');
  }

  get fullName() {
    return this.signUpForm.get('fullName');
  }

  get password() {
    return this.signUpForm.get('password');
  }
}
