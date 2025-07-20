import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailRequest } from '../interface/email-request';
import { Observable } from 'rxjs';
import { UserInfoResponse } from '../interface/user-info-response';
import { Constants } from 'src/app/utils/constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getInitialContentUserData(request: EmailRequest): Observable<UserInfoResponse> {
    return this.http.post<UserInfoResponse>(Constants.FIND_USER_INFO, request);
  }
}
