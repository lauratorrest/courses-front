import { Component, OnInit } from '@angular/core';
import { CourseBasicInfo } from 'src/app/utils/interface/course';
import { InitialContentUserDataResponse } from 'src/app/utils/interface/user-info-response';
import { EmailRequest } from 'src/app/utils/interface/user-request';
import { CoursesService } from 'src/app/utils/service/courses/courses.service';
import { UserService } from 'src/app/utils/service/user/user.service';

@Component({
  selector: 'app-initial-content',
  templateUrl: './initial-content.component.html',
  styleUrls: ['./initial-content.component.scss']
})
export class InitialContentComponent implements OnInit {

  isLoading: boolean = false;
  currentUserEmail: string | null = null;
  user: InitialContentUserDataResponse | undefined;
  maxStars = 5;

  coursesList: CourseBasicInfo[] = [];

  constructor(private userService: UserService, private courseService: CoursesService) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.loadCurrentUserData();
    this.loadCoursesData();
  }
  
  loadCurrentUserData() {
    let emailRequest: EmailRequest = {
      email: String(localStorage.getItem('currentUser'))
    }
    this.userService.getInitialContentUserData(emailRequest).subscribe(response => {
      this.user = response;
    });
  }

  loadCoursesData() {
    this.courseService.findAllActive().subscribe(response => {
      this.coursesList = response
      this.isLoading = false;
    });
  }

  getFullStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  hasHalfStar(rating: number): boolean {
    return rating % 1 >= 0.5;
  }

  getEmptyStars(rating: number): number[] {
    return Array(this.maxStars - Math.ceil(rating)).fill(0);
  }

}
