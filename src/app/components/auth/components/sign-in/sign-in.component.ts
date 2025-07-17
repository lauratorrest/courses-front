import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignInRequest } from '../interface/sign-in';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: []
})
export class SignInComponent implements OnInit {

  signInForm!: FormGroup;
  
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.signInForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.pattern(/^(?=(?:.*\d){2,})(?=.*[A-Z]).{8,}$/)]]
      }
    );
  }

  signIn() {
    let signInRequest: SignInRequest = {
      email: this.signInForm.controls['email'].value,
      password: this.signInForm.controls['password'].value,
    }
  }

  get email() {
    return this.signInForm.get('email');
  }

  get password() {
    return this.signInForm.get('password');
  }

}
