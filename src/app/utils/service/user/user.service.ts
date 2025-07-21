import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/utils/constants';
import { EmailRequest } from '../../interface/email-request';
import { InitialContentUserDataResponse, UserDetailedDataResponse } from '../../interface/user-info-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getInitialContentUserData(request: EmailRequest): Observable<InitialContentUserDataResponse> {
    return this.http.post<InitialContentUserDataResponse>(Constants.FIND_USER_INITIAL_INFO, request);
  }

  getDetailedUserData(request: EmailRequest): Observable<UserDetailedDataResponse> {
    return this.http.post<UserDetailedDataResponse>(Constants.FIND_USER_DETAILED_INFO, request);
  }

  
}
