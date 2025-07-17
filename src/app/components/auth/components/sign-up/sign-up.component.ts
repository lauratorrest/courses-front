import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { PreRegisterRequest } from '../interface/pre-register';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: []
})
export class SignUpComponent implements OnInit {

  signUpForm!: FormGroup;
  
  constructor(private fb: FormBuilder) {}

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
