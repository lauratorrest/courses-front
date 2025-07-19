import { Injectable } from '@angular/core';
import { RegisterRequest, RegisterResponse } from '../components/interface/pre-register';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(preRegisterRequest: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>('http://localhost:8081/coursya/v1/api/authentication/pre-register', preRegisterRequest);
  }
}
