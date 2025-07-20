import { Injectable } from '@angular/core';
import { RegisterRequest, RegisterResponse } from '../components/interface/register';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Constants } from 'src/app/utils/constants';
import { SignInRequest } from '../components/interface/sign-in';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(registerRequest: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(Constants.REGISTER_USER, registerRequest);
  }

  signIn(signInRequest: SignInRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(Constants.SIGN_IN_USER, signInRequest);
  }
}
