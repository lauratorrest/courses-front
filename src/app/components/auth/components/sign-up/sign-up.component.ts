import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { PreRegisterRequest } from '../interface/pre-register';
import Swal from 'sweetalert2';
import { AlertService } from 'src/app/utils/service/alert/alert.service';
import { AuthService } from '../../service/auth-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: []
})
export class SignUpComponent implements OnInit {

  signUpForm!: FormGroup;
  
  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private alertService: AlertService) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.signUpForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', [Validators.required]],
        fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]+$/)]]
      },
      { validators: this.emailsMatchValidator }
    );
  }

  emailsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const email = group.get('email')?.value;
    const confirm = group.get('confirmEmail')?.value;
    return email === confirm ? null : { emailsMismatch: true };
  }

  preSignUp() {
    let preRegisterRequest: PreRegisterRequest = {
      email: this.signUpForm.controls['email'].value,
      confirmEmail: this.signUpForm.controls['confirmEmail'].value,
      fullName: this.signUpForm.controls['fullName'].value,
    }

    this.authService.preRegister(preRegisterRequest).subscribe({
      next: (response) => {
        this.alertService.successAlert('Éxito', 'Te enviaremos un email para continuar con el registro');
      },
      error: (error) => {
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
}
