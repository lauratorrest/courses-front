import { Injectable } from '@angular/core';
import { PreRegisterRequest, PreRegisterResponse } from '../components/interface/pre-register';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  preRegister(preRegisterRequest: PreRegisterRequest): Observable<PreRegisterResponse> {
    return this.http.post<PreRegisterResponse>('http://localhost:8081/coursya/v1/api/authentication/pre-register', preRegisterRequest);
  }
}
