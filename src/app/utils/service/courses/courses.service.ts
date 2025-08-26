import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseBasicInfo } from '../../interface/course';
import { Constants } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) { }

  findAllActive(): Observable<CourseBasicInfo[]> {
    return this.http.post<CourseBasicInfo[]>(Constants.FIND_ALL_ACTIVE_COURSES, {});
  }

}
