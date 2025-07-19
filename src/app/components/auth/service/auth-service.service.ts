import { Injectable } from '@angular/core';
import { RegisterRequest, RegisterResponse } from '../components/interface/pre-register';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Constants } from 'src/app/utils/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(registerRequest: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(Constants.REGISTER_USER, registerRequest);
  }
}
